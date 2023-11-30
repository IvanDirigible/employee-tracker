const inquirer = require('inquirer');
const fs = require('fs');

inquirer
    ,prompt([
        {
            type: 'list',
            message: 'Welcome! Please select from the following:',
            name: 'main-menu',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
        },
    ])
    .then((data) => {

    })