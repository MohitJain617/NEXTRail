use reservation_system;
CREATE ROLE 'Admins'@'localhost', 'Passenger'@'localhost', 'Financials'@'localhost', 'Ministry'@'localhost', 'Employees'@'localhost';

GRANT ALL ON * 
TO 'Admins'@'localhost';

GRANT SELECT 
ON waiting_list_count 
TO 'Employees'@'localhost', 'Ministry'@'localhost', 'Passenger'@'localhost';

GRANT SELECT 
ON waiting_list
TO 'Employees'@'localhost', 'Ministry'@'localhost', 'Passenger'@'waiting_list';

GRANT SELECT 
ON ticket_view
TO 'Passenger'@'localhost','Financials'@'localhost','Employees'@'localhost';

GRANT SELECT
ON seats_view
TO 'Passenger'@'localhost','Employees'@'localhost';

GRANT ALL ON seats_view
TO 'Ministry'@'localhost';

GRANT SELECT
ON stations_view
TO 'Employees'@'localhost', 'Passenger'@'localhost';

GRANT SELECT
ON station
TO 'Employees'@'localhost', 'Passenger'@'localhost';

GRANT ALL 
ON station 
TO 'Ministry'@'localhost';
GRANT ALL 
ON train
TO 'Ministry'@'localhost';
GRANT ALL
ON time_table 
TO 'Ministry'@'localhost';
GRANT ALL
ON sched 
TO 'Ministry'@'localhost';
GRANT ALL
ON class_layout 
TO 'Ministry'@'localhost';
GRANT ALL
ON seat_no 
TO 'Ministry'@'localhost';

GRANT SELECT
ON station 
TO 'Employees'@'localhost', 'Passenger'@'localhost';

GRANT SELECT
ON sched
TO 'Employees'@'localhost','Passenger'@'localhost';

GRANT SELECT  
ON train
TO 'Employees'@'localhost','Passenger'@'localhost';

GRANT SELECT 
ON fare_lookup
TO 'Employees'@'localhost','Passenger'@'localhost';

GRANT SELECT 
ON class_layout
TO 'Employees'@'localhost','Passenger'@'localhost';

GRANT SELECT 
ON receipt
TO 'Financials'@'localhost';
GRANT UPDATE 
ON receipt
TO 'Financials'@'localhost';
GRANT SELECT 
ON fare_lookup
TO 'Financials'@'localhost';

GRANT SELECT 
ON class_layout
TO 'Financials'@'localhost';

CREATE USER "adminboi"@"localhost" IDENTIFIED BY 'supersecretpassword';
GRANT 'Admins'@'localhost' to "adminboi"@"localhost";