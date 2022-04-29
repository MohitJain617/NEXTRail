use reservation_system;

-- TRIGGERS:

-- find additional cost given a train type
drop trigger if exists  additional_cost;
-- TRIGGER FOR ADDITIONAL FARE COST
DELIMITER $$
CREATE TRIGGER additional_cost
BEFORE INSERT ON ticket FOR EACH ROW
BEGIN
	SET NEW.fare = (SELECT DISTINCT FL.additional_cost FROM fare_lookup as FL, train as T WHERE T.id=NEW.train_no AND T.train_type=FL.train_type);
END;
$$
DELIMITER ;

drop trigger if exists fare_update;
-- TRIGGER FOR UPDATION IN FARE COST AS PASSENGERS ARE ADDED
DELIMITER $$
CREATE TRIGGER fare_update
AFTER INSERT ON passenger FOR EACH ROW
begin
		-- CALCULATE DISTANCE
		SET @distsrc = (SELECT dist FROM time_table as T, Ticket as TC
					WHERE TC.pnr = NEW.pnr
					AND T.train_no = TC.train_no
					AND T.st_code = TC.boarding_from) ;

		SET @distdest = (SELECT dist FROM time_table as T, Ticket as TC
					WHERE TC.pnr = NEW.pnr
					AND T.train_no = TC.train_no
					AND T.st_code = TC.going_to) ;


		UPDATE ticket
		SET fare = fare+(@distdest-@distsrc)*(select distinct cost_per_km from class_layout as C where C.class_type=NEW.class_type)
		WHERE pnr = NEW.pnr;
END;
$$
DELIMITER ;

-- TRIGGER FOR AUTO GENERATION OF RECEIPT
drop trigger if exists gen_receipt;
DELIMITER $$
CREATE TRIGGER gen_receipt
AFTER INSERT ON ticket FOR EACH ROW
begin
		SET @lastval = (select max(receipt_no) from receipt);
        SET @lastval = ifnull(@lastval,0);
		INSERT INTO receipt VALUES
        (@lastval+1,now(),'Pending',NEW.pnr, NEW.username);
END;
$$
DELIMITER ;

-- TRIGGER FOR ASSIGNING A SEAT TO PASSENGER
drop trigger if exists book_seat_if_avail;
DELIMITER $$
CREATE TRIGGER book_seat_if_avail
BEFORE INSERT ON passenger FOR EACH ROW
begin
	SET @seatavail = false;

	SET @temptrain = (SELECT train_no from ticket where pnr = NEW.pnr);
	SET @tempsrc = (SELECT boarding_from from ticket where pnr = NEW.pnr);
	SET @tempdest = (SELECT going_to from ticket where pnr = NEW.pnr);

	set @tripno = (SELECT trip_no from ticket where pnr = NEW.pnr);

	set @tripweek = (SELECT week_no from ticket where pnr = NEW.pnr);

	set @tempclass = NEW.class_type;
	
	-- different variables
	SET @coachno = null;
	SET @seatno = null;
	SET @coachtype = null;
	SELECT S.class_type, SN2.num, SN.num
    INTO @coachtype, @coachno, @seatno
	FROM struct AS S,  class_layout as C, seat_no AS SN2, seat_no as SN
	WHERE S.train_no = @temptrain
		AND S.class_type = @tempclass
    	AND S.class_type = C.class_type
    	AND SN2.num <= S.size
    	AND SN.num <= C.capacity
    	AND NOT EXISTS (
			SELECT * FROM reserve as R, ticket as T, passenger as P
			WHERE T.train_no = S.train_no AND R.class_type = S.class_type AND R.coach_no = SN2.num AND R.seat_no = SN.num
        	AND R.pnr = T.pnr 
        	AND T.pnr = P.pnr AND P.stat='CNF'
			AND T.train_no = @temptrain
			AND T.trip_no = @tripno
			AND T.week_no = @tripweek
			AND NOT(
				(
					(SELECT dist FROM time_table as TT1 
					WHERE TT1.train_no = T.train_no 
					AND TT1.st_code = @tempdest) 
					<=
					(SELECT dist FROM time_table as TT2 
					WHERE TT2.train_no = T.train_no 
					AND TT2.st_code = T.boarding_from)
				) 
				OR
				(
					(SELECT dist FROM time_table as TT1 
					WHERE TT1.train_no = T.train_no 
					AND TT1.st_code = @tempsrc) 
					>=
					(SELECT dist FROM time_table as TT2 
					WHERE TT2.train_no = T.train_no 
					AND TT2.st_code = T.going_to)
				)
			)
		) LIMIT 1;

		IF (@seatno IS NULL) then
			SET NEW.stat = 'WL';
		ELSE
			SET NEW.stat = 'CNF';
			INSERT INTO RESERVE VALUES (@coachno, @seatno, @coachtype, NEW.pnr);
		END IF;
    
END;
$$
DELIMITER ;
