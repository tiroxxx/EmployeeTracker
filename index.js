// linking all of the libraries needed
const inquirer = require("inquirer");
const mysql = require("mysql");
const logo = require("asciiart-logo");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Christian41!",
    database: "employeetracker_db"
});

connection.connect(function (err) {
    if (err) throw err;

    init();
});

function init() {
    // prints a cool ascii art
    const logoText = logo({ name: "Employee Manager" }).render();
    console.log(logoText);
    // starts the user prompts
    startPrompts();
}

// start the program
init();

function startPrompts() {
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
                    viewRole();
                    break;
            }
        })
}

function addEmployee() {
    console.log("add employee");

    inquirer.prompt(
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
            message: "What is the employee's role?",
            choices: [

            ]
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: []
        }
    ).then({
        
        startPrompts();
    })

    connection.query("INSERT INTO auctions SET ?")
}

function addDepartment() {
    console.log(("add department"));
}
function addRole() {
    console.log(("add role"));
}
function updateEmployeeRole() {
    console.log(("update employee role"));
}
function viewDepartments() {
    console.log(("view department"));
}
function viewEmployees() {
    console.log(("view employees"));
}
function viewRole() {
    console.log(("view Role"));
}