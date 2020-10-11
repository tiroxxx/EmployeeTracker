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
            name: "choice",
            message: "How would you like to get started?",
            choices: [
                "run", "jog?", "or swim"
            ]
        }
    )
}