// linking all of the libraries needed
const inquirer = require("inquirer");
const mysql = require("mysql");
const logo = require("asciiart-logo");


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
        }).then( answer => {
            switch (answer.decision) {
                case "Add Employee":
                    addEmplyee();
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