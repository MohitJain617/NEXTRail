use reservation_system;
select * from time_table where train_no = '22210' order by (day_no),(arrival);
select * from sched where train_no = '22210';
select * from user_account;
select * from ticket;
select * from passenger;
select * from reserve;
select * from struct where train_no = '22210';

-- while booking new tickets, the tables affected are :
-- reserve(this is dynamic, changes if cancelled), ticket, passenger, receipt 

-- given : datetime of journey, src, destination, train no, coachtype, passenger details, pcnt 
-- calculate: pnr, dayno, trip no, Week no, fare, status, seats to be allotted
-- updates: reserve, ticket, passenger, receipt

delete from passenger;
delete from receipt;
delete from reserve;
delete from ticket; 

select * from ticket;

-- GIVEN SECTION
SET @tempdatetime = DATE('2022-04-18'); -- datetime of journey
SET @tempsrc = 'HJP'; -- src
SET @tempdest = 'MFP'; -- dest
SET @temptrain = '15232';
SET @coachType = 'A';

-- assume passenger details

-- CALCULATE SECTION
SET @startdate = DATE('1970-01-01');
select @tempsrc;
set @dayno = (select day_no from time_table where train_no=@temptrain and st_code=@tempsrc);
select @dayno;
-- formulate tripno
set @tripno = get_dayNo(@tempdatetime) + 1 - @dayno;
set @tripno = if(@tripno = 0,7,@tripno); -- started last week's sunday
set @tripno = if(@tripno = -1,6,@tripno); -- started last week's saturday

-- tripno is correct or not
select count(*) from sched where train_no = '22210' and trip_no = @tripno;
set @tripweek = (SELECT TIMESTAMPDIFF(WEEK,@startdate,@tempdatetime));
set @tripweek = if(@tripno+@dayno-1 > 7, @tripweek-1, @tripweek);


insert into ticket values
('3410381',2,'22210',@tripno, @tripweek, 'KOTA', 'BRC',0,null);
INSERT INTO passenger VALUES
('3410381', 'Aadit Kant Jha', 'Male', 20, 'Confirmed', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'Confirmed', null,'A');

insert into ticket values
('3410382',2,'22210',@tripno, (SELECT TIMESTAMPDIFF(WEEK,@startdate,@tempdatetime)), 'KOTA', 'BRC',0,null);

INSERT INTO passenger VALUES
('3410382', 'Sohum', 'Male', 20, 'Confirmed', null,'A'),
('3410382', 'Abhik', 'Male', 19, 'Confirmed', null,'A');

SELECT * FROM reserve;
select * from passenger;
select * from receipt;
select * from ticket;

INSERT INTO reserve VALUES
(1,1,'A','3410381'),
(1,2,'A','3410381');

-- query for available seats 

set @tripweek = (SELECT TIMESTAMPDIFF(WEEK,@startdate,@tempdatetime));


SELECT S.train_no, S.class_type as coach, SN2.num as coach_no, SN.num as seat_no
FROM struct AS S,  class_layout as C, seat_no AS SN2, seat_no as SN
WHERE S.train_no = @temptrain
    AND S.class_type = C.class_type
    AND SN2.num <= S.size
    AND SN.num <= C.capacity
    AND NOT EXISTS (
		SELECT * FROM reserve as R, ticket as T, passenger as P
		WHERE T.train_no = S.train_no AND R.class_type = S.class_type AND R.id = SN2.num AND R.seat_no = SN.num
        AND R.pnr = T.pnr 
        AND T.pnr = P.pnr AND P.stat='Confirmed'
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
	);
    
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
        (@lastval+1,now(),'Pending',NEW.pnr, NEW.user_id);
END;
$$
DELIMITER ;

-- TRIGGER FOR ASSIGNING A SEAT TO PASSENGER

DELIMITER $$
drop trigger if exists book_seat_if_avail;
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
			WHERE T.train_no = S.train_no AND R.class_type = S.class_type AND R.id = SN2.num AND R.seat_no = SN.num
        	AND R.pnr = T.pnr 
        	AND T.pnr = P.pnr AND P.stat='Confirmed'
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
			SET NEW.stat = 'Waiting';
		ELSE
			INSERT INTO RESERVE VALUES (@coachno, @seatno, @coachtype, NEW.pnr);
		END IF;
    
END;
$$
DELIMITER ;


select * from fare_lookup; -- has train type
select * from train; -- has train_type
select * from reserve; 
select * from ticket; 
select * from time_table where train_no = '22210';
select * from class_layout; -- class type and cost_per_km
select * from passenger; -- add class type to this.
select * from sched;
select train_name from train where char_length(train_name) > 35;

-- Ticket : src datetime 
-- connect this src datetime to sched to find out if we are talking about the same train or not.
-- availibility we needed (T booked) the journey is same or not


