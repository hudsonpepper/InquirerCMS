//const express = require('express');
const dbHelper = require('./dbHelper');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { Console } = require('console');
require('dotenv').config();
//const PORT = process.env.PORT || 3001;
//const app = express();


//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

//console.log(process.env)

console.log(" \n Please wait, we are connecting to the database...")
const db = mysql.createConnection(
  {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  },
  console.log(" --------------- \n Connected to the departments_db database! \n --------------- \n ")
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
      //console.log(response);
      console.log("\n --------------- \n")
      switch (response.actionSelection) {
        case 'View All Employees':
          console.log('You selected "View All Employees"');
          dbHelper.viewAllEmployees().then((data) => {
            console.table(data[0]);
            rerun();
          })
          break;
        case 'Add Employee':
          console.log('You Selected "Add Employee"');
          addEmployee();
          break;
        case 'Update Employee Role':
          console.log('You selected "Update Employee Role"');
          updateRole();
          break;
        case 'View All Roles':
          console.log('You selected "View All Roles"');
          dbHelper.viewAllRoles().then((data) => {
            console.table(data[0]);
            rerun();
          })
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

function rerun() {
  console.log("\n===================\n")
  inquirer
    .prompt([{
      type: 'list',
      name: 'isDone',
      message: 'Are you done?',
      choices: ['Yes', 'No']
    }]).then((response) => {
      if (response.isDone == 'Yes') {
        console.log("Bye!");
        process.exit()
      }
      else { init() }
    })
}

async function addEmployee() {
  let employeeNames = dbHelper.getEmployeeNames();
  let roleNames = dbHelper.getRoleNames();
  Promise.all([employeeNames, roleNames]).then(([employeeNames, roleNames]) => {
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
        },
        {
          type: 'list',
          name: 'role',
          message: "Choose employee job title: ",
          choices: roleNames[0]
        },
        {
          type: 'list',
          name: 'manager',
          message: "Choose employee manager: ",
          choices: ["N/A", ...employeeNames[0]]
        }
      ]).then((data) => {
        data.role_id = roleNames[1][roleNames[0].indexOf(data.role)];
        delete data.role;
        data.manager == "N/A" ? data.manager_id = null : data.manager_id = employeeNames[1][employeeNames[0].indexOf(data.manager)];
        delete data.manager;
        return data;

      }).then((data) => {
        let process = db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [data.first_name, data.last_name, data.role_id, data.manager_id])
        return process
      }).then((process) => {
        console.log(" \n --------------- \n Added Employee")
        rerun();
      })
  });
}

async function updateRole() {
  let employeeNames = dbHelper.getEmployeeNames();
  let roleNames = dbHelper.getRoleNames();
  Promise.all([employeeNames, roleNames])
    .then(([employeeNames, roleNames]) => {
      inquirer
        .prompt([{
          type: 'list',
          name: 'employee',
          message: "Choose employee: ",
          choices: employeeNames[0]
        },
        {
          type: 'list',
          name: 'role',
          message: "Choose updated employee job title: ",
          choices: roleNames[0]
        }
        ])
        .then((data) => {
          data.role_id = roleNames[1][roleNames[0].indexOf(data.role)];
          delete data.role;
          data.id = employeeNames[1][employeeNames[0].indexOf(data.employee)];
          delete data.employee;
          let update = db.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [data.role_id, data.id]);
          return update
        })
        .then((update) => {
          console.log("\n -------------- \n Success!!");
          rerun();
        })
    })
}
init();

//process.exit();