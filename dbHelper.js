const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
  {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  },
);

const dbHelper = (function () {
  function viewAllEmployees() {
    let results = db.promise().query(`SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS full_name, (SELECT role.title FROM role WHERE role.id = employee.role_id) AS title, (SELECT department.dep_name FROM department WHERE department.id = (SELECT role.department_id FROM role WHERE role.id = employee.role_id)) AS department, (SELECT CONCAT(manager.first_name, ' ', manager.last_name) FROM employee AS manager WHERE manager.id = employee.manager_id) AS manager_name FROM employee`)
    return results;
  };
  function getEmployeeNames() {
    let employeeNames = db.promise().query(`SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS full_name, employee.id FROM employee`)
      .then((data) => {
        let names = [data[0].map((x) => x.full_name), data[0].map((x) => x.id)];
        return names;
      });
    return employeeNames;
  };
  function getManagerNames() {
    let results = db.promise().query(`SELECT CONCAT(employee.first_name, employee.last_name) AS full_name FROM employee WHERE employee.id IN (SELECT employee.manager_id FROM employee)`)
      return results;
  };
  function getRoleNames() {
    let results = db.promise().query(`SELECT role.title, role.id FROM role`)
    .then((data) => {
      let names = [data[0].map((x) => x.title), data[0].map((x) => x.id)];
      return names;
    })
    return results;
  };
  function getDepartmentNames() {
    let results = db.promise().query(`SELECT department.id, department.dep_name FROM department`)
    .then((data) => {
      let names = [data[0].map((x) => x.dep_name), data[0].map((x) => x.id)];
      return names;
    })
    return results;
  }
  function viewAllDepartments() {
    let results = db.promise().query(`SELECT department.dep_name, department.id FROM department`);
    return results;
  };
  function viewAllRoles() {
    let results = db.promise().query(`SELECT role.title, (SELECT department.dep_name FROM department WHERE department.id = role.department_id) AS department FROM role;`)
    return results;
  };
  return ({viewAllDepartments, viewAllEmployees, getEmployeeNames, getManagerNames, getRoleNames, viewAllRoles, getDepartmentNames })
})();


module.exports = dbHelper;
