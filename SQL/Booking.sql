use reservation_system;
SET SQL_SAFE_UPDATES = 0;

-- while booking new tickets, the tables affected are :
-- reserve(this is dynamic, changes if cancelled), ticket, passenger, receipt 

-- given : datetime of journey, src, destination, train no, coachtype, passenger details, pcnt 
-- calculate: pnr, dayno, trip no, Week no, fare, status, seats to be allotted
-- updates: reserve, ticket, passenger, receipt

--  delete from passenger;
--  delete from receipt;
-- delete from reserve;
-- delete from ticket; 

ALTER TABLE ticket
ADD FOREIGN KEY (user_id) 
REFERENCES auth_user(id);

ALTER TABLE receipt
ADD FOREIGN KEY (user_id) 
REFERENCES auth_user(id);


-- GIVEN SECTION
SET @tempdatetime = DATE('2022-04-23'); -- datetime of journey
SET @tempsrc = 'NDLS'; -- src
SET @tempdest = 'MMCT'; -- dest
SET @temptrain = '22210';
SET @coachType = 'A';

-- assume passenger details

-- CALCULATE SECTION
set @dayno = (select day_no from time_table where train_no=@temptrain and st_code=@tempsrc);
-- formulate tripno
set @tripno = get_dayNo(@tempdatetime) + 1 - @dayno;
set @tripno = if(@tripno = 0,7,@tripno); -- started last week's sunday
set @tripno = if(@tripno = -1,6,@tripno); -- started last week's saturday

-- tripno is correct or not
-- select count(*) from sched where train_no = '15232' and trip_no = @tripno;
set @tripweek = get_weekNo(@tempdatetime);
set @tripweek = if(@tripno+@dayno-1 > 7, @tripweek-1, @tripweek);

insert into ticket values
('3410381','test','22210',@tripno, @tripweek, 'NDLS', 'MMCT',0,null);
INSERT INTO passenger(pnr, pname, gender, age, stat, meal_option, class_type) VALUES
('3410381', 'Aadit Kant Jha', 'Male', 20, 'CNF', null,'A'),
('3410381', 'Rohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Jogith J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Purjit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Harshit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Saumik J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Abhik J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Sick J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Gulab J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Rasmalai J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 20, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 21, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 18, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 17, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 16, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 15, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 14, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A'),
('3410381', 'Mohit J', 'Male', 19, 'CNF', null,'A');

-- GIVEN SECTION
SET @tempdatetime = DATE('2022-04-24'); -- datetime of journey
SET @tempsrc = 'KOTA'; -- src
SET @tempdest = 'BRC'; -- dest
SET @temptrain = '22210';
SET @coachType = 'A';

-- assume passenger details

-- CALCULATE SECTION
set @dayno = (select day_no from time_table where train_no=@temptrain and st_code=@tempsrc);
-- formulate tripno
set @tripno = get_dayNo(@tempdatetime) + 1 - @dayno;
set @tripno = if(@tripno = 0,7,@tripno); -- started last week's sunday
set @tripno = if(@tripno = -1,6,@tripno); -- started last week's saturday

-- tripno is correct or not
-- select count(*) from sched where train_no = '15232' and trip_no = @tripno;
set @tripweek = get_weekNo(@tempdatetime);
set @tripweek = if(@tripno+@dayno-1 > 7, @tripweek-1, @tripweek);

insert into ticket values
('3410382','test','22210',@tripno, @tripweek, 'KOTA', 'BRC',0,null);

INSERT INTO passenger(pnr, pname, gender, age, stat, meal_option, class_type) VALUES
('3410383', 'Sohum', 'Male', 20, 'CNF', null,'A'),
('3410383', 'Sohum', 'Male', 20, 'CNF', null,'A'),
('3410383', 'Sohum', 'Male', 20, 'CNF', null,'A'),
('3410383', 'Sohum', 'Male', 20, 'CNF', null,'A'),
('3410383', 'Sohum', 'Male', 20, 'CNF', null,'A'),
('3410383', 'Abhik', 'Male', 19, 'CNF', null,'A');

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
	);
    


