use reservation_system;
SET SQL_SAFE_UPDATES = 0;

-- while booking new tickets, the tables affected are :
-- reserve(this is dynamic, changes if cancelled), ticket, passenger, receipt 

-- given : datetime of journey, src, destination, train no, coachtype, passenger details, pcnt 
-- calculate: pnr, dayno, trip no, Week no, fare, status, seats to be allotted
-- updates: reserve, ticket, passenger, receipt

--   delete from passenger;
--   delete from receipt;
--  delete from reserve;
--  delete from ticket; 

-- ALTER TABLE ticket
-- ADD FOREIGN KEY (username) 
-- REFERENCES auth_user(username);

-- ALTER TABLE receipt
-- ADD FOREIGN KEY (username) 
-- REFERENCES auth_user(username);

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

set @pnr1 = '9810123753';
set @pnr2 = '7303023233';
set @pnr3 = '2389483240';
set @pnr4 = '4309403590';
set @pnr5 = '2190480344';
set @pnr6 = '3290480593';
set @pnr7 = '8239479585';
set @pnr8 = '5943870533';
set @pnr9 = '9823592343';
set @pnr10 = '3248929379';

insert into ticket values
(@pnr1,'test','22210',@tripno, @tripweek+1, 'NDLS', 'MMCT',0,null),
(@pnr2,'test','22210',@tripno, @tripweek+2, 'NDLS', 'MMCT',0,null),
(@pnr3,'test','22210',@tripno, @tripweek, 'NDLS', 'MMCT',0,null),
(@pnr4,'test2','22210',@tripno, @tripweek, 'NDLS', 'MMCT',0,null),
(@pnr5,'test2','22210',@tripno, @tripweek+3, 'NDLS', 'BRC',0,null),
(@pnr6,'test','22210',@tripno, @tripweek+3, 'NDLS', 'KOTA',0,null),
(@pnr7,'test2','22210',@tripno, @tripweek, 'NDLS', 'MMCT',0,null),
(@pnr8,'test','22210',@tripno, @tripweek, 'NDLS', 'RTM',0,null),
(@pnr9,'test','22210',@tripno, @tripweek, 'NDLS', 'RTM',0,null),
(@pnr10,'test','22210',@tripno, @tripweek, 'NDLS', 'MMCT',0,null);
INSERT INTO passenger(pnr, pname, gender, age, stat, meal_option, class_type) VALUES
(@pnr1, 'Aadit Kant Jha', 'Male', 20, 'CNF', null,'A'),
(@pnr2, 'Rohit J', 'Male', 19, 'CNF', null,'A'),
(@pnr3, 'Jogith J', 'Male', 19, 'CNF', null,'A'),
(@pnr4, 'Purjit J', 'Male', 19, 'CNF', null,'A'),
(@pnr5, 'Harshit J', 'Male', 19, 'CNF', null,'A'),
(@pnr6, 'Saumik J', 'Male', 19, 'CNF', null,'A'),
(@pnr7, 'Abhik J', 'Male', 19, 'CNF', null,'A'),
(@pnr8, 'Sick J', 'Male', 19, 'CNF', null,'A'),
(@pnr9, 'Gulab J', 'Male', 19, 'CNF', null,'A'),
(@pnr10, 'Rasmalai J', 'Male', 19, 'CNF', null,'A'),
(@pnr9, 'Mohit J', 'Male', 20, 'CNF', null,'A'),
(@pnr4, 'Mohit J', 'Male', 21, 'CNF', null,'A'),
(@pnr5, 'Mohit J', 'Male', 18, 'CNF', null,'A');

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
('1010101010','test3','22210',@tripno, @tripweek, 'KOTA', 'BRC',0,null);

INSERT INTO passenger(pnr, pname, gender, age, stat, meal_option, class_type) VALUES
('1010101010', 'Sohum', 'Male', 20, 'CNF', null,'A'),
('1010101010', 'Sohum', 'Male', 20, 'CNF', null,'A'),
('1010101010', 'Sohum', 'Male', 20, 'CNF', null,'A'),
('1010101010', 'Sohum', 'Male', 20, 'CNF', null,'A'),
('1010101010', 'Sohum', 'Male', 20, 'CNF', null,'A'),
('1010101010', 'Abhik', 'Male', 19, 'CNF', null,'A');

