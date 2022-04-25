DELIMITER //
create function get_dist(temp_station VARCHAR(10), temp_train_id VARCHAR(6))
    RETURNS INTEGER
    DETERMINISTIC
    BEGIN
    declare dist_val INTEGER ;
        SELECT S.dist INTO dist_val
        FROM sched as S
        WHERE S.train_id=temp_train_id
            AND S.trip_no=1
            AND S.st_code = temp_station;
    RETURN dist_val;
    END //

SET @pcnt = 1;
-- given passengers, src, dest, date, class_type
SET @tempsrc = 'KOTA';
SET @tempdest = 'BRC';
SET @temptrainid = '22210';
SET @tempclasstype = 'A';
SET @tempdate = DATE('2022-03-05');
SET @tempdatetime = (SELECT distinct departure FROM sched WHERE train_id=@temptrainid AND st_code=@tempsrc AND DATE(departure)=@tempdate);

-- calculate fare
SET @dist = get_dist(@tempdest, @temptrainid)-get_dist(@tempsrc,@temptrainid);
SET @fare = (SELECT @pcnt*((CL.cost_per_km* @dist)+ FL.additional_cost) FROM class_layout as CL, fare_lookup as FL WHERE CL.class_type = @tempclasstype
        AND FL.train_type = (SELECT DISTINCT T.train_type FROM train as T WHERE T.id = @temptrainid));
        

INSERT INTO ticket VALUES
('111111111', 1, @temptrainid, @tempdatetime, @tempsrc, @tempdest, @fare, '');
INSERT INTO passenger VALUES
('111111111', 'Aadit Kant Jha', 'Male', 20, 'Confirmed', null);
INSERT INTO reserve VALUES 
(1, 1,@tempclasstype,'111111111');
-- coach no, seat no, class type, pnr


-- given passengers, src, dest, date, class_type
SET @tempsrc = 'NDLS';
SET @tempdest = 'MMCT';
SET @temptrainid = '22210';
SET @tempclasstype = 'A';
SET @tempdate = DATE('2022-03-04');
SET @tempdatetime = (SELECT distinct departure FROM sched WHERE train_id=@temptrainid AND st_code=@tempsrc AND DATE(departure)=@tempdate);

-- calculate fare
SET @dist = get_dist(@tempdest, @temptrainid)-get_dist(@tempsrc,@temptrainid);
SET @fare = (SELECT @pcnt*((CL.cost_per_km* @dist)+ FL.additional_cost) FROM class_layout as CL, fare_lookup as FL WHERE CL.class_type = @tempclasstype
        AND FL.train_type = (SELECT DISTINCT T.train_type FROM train as T WHERE T.id = @temptrainid));
        

INSERT INTO ticket VALUES
('111111112', 1, @temptrainid, @tempdatetime, @tempsrc, @tempdest, @fare, '');
INSERT INTO passenger VALUES
('111111112', 'Sohum Sikdar', 'Male', 21, 'Confirmed', 'non-veg');
INSERT INTO reserve VALUES 
(1, 1,'H','111111112');
-- coach no, seat no, class type, pnr


-- given passengers, src, dest, date, class_type
SET @tempsrc = 'NDLS';
SET @tempdest = 'BRC';
SET @temptrainid = '22210';
SET @tempclasstype = 'A';
SET @tempdate = DATE('2022-03-04');
SET @tempdatetime = (SELECT distinct departure FROM sched WHERE train_id=@temptrainid AND st_code=@tempsrc AND DATE(departure)=@tempdate);

-- calculate fare
SET @dist = get_dist(@tempdest, @temptrainid)-get_dist(@tempsrc,@temptrainid);
SET @fare = (SELECT @pcnt*((CL.cost_per_km* @dist)+ FL.additional_cost) FROM class_layout as CL, fare_lookup as FL WHERE CL.class_type = @tempclasstype
        AND FL.train_type = (SELECT DISTINCT T.train_type FROM train as T WHERE T.id = @temptrainid));
        

INSERT INTO ticket VALUES
('111111113', 1, @temptrainid, @tempdatetime, @tempsrc, @tempdest, @fare, '');
INSERT INTO passenger VALUES
('111111113', 'Abhik S Basu', 'Male', 20, 'Confirmed', 'non-veg');
INSERT INTO reserve VALUES 
(1, 3,@tempclasstype,'111111113');
-- coach no, seat no, class type, pnr

-- given passengers, src, dest, date, class_type
SET @tempsrc = 'KOTA';
SET @tempdest = 'MMCT';
SET @temptrainid = '22210';
SET @tempclasstype = 'A';
SET @tempdate = DATE('2022-03-05');
SET @tempdatetime = (SELECT distinct departure FROM sched WHERE train_id=@temptrainid AND st_code=@tempsrc AND DATE(departure)=@tempdate);

-- calculate fare
SET @dist = get_dist(@tempdest, @temptrainid)-get_dist(@tempsrc,@temptrainid);
SET @fare = (SELECT @pcnt*((CL.cost_per_km* @dist)+ FL.additional_cost) FROM class_layout as CL, fare_lookup as FL WHERE CL.class_type = @tempclasstype
        AND FL.train_type = (SELECT DISTINCT T.train_type FROM train as T WHERE T.id = @temptrainid));


INSERT INTO ticket VALUES
('111111114', 1, @temptrainid, @tempdatetime, @tempsrc, @tempdest, @fare, '');
INSERT INTO passenger VALUES
('111111114', 'Mohit Jain', 'Male', 19, 'Confirmed', 'veg');
INSERT INTO reserve VALUES 
(1, 4,@tempclasstype,'111111114');
-- coach no, seat no, class type, pnr
