var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_DB"
});
connection.connect(function (err) {
  if (err) {
    console.log(err);

  }
  console.log("connection id", connection.threadId);
  displayMenu()
})
function displayMenu() {
  inquirer.prompt({
    type: "list",
    message: "Please select one choice.",
    choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update Employee Roles"],
    name: "choice"
  }).then(function (userInput) {
    switch (userInput.choice) {
      case "View All Departments":
        viewAllDepartments();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "View All Employees":
        viewAllEmployees();
        break;
      case "Add a Department":
        addDepartment();
        break;
      case "Add a Role":
        addRole();
        break;
      case "Add an Employee":
        addEmployee();
        break;
      case "Update Employee Roles":
        updateEmployeeRoles();
        break;
    }
  }
  )
}
function viewAllDepartments() {
  connection.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    displayMenu();
  })
}
function viewAllRoles() {
  connection.query("SELECT * FROM employee_role", function (err, results) {
    console.table(results);
    displayMenu();
  })
} 
function viewAllEmployees() {
  connection.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    displayMenu();
  })
}    
function addDepartment() {
  inquirer.prompt({
      type: "input",
      message: "What Depatment do you want to add?",
      name: "dept"
  }).then(function (answer) {
    let query = "INSERT INTO department (dept_name) VALUES ('" + answer.dept + "')"; 
      connection.query(query,function (err, results) {
          console.log("One new Department added");
          displayMenu();
      })
  })
}