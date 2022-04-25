use reservation_system;

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
    


drop function if exists get_weekNo;
DELIMITER //
create function get_weekNo(temp_date DATE)
    RETURNS INTEGER
    DETERMINISTIC
    BEGIN
    declare val INTEGER ;
    SET val = (SELECT TIMESTAMPDIFF(WEEK,DATE("1970-01-05"),temp_date));
    RETURN val;
    END //



DELIMITER //
create function get_daytime(weekno INT, days INT)
    RETURNS date
    DETERMINISTIC
    BEGIN
    declare val date;
	SET val = date_add("1970-01-05", INTERVAL weekno WEEK);
    SET val = date_add(val,INTERVAL days day);
    RETURN val;
    END //
    
    