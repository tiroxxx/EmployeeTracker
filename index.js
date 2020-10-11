// linking all of the libraries needed
const inquirer = require("inquirer");
const mysql = require("mysql");
const logo = require("asciiart-logo");

function init() {
    // prints a cool ascii art
    const logoText = logo({ name: "Employee Manager"}).render();
    console.log(logoText);
    // starts the user prompts
    startPrompts();
}