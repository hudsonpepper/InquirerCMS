-- Schema Based on Layout Given by ../Assets/12-sql-homework-demo-01.png

DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;

USE departments_db;

CREATE TABLE department (
  id INT NOT NULL,
  -- Name is a Keyword in sql, so I changed it to dep_name
  dep_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT, 
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
)
