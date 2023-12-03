const inquirer = require('inquirer');
const db = require('./db/connection');
const { userInfo } = require('os');

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
        } if (userRes.main === 'Add a Role') {
            addRole();
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
            salary
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
            employee.first_name,
            employee.last_name, 
            role.title,
            department.name AS department,
            role.salary,
            CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id`, (err, res) => {
        if (err) throw err;
        console.log('Viewing All Employees');
        console.table(res);
        mainMenu();
    })
};

addDepartment = function() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?'
        }
    ])
    .then((userRes) => {
        const addDep = `INSERT INTO department(name) VALUES ('${userRes.departmentName}');`
        db.query(addDep), (err, res) => {
            if (err) throw err;
        }
        console.log(`Added ${userRes.departmentName} to the database`)
        mainMenu();
    })
};

addRole = function() {
    db.query(`SELECT * FROM department`, (err, res) => {
        belongDepartment = res.map(belDep => ({
            name: belDep.name,
            value: belDep.id
        }));
        inquirer.prompt([
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
                name: 'roleDepartment',
                message: 'Which department does the role belong to?',
                choices: belongDepartment
            }
        ])
        .then((userRes) => {
            const addRole = `INSERT INTO role SET title = '${userRes.roleName}', salary = ${userRes.roleSalary}, department_id = ${userRes.roleDepartment};`
            db.query(addRole), (err, res) => {
                if (err) throw err;
            }
            console.log(`Added ${userRes.roleName} to the database`)
            mainMenu();
        })
    })
};