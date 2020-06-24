DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES employee_role(id)
);

CREATE TABLE employee_role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
dept_name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);


INSERT INTO employee_role (title, salary, department_id) values ('Sales Lead', 110000,);
INSERT INTO employee_role (title, salary, department_id) values ('Sales Person', 60000, 1);
INSERT INTO employee_role (title, salary, department_id) values ('Lead Engineer', 210000, 2);
INSERT INTO employee_role (title, salary, department_id) values ('Software Engineer', 150000, 2);
INSERT INTO employee_role (title, salary, department_id) values ('Accounting Lead', 110000, 3),
INSERT INTO employee_role (title, salary, department_id) values ('Accountant', 60000, 3);
INSERT INTO employee_role (title, salary, department_id) values ('Legal Team Lead', 250000, 4);
INSERT INTO employee_role (title, salary, department_id) values ('Lawyer', 125000, 4);

UPDATE `employee_DB`.`employee` SET `title` = 'Sales Lead' WHERE (`id` = '8');
UPDATE `employee_DB`.`employee` SET `title` = 'Sales Person' WHERE (`id` = '7');
UPDATE `employee_DB`.`employee` SET `title` = 'Lead Engineer' WHERE (`id` = '6');
UPDATE `employee_DB`.`employee` SET `title` = 'Software Engineer' WHERE (`id` = '5');
UPDATE `employee_DB`.`employee` SET `title` = 'Accounting Lead' WHERE (`id` = '4');
UPDATE `employee_DB`.`employee` SET `title` = 'Accountant' WHERE (`id` = '3');
UPDATE `employee_DB`.`employee` SET `title` = 'Legal Team Lead' WHERE (`id` = '2');