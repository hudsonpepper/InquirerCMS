const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'books_db'
  },
  console.log("Connected to the departments_db database.")
);

function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'actionSelection',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
      }
    ]).then((response) => {
      console.log(response);
      switch(response.actionSelection){
        case 'View All Employees':
          console.log('You selected "View All Employees"');
          break;
        case 'Add Employee':
          console.log('You Selected "Add Employee"');
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
        default:
          console.log('Incorrect Selection');
      }
    })
}
init();
