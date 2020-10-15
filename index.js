// linking all of the libraries needed
const inquirer = require("inquirer");
const mysql = require("mysql");
const logo = require("asciiart-logo");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Christian41!",
    database: "employees"
});

const roleArr = [];
const nameArr = [];
let roleId;
let managerId;

connection.connect(function (err) {
    if (err) throw err;
    // start program
    init();
});

function init() {
    // prints a cool ascii art
    const logoText = logo({ name: "Employee Manager" }).render();
    console.log(logoText);
    // starts the user prompts
    startPrompts();
}

function startPrompts() {
    getRoles();
    getEmployees();
    inquirer.prompt(
        {
            type: "list",
            name: "decision",
            message: "How would you like to get started?",
            choices: [
                "Add Employee", "Add Department", "Add Role", "Update Employee Role", "View Deparments", "View Employees", "View Role"
            ]
        }).then(answer => {
            switch (answer.decision) {
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "View Deparments":
                    viewDepartments();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                default:
                    viewRoles();
                    break;
            }
        })
}

function addEmployee() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
                validate: answer => {
                    // checking for empty input
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid name";
                }
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
                validate: answer => {
                    // checking for empty input
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid name";
                }
            },
            {
                type: "list",
                name: "role",
                message: "What is the employee's role ID?",
                choices: roleArr
            },
            {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: nameArr
            }
        ]).then(answers => {
            getManagerId(answers.manager);
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName
                }
            )
            getRoleId(answers.role, answers.firstName)
        });
    });
}

function addDepartment() {
    console.log(("add department"));

    inquirer.prompt(
        {
            type: "input",
            name: "department",
            message: "What department would you like to add?"
        }
    ).then(answers => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answers.department
            },
            function (err) {
                if (err) throw err;
                console.log("Added deparment successfully!");
                // going back to main menu
                startPrompts();
            }
        )
    })
}

function addRole() {
    console.log(("add role"));

    inquirer.prompt([
        {
            input: "input",
            name: "role",
            message: "What role would you like to add?",
        },
        {
            input: "input",
            name: "salary",
            message: "How much does this role make?",
        },
        {
            input: "input",
            name: "id",
            message: "What is the ID for this role?",
        }
    ]).then(answers => {
        // adding new role to DB
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answers.role,
                salary: answers.salary,
                department_id: answers.id
            },
            function (err) {
                if (err) throw err;
                console.log("Added role successfully!");
                // going back to main menu
                startPrompts();
            }
        )
    })
}
function updateEmployeeRole() {
    let query = "SELECT * FROM employee LEFT JOIN role ON role.id = employee.role_id";

    connection.query(query, function (err, res) {
        if (err) throw err;
        inquirer.prompt([

            {
                type: "list",
                name: "employee",
                message: "For which employee would you like to change roles?",
                choices: nameArr
            },
            {
                type: "list",
                name: "role",
                message: "What role would you like to give to this employee?",
                choices: roleArr
            }
        ]).then(answers => {
            getRoleId(answers.role, answers.employee);
        })
    })
}

function viewDepartments() {
    console.log(("view department"));
    connection.query(
        // retrieving departments from DB
        "SELECT name FROM department",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            // go back to main menu
            startPrompts();
        })


}
function viewEmployees() {
    console.log(("view employees"));
    connection.query(
        // retrieving employees from DB
        "SELECT * FROM employee",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            // go back to main menu
            startPrompts();
        })
}
function viewRoles() {
    console.log(("view Role"));
    connection.query(
        // retrieving roles from DB
        "SELECT title FROM role",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            // go back to main menu
            startPrompts();
        })
}

function getRoleId(role, employee) {
    connection.query("SELECT id FROM role WHERE title = ?", [role],
        function (err, res) {
            if (err) throw err;
            roleId = res[0].id;
            updateRole(employee);
        })
}

function updateRole(employee) {
    connection.query(
        "UPDATE employee SET role_id = ? WHERE first_name = ?",
        [roleId, employee],
        function (err) {
            if (err) throw err;
            console.log("Added role successfully!");
            // going back to main menu
            startPrompts();
        }
    )
}

function getManagerId(employee) {
    connection.query("SELECT id FROM employee WHERE first_name = ?", [employee],
        function (err, res) {
            if (err) throw err;
            managerId = res[0].id;
        })
}

function getRoles() {
    connection.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                roleArr.push(res[i].title);
            }
        })
}

function getEmployees() {
    connection.query("SELECT * FROM employee",
        function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                nameArr.push(res[i].first_name);
            }
        })
}