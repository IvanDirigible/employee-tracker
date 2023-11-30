const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'He@rt2<3',
        database: 'employee_db'
    }
    // Is this what's messing up my connection? No?
    // console.log(`Connected to the employee database.`)
);

const mainMenu = () => {
    inquirer.prompt ([
    {
        type: 'list',
        message: 'Please select from the following options:',
        name: 'mainMenu',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', new inquirer.Separator(), 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', new inquirer.Separator()],
    }
])
    .then((userRes) => {
        if (userRes.mainMenu === 'View All Departments') {
            db.query(`SELECT * FROM department`, (err, res) => {
                if (err) throw err;
                console.log("Should see all departments.")
                console.table(res);
                return inquirer.prompt(mainMenu);
            });
        } else if (userRes.mainMenu === 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, res) => {
                if (err) throw err;
                console.table(res);
                inquirer.prompt(mainMenu);
            });
        } else if (userRes.prompt === `View All Employees`) {
            db.query(`SELECT * FROM employee`, (err, res) => {
                if (err) throw err;
                console.table(res);
                inquirer.prompt(mainMenu);
            });
        } else if (userRes.prompt === 'Add a Department') {
            inquirer.prompt(addDepartment)
                .then((userRes) => {
                    db.query(`INSERT INTO department (name) VALUES (?)`, [userRes.department], (err, res) => {
                        if (err) throw err;
                        console.log(`Added ${userRes.department} to the database`)
                        inquirer.prompt(mainMenu);
                    });
                });
        } else if (userRes.prompt === `Add a Role`) {
            inquirer.prompt(addRole)
                .then
        };
    });
};

addDepartment = () => {
    inquirer.prompt([
    {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department?',
        validate: department => {
            if (department) {
                return true;
            } else {
                console.log('Enter the name of the department.');
                return false;
            }
        }
    }
]);
};

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

