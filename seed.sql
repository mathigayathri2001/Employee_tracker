-- Inster values to the Department table
INSERT INTO DEPARTMENT (NAME)
 VALUES ("Sales");

 INSERT INTO DEPARTMENT (NAME)
 values ("Accounting");

 INSERT INTO DEPARTMENT (NAME)
 values ("Human-Resource");

 INSERT INTO DEPARTMENT (NAME)
 values ("IT");


-- Insert values to the role table
INSERT INTO ROLE (TITLE, SALARY, DEPARTMENT_ID)
 VALUES ("Sales Representative", 90000, 1);

INSERT INTO ROLE (TITLE, SALARY, DEPARTMENT_ID)
 VALUES ("Sales Manager", 100000, 1);

 INSERT INTO ROLE (TITLE, SALARY, DEPARTMENT_ID)
 VALUES ("Acoounting Clerk", 60000, 2);

 INSERT INTO ROLE (TITLE, SALARY, DEPARTMENT_ID)
 VALUES ("Account Manager", 80000, 2);

 INSERT INTO ROLE (TITLE, SALARY, DEPARTMENT_ID)
 VALUES ("HR Assistant", 70000, 3);

 INSERT INTO ROLE (TITLE, SALARY, DEPARTMENT_ID)
 VALUES ("HR Manager", 80000, 3);

 INSERT INTO ROLE (TITLE, SALARY, DEPARTMENT_ID)
 VALUES ("IT Manager", 90000, 4);


-- Insert values to the Employee table
INSERT INTO EMPLOYEE (FIRST_NAME,LAST_NAME,ROLE_ID,MANAGER_ID)
 VALUES ("Gayathiri", "Ramamoorthy", 4, null);

 INSERT INTO EMPLOYEE (FIRST_NAME,LAST_NAME,ROLE_ID,MANAGER_ID)
 VALUES ("Mathi", "Ponnusamy", 3 , 1 );

 INSERT INTO EMPLOYEE (FIRST_NAME,LAST_NAME,ROLE_ID,MANAGER_ID)
 VALUES ("Tom", "Jerry", 3 , 1 );

 INSERT INTO EMPLOYEE (FIRST_NAME,LAST_NAME,ROLE_ID,MANAGER_ID)
 VALUES ("Sathya", "Mathi", 2, null );

 INSERT INTO EMPLOYEE (FIRST_NAME,LAST_NAME,ROLE_ID,MANAGER_ID)
 VALUES ("Mike", "Jim", 1 , 4);

INSERT INTO EMPLOYEE (FIRST_NAME,LAST_NAME,ROLE_ID,MANAGER_ID)
 VALUES ("Sabari", "Mathi", 1 , 4);

 INSERT INTO EMPLOYEE (FIRST_NAME,LAST_NAME,ROLE_ID,MANAGER_ID)
 VALUES ("Amy", "Jim", 6 , null);

 INSERT INTO EMPLOYEE (FIRST_NAME,LAST_NAME,ROLE_ID,MANAGER_ID)
 VALUES ("Raj", "San", 5 , 7);

 INSERT INTO EMPLOYEE (FIRST_NAME,LAST_NAME,ROLE_ID,MANAGER_ID)
 VALUES ("Jenny", "San", 5 , 7);

 INSERT INTO EMPLOYEE (FIRST_NAME,LAST_NAME,ROLE_ID,MANAGER_ID)
 VALUES ("Bob", "Kelvin", 7 , null);