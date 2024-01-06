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
  }
  return ({ viewAllEmployees, getEmployeeNames, getManagerNames, getRoleNames })
})();
// dbHelper.viewAllEmployees().then((data) => {
//   console.table(data[0]);})
// dbHelper.getEmployeeNames().then((data) => {
//   //console.table((data[0]));
//   console.log(data);
  //let names = [data[0].map((x) => x.full_name), data[0].map((x) => x.id)];
  //console.log(names);
  //return names;
//});


module.exports = dbHelper;




// function addEmployee() {
//   viewEmployeeNamesPromise()
//   .then((data) => {
//     console.log(data)
//     let potManagerArr = data[0].map((x) => `${x.first_name} ${x.last_name}`);
//     console.log(potManagerArr);
//     //init();
//     return (potManagerArr)
//   }).then((potNamesArr) => {
//     return viewRolesPromise(potNamesArr)})
//     .then((dataArr) => {
//       console.log("DataArr", dataArr)
//       let rolesArr = dataArr[0].map((x) => x.title);
//       let potManagerArr = dataArr[1]
//       console.log(potManagerArr, rolesArr);
//       return (potManagerArr, rolesArr);
//     })
//     .then((potManagerArr, rolesArr) => {
//     inquirer
//       .prompt([
//         {
//           type: 'input',
//           name: 'first_name',
//           message: "Enter employee's first name: ",
//           validate(input) {
//             return input.length > 0;
//           }
//         },
//         {
//           type: 'input',
//           name: 'last_name',
//           message: "Enter employee's last name: ",
//           validate(input) {
//             return input.length > 0;
//           }
//         }
//       ])
//   })
// }
// function viewEmployeeNamesPromise() {
//   let results = db.promise().query(`SELECT employee.first_name, employee.last_name FROM employee`)
//   return results;
// }
// function viewManagerNamesPromise() {
//   let results = db.promise().query(`SELECT employee.first_name, employee.last_name FROM employee WHERE employee.id IN (SELECT employee.manager_id FROM employee)`);
//   return results;
// }
// function viewRolesPromise(params) {
//   let results = db.promise().query(`SELECT title FROM role`).then((data) => {
//     data[0].map((x) => x.title);
//   }).then
//   return results;
// }
// function concatNames(data) {
//   let nameArr = data[0].map((x) => `${x.first_name} ${x.last_name}`);
//   return nameArr;
// }