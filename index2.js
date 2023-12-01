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
                choices:    ['View All Departments', 
                            'View All Roles',
                            'View All Employees',new inquirer.Separator(),
                            'Add a Department',
                            'Add a Role',
                            'Add an Employee',
                            'Update an Employee Role', new inquirer.Separator()]
            }
        ])
    .then((userRes) => {
        if (userRes.main === 'View All Departments') {
            viewDepartments();
        } if (userRes.main === 'View All Roles') {
            viewRoles();
        } if (userRes.main === 'View All Employees') {
            viewEmployees();
        } if (userRes.main === 'Add a Department') {
            addDepartment();
        }
    })
};

viewDepartments = function() {
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        console.log('Viewing All Departments');
        console.table(res);
        mainMenu();
    })
};

viewRoles = function() {
    db.query(`SELECT role.id,
            title,
            department.name AS department,
            role.salary
                FROM role
            JOIN department ON role.department_id = department.id`, (err, res) => {
        if (err) throw err;
        console.log('Viewing All Roles');
        console.table(res);
        mainMenu();
    })
};

viewEmployees = function() {
    db.query(`SELECT employee.id,
            first_name,
            last_name, 
            role.title AS title,
            department.name AS department,
            role.salary,
            CONCAT (employee.first_name, " ", employee.last_name) AS manager
                FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department on employee.department.name = department.id
            JOIN manager ON employee.manager_id = employee.id`, (err, res) => {
        if (err) throw err;
        console.log('Viewing All Employees');
        console.table(res);
        mainMenu();
    })
};

addDepartment = function() {
    db
}