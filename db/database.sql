DROP DATABASE IF EXISTS RIZEUP;
CREATE DATABASE RIZEUP;
USE RIZEUP;




DROP TABLE IF EXISTS REPORT;
CREATE TABLE REPORT (
    timestamp TIMESTAMP NOT NULL,
    num_gym_members INT NOT NULL,
    new_member_count INT NOT NULL,
    manager_email VARCHAR(50) NOT NULL,
    PRIMARY KEY (timestamp)
);


DROP TABLE IF EXISTS NO_REGISTERED;
CREATE TABLE NO_REGISTERED (
    count INT NOT NULL,
    Sec_no INT NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    PRIMARY KEY (count, Sec_no, class_name, timestamp)
);


DROP TABLE IF EXISTS MEMBER;
CREATE TABLE MEMBER (
    email VARCHAR(255)  NOT NULL,
    birth_date DATE NOT NULL,
    age INT,
    gender CHAR(1),
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    date_joined DATE  NOT NULL,
    membership_name VARCHAR(255) NOT NULL,
    gym_id INT  NOT NULL,
    PRIMARY KEY (email)
);


INSERT INTO MEMBER (email, birth_date, age, gender, password, first_name, middle_name, last_name, date_joined, membership_name, gym_id)
VALUES
('test@member.com', '2000-01-01', '23', 'M', 'test', 'Joeseph', NULL, 'Donald', '2022-01-01', 'Basic', '002');
INSERT INTO MEMBER (email, birth_date, age, gender, password, first_name, middle_name, last_name, date_joined, membership_name, gym_id)
VALUES
('test2@member.com', '2003-04-06', '20', 'F', 'test', 'Holly', NULL, 'Mcmember', '2023-04-04', 'Basic', '002');

DROP TABLE IF EXISTS MANAGER;
CREATE TABLE MANAGER (
    email VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    age INT,
    gender CHAR(1),
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    gym_id INT NOT NULL,
    PRIMARY KEY (email)
);


INSERT INTO MANAGER (email, birth_date, age, gender, password, first_name, middle_name, last_name, gym_id)
VALUES
('test@manager.com', '1995-01-01', '28', 'M', 'test', 'John', NULL, 'Dutton', '002');

DROP TABLE IF EXISTS FRONT_DESK;
CREATE TABLE FRONT_DESK (
    email VARCHAR(255) NOT NULL,
    birth_date DATE,
    age INT,
    gender CHAR(1),
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    gym_id INT NOT NULL,
    PRIMARY KEY (email)
);

INSERT INTO FRONT_DESK (email, birth_date, age, gender, password, first_name, middle_name, last_name, gym_id)
VALUES
('test@frontdesk.com', '2000-01-01', '23', 'F', 'test', 'Suzzy', NULL, 'Sunshine', '002');

DROP TABLE IF EXISTS TRAINER;
CREATE TABLE TRAINER (
    email VARCHAR(255) NOT NULL,
    birth_date DATE,
    age INT,
    gender CHAR(1),
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    gym_id INT NOT NULL,
    PRIMARY KEY (email)
);

INSERT INTO TRAINER (email, birth_date, age, gender, password, first_name, middle_name, last_name, gym_id)
VALUES
('test@trainer.com', '2000-01-01', '23', 'M', 'test', 'Jemmy', NULL, 'Trainer', '002');

DROP TABLE IF EXISTS GYM;
CREATE TABLE GYM (
    passcode INT NOT NULL,
    phone VARCHAR(12) NOT NULL,
    gym_hours VARCHAR(255),
    address VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(passcode)
);
INSERT INTO GYM (passcode, phone, gym_hours, address, name)
VALUES
('002', '403-555-0129', 'Mon-Sun 5AM - 12AM', '123 University Ave, NW', 'Rize Up');

DROP TABLE IF EXISTS MEMBERSHIP_PLANS;
CREATE TABLE MEMBERSHIP_PLANS (
    membership_name VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    price FLOAT  NOT NULL,
    PRIMARY KEY (membership_name)
);

INSERT INTO MEMBERSHIP_PLANS (membership_name, duration, price)
VALUES
('Basic', '2', '14.99');
INSERT INTO MEMBERSHIP_PLANS (membership_name, duration, price)
VALUES
('Premium', '2', '29.99');

DROP TABLE IF EXISTS MEMBERSHIP_PERKS;
CREATE TABLE MEMBERSHIP_PERKS (
    membership_name VARCHAR(255)  NOT NULL,
    perk VARCHAR(255)  NOT NULL,
    PRIMARY KEY (membership_name, perk),
    FOREIGN KEY (membership_name) REFERENCES MEMBERSHIP_PLANS (membership_name) ON DELETE CASCADE
);
INSERT INTO MEMBERSHIP_PERKS (membership_name, perk)
VALUES
('Premium', 'Unlimited free classes monthly');
INSERT INTO MEMBERSHIP_PERKS (membership_name, perk)
VALUES
('Premium', '10% off personal training');
INSERT INTO MEMBERSHIP_PERKS (membership_name, perk)
VALUES
('Basic', '1 free class monthly');

DROP TABLE IF EXISTS GYM_PLANS;
CREATE TABLE GYM_PLANS (
    membership_name VARCHAR(255)  NOT NULL,
    passcode INT NOT NULL,
    PRIMARY KEY (membership_name, passcode),
    FOREIGN KEY (membership_name) REFERENCES MEMBERSHIP_PLANS(membership_name) ON DELETE CASCADE,
    FOREIGN KEY (passcode) REFERENCES GYM (passcode) ON DELETE CASCADE
);
INSERT INTO GYM_PLANS (membership_name, passcode)
VALUES
('Premium', '002');
INSERT INTO GYM_PLANS (membership_name, passcode)
VALUES
('Basic', '002');

DROP TABLE IF EXISTS MESSAGE;
CREATE TABLE MESSAGE (
    sender_name VARCHAR(255)  NOT NULL,
    receiver_name VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP  NOT NULL,
    content VARCHAR(500) NOT NULL,
    trainer_email VARCHAR(255)  NOT NULL,
    member_email VARCHAR(255) NOT NULL,
    PRIMARY KEY (sender_name, receiver_name, timestamp),
    FOREIGN KEY (trainer_email) REFERENCES TRAINER(email) ON DELETE CASCADE,
    FOREIGN KEY (member_email) REFERENCES MEMBER(email)ON DELETE CASCADE
);

DROP TABLE IF EXISTS TRAINS;
CREATE TABLE TRAINS (
    member_email VARCHAR(255) NOT NULL,
    trainer_email VARCHAR(255) NOT NULL,
    PRIMARY KEY (member_email, trainer_email),
    FOREIGN KEY (trainer_email) REFERENCES TRAINER(email) ON DELETE CASCADE,
    FOREIGN KEY (member_email) REFERENCES MEMBER(email) ON DELETE CASCADE
);
INSERT INTO TRAINS (member_email, trainer_email)
VALUES
('test2@member.com', 'test@trainer.com');

DROP TABLE IF EXISTS PROFILE;
CREATE TABLE PROFILE(
    trainer_email VARCHAR(255) NOT NULL,
    about_me VARCHAR(255) NOT NULL,
    PRIMARY KEY (trainer_email),
    FOREIGN KEY (trainer_email) REFERENCES TRAINER(email) ON DELETE CASCADE
);
INSERT INTO PROFILE (trainer_email, about_me)
VALUES ('test@trainer.com', 'Just started at Rize Up and am xcited to start working with some new clients!');

DROP TABLE IF EXISTS TRAINER_INTERESTS;
CREATE TABLE TRAINER_INTERESTS (
    interest VARCHAR(255) NOT NULL,
    trainer_email VARCHAR(255) NOT NULL,
    PRIMARY KEY (interest, trainer_email),
    FOREIGN KEY (trainer_email) REFERENCES TRAINER(email) ON DELETE CASCADE
);
INSERT INTO TRAINER_INTERESTS (trainer_email, interest)
VALUES
('test@trainer.com', 'Hiking');
INSERT INTO TRAINER_INTERESTS (trainer_email, interest)
VALUES
('test@trainer.com', 'Crossfit');

DROP TABLE IF EXISTS TRAINER_EXPERIENCE;
CREATE TABLE TRAINER_EXPERIENCE(
    description VARCHAR(255) NOT NULL,
    years_of_experience INT NOT NULL,
    education VARCHAR(255),
    trainer_email VARCHAR(255) NOT NuLL,
    PRIMARY KEY (description, trainer_email),
    FOREIGN KEY (trainer_email) REFERENCES TRAINER (email) ON DELETE CASCADE
);
INSERT INTO TRAINER_EXPERIENCE (trainer_email, description, years_of_experience, education)
VALUES
('test@trainer.com', 'Study of muscle development', '6', 'Bachlor of Kinesiology');

DROP TABLE IF EXISTS CLASS;
CREATE TABLE CLASS(
    name VARCHAR(255) NOT NULL,
    length INT NOT NULL, 
    cost FLOAT NOT NULL,
    PRIMARY KEY(name)
);
INSERT INTO CLASS (name, length, cost)
VALUES
('Zoomba', '90', '19.99');
INSERT INTO CLASS (name, length, cost)
VALUES
('Spin', '60', '15.99');

DROP TABLE IF EXISTS SECTION;
CREATE TABLE SECTION(
    Sec_no INT NOT NULL,
    time VARCHAR(8) NOT NULL,
    day_of_week INT NOT NULL,
    capacity INT NOT NULL,
    Room_number INT,
    class_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (Sec_no, class_name),
    FOREIGN KEY (class_name) REFERENCES CLASS(name) ON DELETE CASCADE
);
INSERT INTO SECTION (Sec_no, time, day_of_week, capacity, Room_number, class_name)
VALUES
('01', '08:30 AM','1', '30', '03', 'Zoomba');
INSERT INTO SECTION (Sec_no, time, day_of_week, capacity, Room_number, class_name)
VALUES
('02', '08:30 AM','3', '30', '03', 'Zoomba');
INSERT INTO SECTION (Sec_no, time, day_of_week, capacity, Room_number, class_name)
VALUES
('01', '04:30 PM','2', '15', '01', 'Spin');
INSERT INTO SECTION (Sec_no, time, day_of_week, capacity, Room_number, class_name)
VALUES
('02', '04:30 PM','4', '15', '01', 'Spin');

DROP TABLE IF EXISTS JOINS;
CREATE TABLE JOINS(
    member_email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    Sec_no INT NOT NULL,
    PRIMARY KEY (member_email, name, Sec_no),
    FOREIGN KEY (name) REFERENCES CLASS (name) ON DELETE CASCADE,
    FOREIGN KEY (Sec_no) REFERENCES SECTION (Sec_no) ON DELETE CASCADE,
    FOREIGN KEY (member_email) REFERENCES MEMBER (email) ON DELETE CASCADE
);
INSERT INTO JOINS (Sec_no, name, member_email)
VALUES
('01', 'Spin', 'test2@member.com');
INSERT INTO JOINS (Sec_no, name, member_email)
VALUES
('02', 'Zoomba', 'test@member.com');

DROP TABLE IF EXISTS CLASSES_OFFERED;
CREATE TABLE CLASSES_OFFERED(
    class_name VARCHAR(255) NOT NULL,
    passcode INT NOT NULL,
    PRIMARY KEY(class_name, passcode),
    FOREIGN KEY(class_name) REFERENCES CLASS (name) ON DELETE CASCADE,
    FOREIGN KEY(passcode) REFERENCES GYM(passcode) ON DELETE CASCADE
);
INSERT INTO CLASSES_OFFERED (class_name, passcode)
VALUES
('Zoomba', '002');
INSERT INTO CLASSES_OFFERED (class_name, passcode)
VALUES
('Spin', '002');

DROP TABLE IF EXISTS TEACHES;
CREATE TABLE TEACHES(
    trainer_email VARCHAR(255) NOT NULL,
    Sec_no INT NOT NULL,
    class_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (trainer_email, Sec_no, class_name),
    FOREIGN KEY (trainer_email) REFERENCES TRAINER(email) ON DELETE CASCADE,
    FOREIGN KEY (Sec_no) REFERENCES SECTION(Sec_no) ON DELETE CASCADE,
    FOREIGN KEY (class_name) REFERENCES CLASS(name) ON DELETE CASCADE
);
INSERT INTO TEACHES (trainer_email, Sec_no, class_name)
VALUES
('test@trainer.com', '01','Zoomba');
INSERT INTO TEACHES (trainer_email, Sec_no, class_name)
VALUES
('test@trainer.com', '02','Zoomba');
INSERT INTO TEACHES (trainer_email, Sec_no, class_name)
VALUES
('test@trainer.com', '01','Spin');
INSERT INTO TEACHES (trainer_email, Sec_no, class_name)
VALUES
('test@trainer.com', '02','Spin');


ALTER TABLE REPORT
ADD FOREIGN KEY (manager_email) REFERENCES MANAGER (email) ON DELETE CASCADE;
ALTER TABLE NO_REGISTERED
ADD FOREIGN Key (timestamp) REFERENCES REPORT (timestamp) ON DELETE CASCADE;

ALTER TABLE MEMBER
ADD FOREIGN KEY (membership_name) REFERENCES MEMBERSHIP_PLANS(membership_name) ON DELETE CASCADE;
ALTER TABLE MEMBER
ADD FOREIGN Key (gym_id) REFERENCES GYM (passcode) ON DELETE CASCADE;

ALTER TABLE MANAGER
ADD FOREIGN KEY (gym_id) REFERENCES GYM (passcode) ON DELETE CASCADE;

ALTER TABLE FRONT_DESK
ADD FOREIGN KEY (gym_id) REFERENCES GYM (passcode) ON DELETE CASCADE;

ALTER TABLE TRAINER
ADD FOREIGN KEY (gym_id) REFERENCES GYM (passcode) ON DELETE CASCADE;