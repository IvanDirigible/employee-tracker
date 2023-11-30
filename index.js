// const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
// const fs = require('fs');

const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'He@rt2<3',
        database: 'employee_db'
    },
    console.log(`Connected to the employee database.`)
);



// db.query('SELECT * FROM employee', function (err, results) {
//     console.log(results);
// });

// app.use((req, res) => {
//     res.status(404).end();
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const mainMenu = [
    {
        type: 'list',
        message: 'Please select from the following:',
        name: 'mainMenu',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', new inquirer.Separator(), 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
    },
];

const addDepartment = [
    {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department?'
    },
];

const addRole = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of the role?'
    },
    {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'roleDepart',
        choices: ['']
    },

];

inquirer.prompt(mainMenu)
    .then((userRes) => {
        if (userRes.prompt === 'View All Departments') {
            db.query(`SELECT * FROM department`, (err, res) => {
                if (err) throw err;
                console.table(res);
                inquirer.prompt(mainMenu);
            })
        } else if (userRes.prompt === 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, res) => {
                if (err) throw err;
                console.table(res);
                inquirer.prompt(mainMenu);
            })
        } else if (userRes.prompt === `View All Employees`) {
            db.query(`SELECT * FROM employee`, (err, res) => {
                if (err) throw err;
                console.table(res);
                inquirer.prompt(mainMenu);
            })
        } else if (userRes.prompt === 'Add a Department') {
            inquirer.prompt(addDepartment)
                .then((userRes) => {
                    db.query(`INSERT INTO department (name) VALUES (?)`, [userRes.department], (err, res) => {
                        if (err) throw err;
                        console.log(`Added ${userRes.department} to the database`)
                        inquirer.prompt(mainMenu);
                    });
                })
        } else if (userRes.prompt === `Add a Role`) {
            inquirer.prompt(addRole)
                .then
        }
    })
