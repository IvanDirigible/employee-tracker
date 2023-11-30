const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the employee database');
    mainMenu();
});

const mainMenu = function() {
    inquirer.prompt([
            {
                type: 'list',
                name: 'main',
                message: 'Please select from the following options:',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', new inquirer.Separator(), 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', new inquirer.Separator()]
            }
        ])
    .then((userRes) => {
        if (userRes.main === 'View All Departments') {
            viewDepartments();
        } else if (userRes.main === 'View All Roles') {
            viewRoles();
        } else if (userRes.main === 'View All Employees') {
            viewEmployees();
        }
    })
};

viewDepartments = function() {
    db.query(`SELECT * FROM department`, (err, res) => {
        console.log('Viewing All Departments');
        console.table(res);
        mainMenu();
    })
};

viewRoles = function() {
    db.query(`SELECT * FROM role`, (err, res) => {
        console.log('Viewing All Roles');
        console.table(res);
        mainMenu();
    })
};

viewEmployees = function() {
    db.query(`SELECT * FROM employee`, (err, res) => {
        console.log('Viewing All Employees');
        console.table(res);
        mainMenu();
    })
};