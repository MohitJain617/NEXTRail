drop database if exists reservation_system;

CREATE database reservation_system;
use reservation_system;

CREATE TABLE station (
	st_code VARCHAR(10) PRIMARY KEY,
    st_name VARCHAR(36) NOT NULL
);

CREATE TABLE train (
	id VARCHAR(6) PRIMARY KEY,
    train_name VARCHAR(120) NOT NULL,
    src VARCHAR(10) NOT NULL,
    dest VARCHAR(10) NOT NULL,
    train_type VARCHAR (30) NOT NULL,
    pantry_avl BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (src) REFERENCES station(st_code),
    FOREIGN KEY (dest) REFERENCES station(st_code)
);

CREATE TABLE ticket (
	pnr VARCHAR(10) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    train_no VARCHAR(6) NOT NULL,
    trip_no INT,
    week_no INT,
    boarding_from VARCHAR(10) NOT NULL,
    going_to VARCHAR(10) NOT NULL,
    fare INT DEFAULT 0 NOT NULL,
    booking_details VARCHAR(255),
    FOREIGN KEY (going_to) REFERENCES station(st_code),
    FOREIGN KEY (boarding_from) REFERENCES station(st_code),   
    FOREIGN KEY (train_no) REFERENCES train(id)            
--     FOREIGN KEY (user_name) REFERENCES auth_user(id)     -- Buys
);

CREATE TABLE receipt (
	receipt_no INT PRIMARY KEY,
    transaction_time DATETIME DEFAULT now(),
    payment_mode VARCHAR(20),
    pnr VARCHAR(10) NOT NULL,
	username VARCHAR(50) NOT NULL,
    FOREIGN KEY (pnr) REFERENCES ticket(pnr),  -- generates
  --   FOREIGN KEY (user_name) REFERENCES auth_user(id), -- keeps 
    CHECK(payment_mode in ('UPI', 'Credit Card', 'Debit Card','Bank Transfer','Pending'))
);

CREATE TABLE adm (
	user_name VARCHAR(20) PRIMARY KEY,
    passcode VARCHAR(30),
    CHECK (LENGTH(passcode) > 5)
);

drop table if exists passenger;
CREATE TABLE passenger (
	pid INT auto_increment UNIQUE,
	pnr VARCHAR(10) NOT NULL,
    pname VARCHAR(30) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    age INT NOT NULL,
    stat VARCHAR(20),
	meal_option VARCHAR(10),
    class_type VARCHAR(2) NOT NULL,
    FOREIGN KEY (pnr) REFERENCES ticket(pnr),       -- Belongs To 
	CHECK (meal_option in ('veg','non-veg',null)),
    CHECK (stat in ('CNF','WL','CAN')),
    CHECK (age >= 0),
    CHECK (gender in ('Male','Female','Other'))
);

CREATE TABLE seat_no (
	num INT PRIMARY KEY
);

CREATE TABLE class_layout (
	class_type VARCHAR(2) PRIMARY KEY,
    class_name VARCHAR(30) NOT NULL,
	capacity INT NOT NULL,
    cost_per_km DECIMAL(3,2) NOT NULL
);

CREATE TABLE sched (
	train_no VARCHAR(6) NOT NULL,
    trip_no INT NOT NULL,
    PRIMARY KEY(train_no,trip_no),
    FOREIGN KEY (train_no) REFERENCES train(id)
);

-- Relations Table --

CREATE TABLE time_table (
	train_no VARCHAR(6) NOT NULL,
    st_code VARCHAR(10) NOT NULL,
    arrival TIME NOT NULL,
    departure TIME NOT NULL,
    dist INT,
    day_no INT,
    PRIMARY KEY (train_no,st_code),
    FOREIGN KEY (train_no) REFERENCES train(id),
    FOREIGN KEY (st_code) REFERENCES station(st_code)
);


CREATE TABLE fare_lookup (
	train_type VARCHAR(30) PRIMARY KEY,
    additional_cost INT NOT NULL
);

CREATE TABLE reserve (
	coach_no INT NOT NULL,
    seat_no INT NOT NULL,
    class_type VARCHAR (20) NOT NULL,
    pnr VARCHAR(10),
    PRIMARY KEY(pnr,class_type,seat_no,coach_no),
    FOREIGN KEY (pnr) REFERENCES ticket(pnr)
);


CREATE TABLE struct (
	train_no VARCHAR(6) NOT NULL,
    class_type VARCHAR(2),
    size INT NOT NULL,
    PRIMARY KEY(train_no, class_type)
);
-- ---------------Indexes-------------------
CREATE INDEX station_index ON station (st_name);
CREATE INDEX trainname_index ON train (train_name);
CREATE INDEX traintype_index ON train (train_type);
CREATE INDEX ticket_index ON ticket (trip_no, week_no);
CREATE INDEX ticket_fare ON ticket(fare);
CREATE INDEX receipt_index ON receipt (pnr);
CREATE INDEX passenger_index ON passenger(pnr);
CREATE INDEX class_layout_index ON class_layout (class_name);
CREATE INDEX time_table_index ON time_table (train_no);