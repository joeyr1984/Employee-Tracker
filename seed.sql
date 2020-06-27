DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
dept_name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee_role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES employee_role(id)
);




INSERT INTO employee_role (title, salary) values ('Sales Lead', 110000);
INSERT INTO employee_role (title, salary) values ('Sales Person', 60000);
INSERT INTO employee_role (title, salary) values ('Lead Engineer', 210000);
INSERT INTO employee_role (title, salary) values ('Software Engineer', 150000);
INSERT INTO employee_role (title, salary) values ('Accounting Lead', 110000);
INSERT INTO employee_role (title, salary) values ('Accountant', 60000);
INSERT INTO employee_role (title, salary) values ('Legal Team Lead', 250000);
INSERT INTO employee_role (title, salary) values ('Lawyer', 125000);

