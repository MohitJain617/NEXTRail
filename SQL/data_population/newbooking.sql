select * from time_table where train_no = '22210' order by (day_no),(arrival);
select * from sched where train_no = '22210';
select * from user_account;
select * from ticket;
select * from passenger;
select * from reserve;
select * from struct where train_no = '22210';

SET @startdate = DATE('1970-01-01');
SET @tempdatetime = DATE('2022-04-06');
SET @tempsrc = 'MMCT';
-- these vals are always correct ^
set @dayno = (select day_no from time_table where train_no = @temptrain and st_code = @tempsrc);
-- formulate tripno
set @tripno = get_dayNo(@tempdatetime) + 1 - @dayno;

set @tripno = if(@tripno = 0,7,@tripno);
select @dayno;
select @tripno;

-- tripno is correct or not
select count(*) from sched where train_no = '22210' and trip_no = @tripno;


select * from ticket;

insert into ticket values
('3410381',2,'22210',@tripno, (SELECT TIMESTAMPDIFF(WEEK,@startdate,@tempdatetime)), 'KOTA', 'BRC',100,null);

INSERT INTO passenger VALUES
('3410381', 'Aadit Kant Jha', 'Male', 20, 'Confirmed', null),
('3410381', 'Mohit J', 'Male', 19, 'Confirmed', null);

INSERT INTO reserve VALUES
(1,1,'A','3410381'),
(1,2,'A','3410381');

-- query for available seats 
SET @temptrain = 22210;
SET @tempdatetime = DATE('2022-04-06');
SET @tempsrc = "RTM";
SET @tempdest = "MMCT";

set @dayno = (select day_no from time_table where train_no = @temptrain and st_code = @tempsrc);
-- formulate tripno
set @tripno = get_dayNo(@tempdatetime) + 1 - @dayno;
set @tripno = if(@tripno = 0,7,@tripno);

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




-- Ticket : src datetime 
-- connect this src datetime to sched to find out if we are talking about the same train or not.
-- availibility we needed (T booked) the journey is same or not