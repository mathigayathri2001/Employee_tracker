-- check the database company_db is alredy exist 
-- if so, drop the databse otherwise create database and use it 
DROP DATABASE IF EXISTS company_db;
CREATE database company_db;
USE company_db;

-- create table department
 CREATE TABLE DEPARTMENT (
    ID INTEGER AUTO_INCREMENT NOT NULL,
    NAME VARCHAR(30) NOT NULL,
    PRIMARY KEY (ID)
);

-- create table role
CREATE TABLE ROLE (
  ID INTEGER AUTO_INCREMENT NOT NULL,
  TITLE  VARCHAR(30) NOT NULL, 
  SALARY DECIMAL(10,2) NOT NULL,
  DEPARTMENT_ID INTEGER NOT NULL,
  PRIMARY KEY (ID)
  
);

-- create table employee
CREATE TABLE EMPLOYEE (
  ID INTEGER AUTO_INCREMENT NOT NULL,
  FIRST_NAME VARCHAR(30) NOT NULL,
  LAST_NAME  VARCHAR(30) NOT NULL, 
  ROLE_ID INTEGER NOT NULL,
  MANAGER_ID INTEGER ,
  PRIMARY KEY (id)
);



