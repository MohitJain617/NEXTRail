CREATE database reservation_system;
use reservation_system;

CREATE TABLE credentials (
	user_name varchar(20) PRIMARY KEY,
    passcode varchar(20) NOT NULL,
    CHECK (LENGTH(passcode) > 7)
);

 CREATE TABLE user_account (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(20) NOT NULL,
    middle_name VARCHAR(20),
    last_name VARCHAR(20),
    first_line VARCHAR(255) NOT NULL,
    second_line VARCHAR(255),
    pin INT NOT NULL,
    age INT,
    phone_no VARCHAR(10),
    PRIMARY KEY(user_id),
    CHECK (age>=18),
    CHECK ((pin > 99999) AND (pin < 1000000)),
    FOREIGN KEY (user_name) REFERENCES Credentials(user_name)
);

CREATE TABLE station (
	st_code VARCHAR(10) PRIMARY KEY,
    st_name VARCHAR(30) NOT NULL
);

CREATE TABLE train (
	id INT PRIMARY KEY,
    train_name VARCHAR(30) NOT NULL,
    src VARCHAR(10) NOT NULL,
    destination VARCHAR(10) NOT NULL,
    train_type VARCHAR (30) NOT NULL,
    FOREIGN KEY (src) REFERENCES Station(st_code),
    FOREIGN KEY (destination) REFERENCES Station(st_code)
);

CREATE TABLE ticket (
	pnr VARCHAR(10) PRIMARY KEY,
    user_id INT,
    train_id INT NOT NULL,
    boarding_time DATETIME,
    boarding_from VARCHAR(10) NOT NULL,
    going_to VARCHAR(10) NOT NULL,
    fare INT,
    booking_details VARCHAR(255),
    FOREIGN KEY (going_to) REFERENCES Station(st_code),
    FOREIGN KEY (boarding_from) REFERENCES Station(st_code),   
    FOREIGN KEY (train_id) REFERENCES train(id),            
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)     -- Buys
);

CREATE TABLE receipt (
	receipt_no INT PRIMARY KEY,
    transaction_time DATETIME DEFAULT now(),
    payment_mode VARCHAR(20),
    pnr VARCHAR(10) NOT NULL,
	user_id INT,
    FOREIGN KEY (pnr) REFERENCES ticket(pnr),  -- generates
    FOREIGN KEY (user_id) REFERENCES user_account(user_id), -- keeps 
    CHECK(payment_mode in ('UPI', 'Credit Card', 'Debit Card','Bank Transfer'))
);


CREATE TABLE adm (
	user_name VARCHAR(20) PRIMARY KEY,
    passcode VARCHAR(30),
    CHECK (LENGTH(passcode) > 7)
);

CREATE TABLE passenger (
	pnr VARCHAR(10) NOT NULL,
    pname VARCHAR(30) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    age INT NOT NULL,
    stat VARCHAR(20),
	meal_option VARCHAR(10),
    FOREIGN KEY (pnr) REFERENCES ticket(pnr),       -- Belongs To 
	CHECK (meal_option in ('veg','non-veg',null)),
    CHECK (stat in ('Confirmed','Waiting','Cancelled')),
    CHECK (age >= 0),
    CHECK (gender in ('Male','Female','Other'))
);


CREATE TABLE seat_no (
	num INT PRIMARY KEY
);

CREATE TABLE class_layout (
	class_type VARCHAR(20) PRIMARY KEY,
    class_name VARCHAR(30) NOT NULL,
    capacity INT NOT NULL
);

-- Relations Table --

CREATE TABLE sched (
	train_id INT NOT NULL,
    st_code VARCHAR(10) NOT NULL,
	trip_no INT,
    arrival DATETIME NOT NULL,
    departure DATETIME NOT NULL,
    PRIMARY KEY(train_id,st_code),
    FOREIGN KEY (train_id) REFERENCES train(id),
    FOREIGN KEY (st_code) REFERENCES Station(st_code)
    -- TODO : add arrival < departure constraint
);

CREATE TABLE fare_lookup (
	train_type VARCHAR(30),
    class_type VARCHAR(20),
    cost INT NOT NULL
);

CREATE TABLE reserve (
	id INT NOT NULL,
    seat_no INT NOT NULL,
    class_type VARCHAR (20) NOT NULL,
    pnr VARCHAR(10),
    PRIMARY KEY(pnr,class_type,seat_no,id),
    FOREIGN KEY (pnr) REFERENCES ticket(pnr)
);


CREATE TABLE structure (
	train_id INT NOT NULL,
    size INT NOT NULL,
    class_type VARCHAR(20),
    PRIMARY KEY(train_id, class_type)
);
