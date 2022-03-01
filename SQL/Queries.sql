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

SELECT train_id FROM sched as S
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
SET @tempsrc = "NDLS";
SET @tempdest = "MMCT";
SET @tempdate = DATE('2022-03-05');

SELECT train_id FROM sched as S
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
