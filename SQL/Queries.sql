SET SQL_SAFE_UPDATES = 0;
use reservation_system;

set @tripweek = (SELECT TIMESTAMPDIFF(WEEK,"1970-01-05",@dx));
SET @tempdate = DATE('2022-04-03');
SET @tempday = get_dayNo(@tempdate);

-- ------------------SETUP--------------------
-- -------------------------------------------
-- ------------------QUERY--------------------
-- -------------------------------------------
-- To check the validity of a username
    
-- 1)
-- ------------------SETUP--------------------
SET @tempsrc = "NDLS";
SET @tempdest = "MMCT";
SET @tempdate = DATE('2022-04-23');
SET @tempdayno = get_dayNo(@tempdate);

SET @classReq = FALSE;
SET @classPref = 'S';
-- -------------------------------------------
-- Query for trains between two stations -- 
-- ------------------QUERY--------------------
SELECT T.train_no, T.departure FROM time_table as T NATURAL JOIN sched as S
WHERE T.st_code = @tempsrc
	AND (T.day_no+S.trip_no-1) = @tempdayno
	AND EXISTS (
		SELECT * FROM time_table as T2 NATURAL JOIN sched as S2
		WHERE S2.trip_no = S.trip_no
			AND S2.train_no = S.train_no
			AND (T.dist) < (T2.dist)
			AND T2.st_code = @tempdest 
	)
    AND (
	(@classReq = FALSE) OR EXISTS (
		SELECT * FROM struct as STR
        WHERE STR.train_no = T.train_no
        AND STR.class_type = @classPref
	)
);
-- -------------------------------------------

-- 2)
-- ------------------SETUP--------------------
SET @tempsrc = "MFP";
SET @tempdest = "BJU";
SET @tempdate = DATE('2022-03-05');
SET @tempdayno = get_dayNo(@tempdate);

-- -------------------------------------------
-- Query for trains between two stations sorted by Departure time at source -- 
-- ------------------QUERY--------------------
SELECT T.train_no, T.departure FROM time_table as T NATURAL JOIN sched as S
WHERE T.st_code = @tempsrc
	AND (T.day_no+S.trip_no-1) = @tempdayno
	AND EXISTS (
		SELECT * FROM time_table as T2 NATURAL JOIN sched as S2
		WHERE S2.trip_no = S.trip_no
			AND S2.train_no = S.train_no
			AND (T.dist) < (T2.dist)
			AND T2.st_code = @tempdest 
	)
    AND (
	(@classReq = FALSE) OR EXISTS (
		SELECT * FROM struct as STR
        WHERE STR.train_no = T.train_no
        AND STR.class_type = @classPref
	)
) ORDER BY T.departure;
-- -------------------------------------------

-- 
SET @tempdayno = get_dayNo(@tempdate);
-- Query for trains between two stations sorted by total time -- 
SET @tempsrc = "HJP";
SET @tempdest = "MFP";
SET @tempdate = DATE('2022-03-05');
-- -------------------------------------------
SELECT train_no FROM sched as S
WHERE S.st_code = @tempsrc
	AND DATE(S.departure) = @tempdate
    AND EXISTS (
		SELECT * FROM sched as S2
        WHERE S2.trip_no = S.trip_no
			AND S2.train_no = S.train_no
            AND S2.arrival > S.departure
            AND S2.st_code = @tempdest
) ORDER BY ( 
	TIMESTAMPDIFF (MINUTE, S.departure, (
		SELECT arrival FROM sched as S2
		WHERE S2.trip_no = S.trip_no
			AND S2.train_no = S.train_no
			AND S2.st_code = @tempdest
		)
    )
);

-- TODO updated query for above

-- 3)
-- ------------------SETUP--------------------
SET @temptrain = '11123';
-- -------------------------------------------
-- all the seats given a train
-- ------------------QUERY-------------------
SELECT S.train_no, S.class_type as coach, SN2.num as coach_no, SN.num as seat_no
FROM structure AS S,  class_layout as C, seat_no AS SN2, seat_no as SN
WHERE S.train_no = @temptrain
	AND S.class_type = C.class_type
    AND SN2.num <= S.size
	AND SN.num <= C.capacity
	ORDER BY (coach_no,seat_no);
-- -------------------------------------------
    

-- 4)
-- ------------------SETUP--------------------
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

-- -------------------------------------------
-- Query for avaiable seats between two stations for a train and a given date, src, and dest
-- ------------------QUERY--------------------
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
-- -------------------------------------------

    
-- Query for the status of a ticket given pnr
SET @temppnr = '111111111';
SELECT * FROM ticket as T, passenger as P
WHERE T.pnr = @temppnr
AND P.pnr = T.pnr;


-- Query to cancel a ticket with a given pnr
SET @temppnr = '111111111';

UPDATE passenger
SET stat='Cancelled'
WHERE pnr = @temppnr;

DELETE FROM reserve
WHERE pnr=@temppnr;


-- QUERIES to get the confirmation status given a train, trip_no and week_no, src, dest
-- 5)
-- ------------------SETUP--------------------
SET @trainNo = '22210';
SET @tempsrc = 'NDLS';
SET @tempdest = 'BRC';
SET @tempdate = DATE("2022-04-30");
-- CALCULATE SECTION
set @dayno = (select day_no from time_table where train_no=@temptrain and st_code=@tempsrc);
-- formulate tripno
set @tripno = get_dayNo(@tempdate) + 1 - @dayno;
set @tripno = if(@tripno = 0,7,@tripno); -- started last week's sunday
set @tripno = if(@tripno = -1,6,@tripno); -- started last week's saturday

-- tripno is correct or not
-- select count(*) from sched where train_no = '15232' and trip_no = @tripno;
set @tripweek = get_weekNo(@tempdate);
set @tripweek = if(@tripno+@dayno-1 > 7, @tripweek-1, @tripweek);
-- -------------------------------------------
-- Calculate the waiting list queue for a given train
-- ------------------QUERY--------------------
SELECT count(*) as WL, W.class_type
FROM waiting_list as W
WHERE W.train_no = @trainNo
	AND W.week_no = @tripweek
	AND W.trip_no = @tripno
	AND NOT(
		(
			(SELECT dist FROM time_table as TT1 
			WHERE TT1.train_no = W.train_no 
			AND TT1.st_code = @tempdest) 
			<=
			(SELECT dist FROM time_table as TT2 
			WHERE TT2.train_no =W.train_no 
			AND TT2.st_code = W.boarding_from)
		) 
		OR
		(
			(SELECT dist FROM time_table as TT1 
			WHERE TT1.train_no = W.train_no 
			AND TT1.st_code = @tempsrc) 
			>=
			(SELECT dist FROM time_table as TT2 
			WHERE TT2.train_no = W.train_no 
			AND TT2.st_code = W.going_to)
		)
	) GROUP BY class_type;
-- -------------------------------------------
 
 -- 6)
-- -------------------------------------------
 -- Get the count of available seats on a specific train and class type
-- ------------------QUERY--------------------
SELECT count(*) as Avail, S.class_type as class_type
FROM struct AS S,  class_layout as C, seat_no AS SN2, seat_no as SN
WHERE S.train_no = @trainNo
    AND S.class_type = C.class_type
    AND SN2.num <= S.size
    AND SN.num <= C.capacity
    AND NOT EXISTS (
		SELECT * FROM reserve as R, ticket as T, passenger as P
		WHERE T.train_no = S.train_no AND R.class_type = S.class_type AND R.coach_no = SN2.num AND R.seat_no = SN.num
        AND R.pnr = T.pnr 
        AND T.pnr = P.pnr AND P.stat='CNF'
		AND T.train_no = @trainNo
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
	) GROUP BY S.class_type;
-- -------------------------------------------
-- 7)
-- ------------------SETUP--------------------
SET @trainno = '11123';
-- -------------------------------------------
-- Calculating duration of time it takes to reach station (in seconds)
-- ------------------QUERY--------------------
SELECT T1.st_code, TIME_TO_SEC(TIMEDIFF(T1.arrival,T2.departure))+86400*(T1.day_no-T2.day_no) as seconds
FROM time_table as T1, time_table as T2
WHERE T1.train_no = @trainno
AND T2.train_no = @trainno
AND T2.dist = 0
ORDER BY seconds;
-- -------------------------------------------

-- 8) Query to check all the passengers in waiting list f
-- for a specific train info, and given them seat if it's available now
-- ------------------SETUP--------------------
SET @trainNo = '22210';
SET @tempsrc = 'NDLS';
SET @tempdest = 'MMCT';
SET @tempdate = DATE("2022-04-23");
-- CALCULATE SECTION
SET @dayno = (select day_no from time_table where train_no=@trainNo and st_code=@tempsrc);

-- formulate tripno
set @tripno = get_dayNo(@tempdate) + 1 - @dayno;
set @tripno = if(@tripno = 0,7,@tripno); -- started last week's sunday
set @tripno = if(@tripno = -1,6,@tripno); -- started last week's saturday

-- tripno is correct or not
-- select count(*) from sched where train_no = '15232' and trip_no = @tripno;
set @tripweek = get_weekNo(@tempdate);
set @tripweek = if(@tripno+@dayno-1 > 7, @tripweek-1, @tripweek);
set @classtype = 'A';
-- -------------------------------------------
-- ------------------QUERY--------------------
SELECT * 
FROM waiting_list as W
WHERE W.train_no = @trainNo
	AND W.week_no = @tripweek
	AND W.trip_no = @tripno
    AND W.class_type = @classtype

	AND NOT EXISTS (
		SELECT * 
		FROM waiting_list as W2
		WHERE W.train_no = W2.train_no
		AND W.trip_no = W2.trip_no
		AND W.class_type = W2.class_type
		AND ((W.priority > W2.priority) OR ((W.priority = W2.priority) AND (W.pid > W2.pid)) )

		-- W2 lies between tempsrc and tempdest
		AND(
			(
				(SELECT dist FROM time_table as TT1 
				WHERE TT1.train_no = W2.train_no 
				AND TT1.st_code = @tempsrc) 
				<=
				(SELECT dist FROM time_table as TT2 
				WHERE TT2.train_no = W2.train_no 
				AND TT2.st_code = W2.boarding_from)
			) 
			AND
			(
				(SELECT dist FROM time_table as TT1 
				WHERE TT1.train_no = W2.train_no 
				AND TT1.st_code = @tempdest) 
				>=
				(SELECT dist FROM time_table as TT2 
				WHERE TT2.train_no = W2.train_no 
				AND TT2.st_code = W2.going_to)
			)
		)
		-- and intersection between W1 and W2
		AND NOT(
			(
				(SELECT dist FROM time_table as TT1 
				WHERE TT1.train_no = W2.train_no 
				AND TT1.st_code = W2.going_to) 
				<=
				(SELECT dist FROM time_table as TT2 
				WHERE TT2.train_no =W.train_no 
				AND TT2.st_code = W.boarding_from)
			) 
			OR
			(
				(SELECT dist FROM time_table as TT1 
				WHERE TT1.train_no = W2.train_no 
				AND TT1.st_code = W2.boarding_from) 
				>=
				(SELECT dist FROM time_table as TT2 
				WHERE TT2.train_no = W.train_no 
				AND TT2.st_code = W.going_to)
			)
		)
	)
	-- W1 lies between tempsrc and tempdest
	AND(
		(
			(SELECT dist FROM time_table as TT1 
			WHERE TT1.train_no = W.train_no 
			AND TT1.st_code = @tempsrc) 
			<=
			(SELECT dist FROM time_table as TT2 
			WHERE TT2.train_no = W.train_no 
			AND TT2.st_code = W.boarding_from)
		) 
		AND
		(
			(SELECT dist FROM time_table as TT1 
			WHERE TT1.train_no = W.train_no 
			AND TT1.st_code = @tempdest) 
			>=
			(SELECT dist FROM time_table as TT2 
			WHERE TT2.train_no = W.train_no 
			AND TT2.st_code = W.going_to)
		)
	)
	;
-- -------------------------------------------

-- 9)
-- -------------------------------------------
set @tempdatetime = "2022-04-25 03:50:00";

-- Query for all tickets booked by a user along with additional values
-- ------------------QUERY--------------------
select T.pnr, T.train_no,
(select train_name from train as T2 where T2.id = T.train_no) as train_name,
((select dist from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.going_to)-
	(select dist from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.boarding_from)) as dist,
TIMESTAMP(Date_add(get_daytime(week_no,trip_no-1),
	INTERVAL ((select day_no from time_table as TT where TT.train_no = T.train_no and TT.st_code = T.boarding_from)-1) day) ,
	(select departure from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.boarding_from)) as srctime,
TIMESTAMP(Date_add(get_daytime(week_no,trip_no-1),
	INTERVAL ((select day_no from time_table as TT where TT.train_no = T.train_no and TT.st_code = T.going_to)-1) day),
    (select arrival from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.going_to)) as desttime,
T.boarding_from, T.going_to, T.fare
from ticket as T
where T.username = "test2"
AND (TIMESTAMP(Date_add(get_daytime(week_no,trip_no-1),
	INTERVAL ((select day_no from time_table as TT where TT.train_no = T.train_no and TT.st_code = T.going_to)-1) day),
    (select arrival from time_table as T2 where T2.train_no = T.train_no and T2.st_code = T.going_to)) < "2022-04-24 03:50:00");
-- -------------------------------------------


select * from passenger where pnr = '3410383';

select * from reserve where pnr = '3410383';

-- Given pid of passenger calculate the waiting list number if it's waiting listed
SET @ppid = 163;

SELECT count(*) as WL
FROM waiting_list as W, waiting_list as W2
WHERE W.train_no = W2.train_no
	AND W.week_no = W2.week_no
	AND W.trip_no = W2.trip_no
    AND W.class_type = W2.class_type
    AND W2.pid = @ppid
    AND W2.pid <> W.pid
    AND ((W2.priority > W.priority) or ((W2.priority = W.priority) and (W2.pid >= W.pid)))
	AND NOT(
		(
			(SELECT dist FROM time_table as TT1 
			WHERE TT1.train_no = W.train_no 
			AND TT1.st_code = W2.going_to) 
			<=
			(SELECT dist FROM time_table as TT2 
			WHERE TT2.train_no =W.train_no 
			AND TT2.st_code = W.boarding_from)
		) 
		OR
		(
			(SELECT dist FROM time_table as TT1 
			WHERE TT1.train_no = W.train_no 
			AND TT1.st_code = W2.boarding_from) 
			>=
			(SELECT dist FROM time_table as TT2 
			WHERE TT2.train_no = W.train_no 
			AND TT2.st_code = W.going_to)
		)
	);
