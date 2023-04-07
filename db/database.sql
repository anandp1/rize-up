DROP DATABASE IF EXISTS RIZEUP;
CREATE DATABASE RIZEUP;
USE RIZEUP;


DROP TABLE IF EXISTS NO_REGISTERED;
CREATE TABLE NO_REGISTERED (
    count INT NOT NULL,
    class_time TIME NOT NULL,
    class_DoW VARCHAR(2) NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    PRIMARY KEY (count, class_time, class_DoW, class_name, timestamp)
);

DROP TABLE IF EXISTS MEMBER;
CREATE TABLE MEMBER (
    email VARCHAR(255),
    birth_date DATE,
    age INT,
    gender CHAR(1),
    password VARCHAR(255),
    first_name VARCHAR(255),
    middle_name VARCHAR(255),
    last_name VARCHAR(255),
    date_joined DATE,
    membership_name VARCHAR(255),
    gym_id INT,
    PRIMARY KEY (email)
);

INSERT INTO MEMBER (email, birth_date, age, gender, password, first_name, middle_name, last_name, date_joined, membership_name, gym_id)
VALUES
('test@member.com', '2000-01-01', '23', 'M', 'test', 'Joe', NULL, 'Donald', '2022-01-01', 'general', '002');

DROP TABLE IF EXISTS MANAGER;
CREATE TABLE MANAGER (
    email VARCHAR(255),
    birth_date DATE,
    age INT,
    gender CHAR(1),
    password VARCHAR(255),
    first_name VARCHAR(255),
    middle_name VARCHAR(255),
    last_name VARCHAR(255),
    gym_id INT,
    PRIMARY KEY (email)
);

INSERT INTO MANAGER (email, birth_date, age, gender, password, first_name, middle_name, last_name, gym_id)
VALUES
('test@manager.com', '2000-01-01', '23', 'M', 'test', 'Joe', NULL, 'Donald', '002');

DROP TABLE IF EXISTS FRONT_DESK;
CREATE TABLE FRONT_DESK (
    email VARCHAR(255),
    birth_date DATE,
    age INT,
    gender CHAR(1),
    password VARCHAR(255),
    first_name VARCHAR(255),
    middle_name VARCHAR(255),
    last_name VARCHAR(255),
    gym_id INT,
    PRIMARY KEY (email)
);

INSERT INTO FRONT_DESK (email, birth_date, age, gender, password, first_name, middle_name, last_name, gym_id)
VALUES
('test@frontdesk.com', '2000-01-01', '23', 'M', 'test', 'Joe', NULL, 'Donald', '002');

DROP TABLE IF EXISTS TRAINER;
CREATE TABLE TRAINER (
    email VARCHAR(255),
    birth_date DATE,
    age INT,
    gender CHAR(1),
    password VARCHAR(255),
    first_name VARCHAR(255),
    middle_name VARCHAR(255),
    last_name VARCHAR(255),
    gym_id INT,
    PRIMARY KEY (email)
);

INSERT INTO TRAINER (email, birth_date, age, gender, password, first_name, middle_name, last_name, gym_id)
VALUES
('test@trainer.com', '2000-01-01', '23', 'M', 'test', 'Joe', NULL, 'Donald', '002');