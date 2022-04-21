drop function if exists get_dayNo;
DELIMITER //
create function get_dayNo(temp_date DATE)
    RETURNS INTEGER
    DETERMINISTIC
    BEGIN
    declare val INTEGER ;
	SET val = dayofweek(temp_date);
    SET val = val-1;
    SET val = if(val=0,7,val);
    RETURN val;
    END //
    
DELIMITER //
create function get_daytime(weekno INT, days INT)
    RETURNS date
    DETERMINISTIC
    BEGIN
    declare val date;
	SET val = date_add("1970-01-01", INTERVAL weekno WEEK);
    SET val = date_add(val,INTERVAL days day);
    RETURN val;
    END //

select * from ticket;
set @dx = get_daytime(2726,2);
select @dx;

set @tripweek = (SELECT TIMESTAMPDIFF(WEEK,"1970-01-01",@dx));
select @tripweek;
select * from time_table;
use reservation_system;

SET @tempday = get_dayNo(DATE('2022-04-25'));
SELECT @tempday;

select * from sched where train_no='11123';
-- what i can do is, suppose i have the date at which i want  tickets
-- i can get the dayno for that date to find the train at that schedule
-- and now from that dayno query for the next day.

-- what is a connecting feature between date of reaching a stations and the sched time_table tables?
-- The answer might be the week. 

-- In the ticket we store the station as well 

-- what if instead of updating all these queries below what we do is create the old schedule table
-- from the new sched and time table that stores the value for say 2 weeks ahead of you. and you update this at 00:00 am everyday.

SET @tempdate = DATE('2022-04-03');
SET @tempday = get_dayNo(@tempdate);
CREATE TABLE sched_table AS
(SELECT * FROM sched NATURAL JOIN time_table
WHERE sched.trip_no + time_table.day_no - 1 >= @tempday);

ALTER TABLE sched_table
ADD arrival DATETIME;
ALTER TABLE sched_table
ADD departure DATETIME;

UPDATE TABLE sched_table
SET arrival = SELECT TIMESTAMP(DATE_ADD(@tempdate, INTERVAL trip_no+day_no-1-@tempday DAY),arrive);
UPDATE TABLE sched_table
SET departure = SELECT TIMESTAMP(DATE_ADD(@tempdate, INTERVAL trip_no+day_no-1-@tempday DAY),depart);

-- To check the validity of a username
SET @tempusername = 'cpharro0';
SELECT user_name FROM credentials WHERE user_name = @tempusername;

-- To authenticate a user -- 
SET @tempusername1 = 'cpharro0';
SET @temppassword1 = 'c3nrRpkG';

SELECT user_id, user_name 
FROM credentials NATURAL JOIN user_account
WHERE user_name = @tempusername1 
	AND passcode = @temppassword1;
    
-- Query for trains between two stations -- 
SET @tempsrc = "UMB";
SET @tempdest = "PNP";
SET @tempdate = DATE('2022-03-05');
SET @tempdayno = get_dayNo(@tempdate);

SELECT train_no FROM sched as S
WHERE S.st_code = @tempsrc
	AND DATE(S.departure) = @tempdate
    AND EXISTS (
		SELECT * FROM sched as S2
        WHERE S2.trip_no = S.trip_no
			AND S2.train_no = S.train_no
            AND S2.arrival > S.departure
            AND S2.st_code = @tempdest
);

-- updated query
SET @tempdayno = get_dayNo(@tempdate);

SELECT T.train_no, T.departure FROM time_table as T NATURAL JOIN sched as S
WHERE T.st_code = @tempsrc
	AND (T.dayno+S.trip_no-1) = @tempdayno
	AND EXISTS (
		SELECT * FROM time_table as T2 NATURAL JOIN sched as S2
		WHERE S2.trip_no = S.trip_no
			AND S2.train_no = S.train_no
			AND (T.dayno) < (T2.dayno)
			AND T2.st_code = @tempdest 
);


-- SELECT train_no FROM sched as S NATURAL JOIN time_table as T
-- WHERE T.st_code = @tempsrc

-- Query for trains between two stations sorted by Departure time at source -- 
SET @tempsrc = "MFP";
SET @tempdest = "BJU";
SET @tempdate = DATE('2022-03-05');
SET @tempdayno = get_dayNo(@tempdate);

SELECT train_no, S.departure FROM sched as S
WHERE S.st_code = @tempsrc
	AND DATE(S.departure) = @tempdate
    AND EXISTS (
		SELECT * FROM sched as S2
        WHERE S2.trip_no = S.trip_no
			AND S2.train_no = S.train_no
            AND S2.arrival > S.departure
            AND S2.st_code = @tempdest
) ORDER BY S.departure;

-- updated query
SET @tempdayno = get_dayNo(@tempdate);

SELECT T.train_no, T.departure FROM time_table as T NATURAL JOIN sched as S
WHERE T.st_code = @tempsrc
	AND (T.dayno+S.trip_no-1) = @tempdayno
	AND EXISTS (
		SELECT * FROM time_table as T2 NATURAL JOIN sched as S2
		WHERE S2.trip_no = S.trip_no
			AND S2.train_no = S.train_no
			AND (T.dayno) < (T2.dayno)
			AND T2.st_code = @tempdest 
) ORDER BY T.departure ;

-- Query for trains between two stations sorted by Arrival time at Destination -- 
SET @tempsrc = "MFP";
SET @tempdest = "BJU";
SET @tempdate = DATE('2022-03-05');
SET @tempdayno = get_dayNo(@tempdate);

SELECT train_no, S.arrival FROM sched as S
WHERE S.st_code = @tempdest
    AND EXISTS (
		SELECT * FROM sched as S2
        WHERE S2.trip_no = S.trip_no
			AND DATE(S2.departure) = @tempdate
			AND S2.train_no = S.train_no
            AND S.arrival > S2.departure
            AND S2.st_code = @tempsrc
) ORDER BY S.arrival;

-- updated query 

SELECT T.train_no, T.departure FROM time_table as T NATURAL JOIN sched as S
WHERE T.st_code = @tempdest
	AND EXISTS (
		SELECT * FROM time_table as T2 NATURAL JOIN sched as S2
		WHERE S2.trip_no = S.trip_no
			AND (T2.dayno+S2.trip_no-1) = @tempdayno
			AND S2.train_no = S.train_no
			AND (T.dayno) > (T2.dayno)
			AND T2.st_code = @tempsrc 
) ORDER BY T.arrival ;

-- Query for trains between two stations sorted by total time -- 
SET @tempsrc = "HJP";
SET @tempdest = "MFP";
SET @tempdate = DATE('2022-03-05');

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

-- all the seats given a train
SET @temptrain = '11123';

SELECT S.train_no, S.class_type as coach, SN2.num as coach_no, SN.num as seat_no
FROM structure AS S,  class_layout as C, seat_no AS SN2, seat_no as SN
WHERE S.train_no = @temptrain
	AND S.class_type = C.class_type
    AND SN2.num <= S.size
	AND SN.num <= C.capacity;
    
    
-- Query for avaiable tickets between two stations



SET @temptrain = '22210';
SET @tempdatetime = DATE('2022-03-04');
SET @tempsrc = "NDLS";
SET @tempdest = "MMCT";

SET @temptripno = (SELECT distinct trip_no 
    FROM sched 
    WHERE train_no=@temptrain AND st_code=@tempsrc AND DATE(departure)=@tempdatetime);

SET @temptripno = (SELECT distinct trip_no
	FROM sched NATURAL JOIN 
)

SET @tempsrcdatetime = (SELECT distinct departure 
    FROM sched 
    WHERE train_no=@temptrain AND st_code=@tempsrc AND DATE(departure)=@tempdatetime);

SET @tempdestdatetime = (SELECT distinct arrival 
    FROM sched 
    WHERE train_no=@temptrain AND st_code=@tempdest AND trip_no = @temptripno);


-- given a station and a particular trip, return all the stations that come before it 
-- during the trip.

SELECT st_code
FROM time_table as TT
WHERE TT.train_no = @temptripno
AND (
	TT.dist < SELECT *
);

SELECT S.train_no, S.class_type as coach, SN2.num as coach_no, SN.num as seat_no
FROM structure AS S,  class_layout as C, seat_no AS SN2, seat_no as SN
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
		AND ((
				@tempdestdatetime >= T.boarding_time 
                AND @tempdestdatetime <= (SELECT S2.arrival FROM sched AS S2
										WHERE S2.train_no = T.train_no 
                                        AND S2.st_code = T.going_to
                                        AND S2.trip_no = (
											SELECT S3.trip_no from sched as S3
											WHERE T.boarding_time = S3.departure
                                            AND S3.train_no = T.train_no
											AND S3.st_code = T.boarding_from
                                        )
				)
            ) OR (
				@tempsrcdatetime >= T.boarding_time 
                AND @tempsrcdatetime <= (SELECT S2.arrival FROM sched AS S2
										WHERE S2.train_no = T.train_no 
                                        AND S2.st_code = T.going_to
                                        AND S2.trip_no = (
											SELECT S3.trip_no from sched as S3
											WHERE T.boarding_time = S3.departure
                                            AND S3.train_no = T.train_no
											AND S3.st_code = T.boarding_from
                                        )
				)
                
            ) OR (
				@tempsrcdatetime <= T.boarding_time
                AND @tempdestdatetime >= (SELECT S2.arrival FROM sched AS S2
										WHERE S2.train_no = T.train_no 
                                        AND S2.st_code = T.going_to
                                        AND S2.trip_no = (
											SELECT S3.trip_no from sched as S3
											WHERE T.boarding_time = S3.departure
                                            AND S3.train_no = T.train_no
											AND S3.st_code = T.boarding_from
                                        )
				)
            )
        )
	);

    
    
-- Query for the status of a ticket given pnr
SET @temppnr = '111111111';
SELECT * FROM ticket as T, passenger as P
WHERE T.pnr = @temppnr
AND P.pnr = T.pnr;


-- Query for all ticket booked by a user
SET @tempuser = 'cpharro0';
SELECT T.pnr, T.boarding_time, T.boarding_from, T.going_to, T.fare
FROM ticket as T, user_account as U
WHERE U.user_name = @tempuser
AND T.user_id = U.user_id;

-- Query to cancel a ticket with a given pnr
SET @temppnr = '111111111';

UPDATE passenger
SET stat='Cancelled'
WHERE pnr = @temppnr;

DELETE FROM reserve
WHERE pnr=@temppnr;