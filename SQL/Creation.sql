CREATE database reservation_system;
use reservation_system;

CREATE TABLE Credentials (
	userName varchar(20) PRIMARY KEY,
    passcode varchar(20) NOT NULL,
    CHECK (LENGTH(passcode) > 7)
);

 CREATE TABLE user (
    userID INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(20) NOT NULL UNIQUE,
    firstName VARCHAR(20) NOT NULL,
    middleName VARCHAR(20),
    lastName VARCHAR(20),
    firstLine VARCHAR(255),
    secondLine VARCHAR(255),
    PIN INT NOT NULL,
    age INT,
    phone_no VARCHAR(10),
    PRIMARY KEY(userID),
    CHECK (age>=18),
    FOREIGN KEY (userName) REFERENCES Credentials(userName)
);

CREATE TABLE Station (
	st_code VARCHAR(10) PRIMARY KEY,
    st_name VARCHAR(30) not null
);

CREATE TABLE Train (
	id INT PRIMARY KEY,
    tr_name VARCHAR(30) NOT NULL,
    src VARCHAR(10),
    destination VARCHAR(10),
    type VARCHAR (30),
    FOREIGN KEY (src) REFERENCES Station(st_code),
    FOREIGN KEY (destination) REFERENCES Station(st_code)
);

CREATE TABLE Ticket (
	PNR VARCHAR(10) PRIMARY KEY,
    userID INT,
    train_id INT NOT NULL,
    boardingTime DATETIME,
    boardingFrom VARCHAR(10) NOT NULL,
    goingTo VARCHAR(10) NOT NULL,
    fare INT,
    mealOption VARCHAR(10),
    bookingDetails VARCHAR(255),
    CHECK (mealOption in ('veg','non-veg',null)),
    FOREIGN KEY (goingTo) REFERENCES Station(st_code),
    FOREIGN KEY (boardingFrom) REFERENCES Station(st_code),
    FOREIGN KEY (train_id) REFERENCES Train(id)
);

CREATE TABLE Receipt (
	receiptNo INT PRIMARY KEY,
    transactionTime DATETIME DEFAULT now(),
    paymentMode VARCHAR(20),
    PNR VARCHAR(10) NOT NULL,
	userID INT,
    FOREIGN KEY (PNR) REFERENCES Ticket(PNR),
    CHECK(paymentMode in ('UPI', 'Credit Card', 'Debit Card','Bank Transfer'))
);


CREATE TABLE Adm (
	username VARCHAR(20) PRIMARY KEY,
    passcode VARCHAR(30),
    CHECK (LENGTH(passcode) > 7)
);

CREATE TABLE Passenger (
	UID VARCHAR(20) PRIMARY KEY,
    pname VARCHAR(30) NOT NULL,
    gender VARCHAR(10),
    age INT NOT NULL,
    CHECK (age >= 0),
    CHECK (gender in ('Male','Female','Other'))
);


CREATE TABLE Seat_no (
	num INT PRIMARY KEY
);

CREATE TABLE Class_layout (
	classType VARCHAR(20) PRIMARY KEY,
    className VARCHAR(20),
    capacity INT NOT NULL
);

-- Relations Table --

CREATE TABLE Owns (
	UID VARCHAR(20),
    PNR VARCHAR(10),
    stat VARCHAR(12),
    CHECK (stat in ('Waiting','Reserved','Cancelled')),
    PRIMARY KEY(UID,PNR)
);

CREATE TABLE Schedule (
	id INT NOT NULL,
    st_code VARCHAR(10) NOT NULL,
	tripNo INT,
    arrival DATETIME NOT NULL,
    departure DATETIME NOT NULL,
    PRIMARY KEY(id,st_code),
    FOREIGN KEY (id) REFERENCES Train(id),
    FOREIGN KEY (st_code) REFERENCES Station(st_code)
    -- TODO : add arrival < departure constraint
);

CREATE TABLE FareLookup (
	trainType VARCHAR(30),
    classType VARCHAR(20),
    cost INT NOT NULL
);

CREATE TABLE Reserve (
	id INT NOT NULL,
    seatno INT NOT NULL,
    classType VARCHAR (20) NOT NULL,
    PNR VARCHAR(10),
    PRIMARY KEY(PNR,classType,seatno,id),
    FOREIGN KEY (PNR) REFERENCES Ticket(PNR)
);
