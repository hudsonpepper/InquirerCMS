//const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { Console } = require('console');
//const PORT = process.env.PORT || 3001;
//const app = express();


//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());


const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'departments_db'
  },
  console.log("Connected to the departments_db database.")
);

async function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'actionSelection',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit']
      }
    ]).then(async (response) => {
      console.log(response);
      switch (response.actionSelection) {
        case 'View All Employees':
          console.log('You selected "View All Employees"');
          viewAllEmployees().then((data) => {
            console.table(data[0]);
            init();
          })
          break;
        case 'Add Employee':
          console.log('You Selected "Add Employee"');
          addEmployee();
          break;
        case 'Update Employee Role':
          console.log('You selected "Update Employee Role"');
          break;
        case 'View All Roles':
          console.log('You selected "View All Roles"');
          break;
        case 'Add Role':
          console.log('You selected "Add Role"');
          break;
        case 'View All Departments':
          console.log('You selected "View All Departments"');
          break;
        case 'Add Department':
          console.log('You selected "Add Department"');
          break;
        case 'Exit':
          console.log("Bye!");
          process.exit();
        default:
          console.log('Incorrect Selection');
      }
    })//.then(init)
}
init();

function viewAllEmployees() {
  let results = db.promise().query(`SELECT A.id, A.first_name, A.last_name, B.first_name AS Manager_FName, B.last_name AS Manager_LName FROM employee A, employee B WHERE A.manager_id = B.id`)
  return results;
};
function addEmployee() {
  viewManagerNamesPromise().then((data) => {
    console.log(data)
    let nameArr = data[0].map((x) => `${x.first_name} ${x.last_name}`);
    console.log(nameArr);
    console.log(concatNames(data));
    //init();
    return (nameArr)
  }).then((rolesArr, potManagerArr) => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "Enter employee's first name: ",
          validate(input) {
            return input.length > 0;
          }
        },
        {
          type: 'input',
          name: 'last_name',
          message: "Enter employee's last name: ",
          validate(input) {
            return input.length > 0;
          }
        }
      ])
  })
}
function viewEmployeeNamesPromise() {
  let results = db.promise().query(`SELECT employee.first_name, employee.last_name FROM employee`)
  return results;
}
function viewManagerNamesPromise() {
  let results = db.promise().query(`SELECT employee.first_name, employee.last_name FROM employee WHERE employee.id IN (SELECT employee.manager_id FROM employee)`);
  return results;
}

function concatNames(data) {
  let nameArr = data[0].map((x) => `${x.first_name} ${x.last_name}`);
  return nameArr;
}