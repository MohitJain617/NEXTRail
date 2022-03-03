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

SELECT train_id FROM sched as S
WHERE S.st_code = @tempsrc
	AND DATE(S.departure) = @tempdate
    AND EXISTS (
		SELECT * FROM sched as S2
        WHERE S2.trip_no = S.trip_no
			AND S2.train_id = S.train_id
            AND S2.arrival > S.departure
            AND S2.st_code = @tempdest
);

-- Query for trains between two stations sorted by Departure time at source -- 
SET @tempsrc = "MFP";
SET @tempdest = "BJU";
SET @tempdate = DATE('2022-03-05');

SELECT train_id, S.departure FROM sched as S
WHERE S.st_code = @tempsrc
	AND DATE(S.departure) = @tempdate
    AND EXISTS (
		SELECT * FROM sched as S2
        WHERE S2.trip_no = S.trip_no
			AND S2.train_id = S.train_id
            AND S2.arrival > S.departure
            AND S2.st_code = @tempdest
) ORDER BY S.departure;

-- Query for trains between two stations sorted by Arrival time at Destination -- 
SET @tempsrc = "MFP";
SET @tempdest = "BJU";
SET @tempdate = DATE('2022-03-05');

SELECT train_id, S.arrival FROM sched as S
WHERE S.st_code = @tempdest
    AND EXISTS (
		SELECT * FROM sched as S2
        WHERE S2.trip_no = S.trip_no
			AND DATE(S2.departure) = @tempdate
			AND S2.train_id = S.train_id
            AND S.arrival > S2.departure
            AND S2.st_code = @tempsrc
) ORDER BY S.arrival;


-- Query for trains between two stations sorted by total time -- 
SET @tempsrc = "HJP";
SET @tempdest = "MFP";
SET @tempdate = DATE('2022-03-05');

SELECT train_id FROM sched as S
WHERE S.st_code = @tempsrc
	AND DATE(S.departure) = @tempdate
    AND EXISTS (
		SELECT * FROM sched as S2
        WHERE S2.trip_no = S.trip_no
			AND S2.train_id = S.train_id
            AND S2.arrival > S.departure
            AND S2.st_code = @tempdest
) ORDER BY ( 
	TIMESTAMPDIFF (MINUTE, S.departure, (
		SELECT arrival FROM sched as S2
		WHERE S2.trip_no = S.trip_no
			AND S2.train_id = S.train_id
			AND S2.st_code = @tempdest
		)
    )
);


-- all the seats given a train
SET @temptrain = '11123';

SELECT S.train_id, S.class_type as coach, SN2.num as coach_no, SN.num as seat_no
FROM structure AS S,  class_layout as C, seat_no AS SN2, seat_no as SN
WHERE S.train_id = @temptrain
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
    WHERE train_id=@temptrain AND st_code=@tempsrc AND DATE(departure)=@tempdatetime);

SET @tempsrcdatetime = (SELECT distinct departure 
    FROM sched 
    WHERE train_id=@temptrain AND st_code=@tempsrc AND DATE(departure)=@tempdatetime);

SET @tempdestdatetime = (SELECT distinct arrival 
    FROM sched 
    WHERE train_id=@temptrain AND st_code=@tempdest AND trip_no = @temptripno);

SELECT S.train_id, S.class_type as coach, SN2.num as coach_no, SN.num as seat_no
FROM structure AS S,  class_layout as C, seat_no AS SN2, seat_no as SN
WHERE S.train_id = @temptrain
    AND S.class_type = C.class_type
    AND SN2.num <= S.size
    AND SN.num <= C.capacity
    AND NOT EXISTS (
		SELECT * FROM reserve as R, ticket as T, passenger as P
		WHERE T.train_id = S.train_id AND R.class_type = S.class_type AND R.id = SN2.num AND R.seat_no = SN.num
        AND R.pnr = T.pnr 
        AND T.pnr = P.pnr AND P.stat='Confirmed'
		AND T.train_id = @temptrain
		AND ((
				@tempdestdatetime >= T.boarding_time 
                AND @tempdestdatetime <= (SELECT S2.arrival FROM sched AS S2
										WHERE S2.train_id = T.train_id 
                                        AND S2.st_code = T.going_to
                                        AND S2.trip_no = (
											SELECT S3.trip_no from sched as S3
											WHERE T.boarding_time = S3.departure
                                            AND S3.train_id = T.train_id
											AND S3.st_code = T.boarding_from
                                        )
				)
            ) OR (
				@tempsrcdatetime >= T.boarding_time 
                AND @tempsrcdatetime <= (SELECT S2.arrival FROM sched AS S2
										WHERE S2.train_id = T.train_id 
                                        AND S2.st_code = T.going_to
                                        AND S2.trip_no = (
											SELECT S3.trip_no from sched as S3
											WHERE T.boarding_time = S3.departure
                                            AND S3.train_id = T.train_id
											AND S3.st_code = T.boarding_from
                                        )
				)
                
            ) OR (
				@tempsrcdatetime <= T.boarding_time
                AND @tempdestdatetime >= (SELECT S2.arrival FROM sched AS S2
										WHERE S2.train_id = T.train_id 
                                        AND S2.st_code = T.going_to
                                        AND S2.trip_no = (
											SELECT S3.trip_no from sched as S3
											WHERE T.boarding_time = S3.departure
                                            AND S3.train_id = T.train_id
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