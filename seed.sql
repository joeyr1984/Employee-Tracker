DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee_role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id INT,
PRIMARY KEY (id)
);

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
dept_name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);


NSERT INTO role (title, salary, department_id) values ('Sales Lead', 100000, 1);
INSERT INTO role (title, salary, department_id) values ('Sales Person', 80000, 1);
INSERT INTO role (title, salary, department_id) values ('Lead Engineer', 200000, 2);
INSERT INTO role (title, salary, department_id) values ('Software Engineer', 150000, 2);
INSERT INTO role (title, salary, department_id) values ('Accounting Lead', 170000, 3),
INSERT INTO role (title, salary, department_id) values ('Accountant', 125000, 3);
INSERT INTO role (title, salary, department_id) values ('Legal Team Lead', 150000, 4);
INSERT INTO role (title, salary, department_id) values ('Lawyer', 125000, 4);

UPDATE `employee_DB`.`employee` SET `role` = 'Sales Lead' WHERE (`id` = '8');
UPDATE `employee_DB`.`employee` SET `role` = 'Sales Person' WHERE (`id` = '7');
UPDATE `employee_DB`.`employee` SET `role` = 'Lead Engineer' WHERE (`id` = '6');
UPDATE `employee_DB`.`employee` SET `role` = 'Software Engineer' WHERE (`id` = '5');
UPDATE `employee_DB`.`employee` SET `role` = 'Accounting Lead' WHERE (`id` = '4');
UPDATE `employee_DB`.`employee` SET `role` = 'Accountant' WHERE (`id` = '3');
UPDATE `employee_DB`.`employee` SET `role` = 'Legal Team Lead' WHERE (`id` = '2');