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

-- given passengers, src, dest, date, class_type
SET @tempsrc = 'KOTA';
SET @tempdest = 'BRC';
SET @temptrainid = '22210';
SET @tempclasstype = 'A';
SET @tempdate = DATE('2022-03-05');
SET @tempdatetime = (SELECT distinct departure 
    FROM sched 
    WHERE train_id=@temptrainid AND st_code=@tempsrc AND DATE(departure)=@tempdate);

-- few passenger details 
SET @pcnt = 1; -- passenger count
SET @pname = 'Aadit Kant Jha';
SET @pag = 20;
SET @gender = 'Male';
SET @mealOption = null;

-- calculate fare
SET @dist = get_dist(@tempdest, @temptrainid)-get_dist(@tempsrc,@temptrainid);
SET @fare = (SELECT 
    @pcnt*((CL.cost_per_km* @dist)+ FL.additional_cost) 
    FROM class_layout as CL, fare_lookup as FL
    WHERE CL.class_type = @tempclasstype
        AND FL.train_type = (SELECT DISTINCT T.train_type FROM train as T WHERE T.id = @temptrainid));
        

INSERT INTO ticket VALUES
('111111111', 1, @temptrainid, @tempdatetime, @tempsrc, @tempdest, @fare, '');
INSERT INTO passenger VALUES
('111111111', @pname, @gender, @pag, 'Confirmed', @meal_option);
INSERT INTO reserve VALUES 
(1, 1,@tempclasstype,'111111111')

