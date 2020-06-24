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
    connection.query(query, function (err, results) {
      console.log("One new Department added");
      displayMenu();
    })
  })
}
function addRole() {
  inquirer.prompt({
    type: "input",
    message: "What Role do you want to add?",
    name: "role"
  }).then(function (answer) {
    inquirer.prompt({
      type: "input",
      message: "What is the Salary for this Role?",
      name: "salary"
    }).then(function (response) {
      let query = "INSERT INTO employee_role (title, salary) VALUES ('" + answer.role + "', '" + response.salary + "')";
      connection.query(query, function (err, results) {
        console.log("One new Role added");
        displayMenu();
      })
    });

  })
}
function addEmployee() {
  let roleList = [];
  const newEmployee = [
    {
      type: "input",
      message: "What is the First Name of the Employee?",
      name: "firstName"
    },
    {
      type: "input",
      message: "What is the Last Name of the Employee?",
      name: "lastName"
    }
  ];
  inquirer.prompt(newEmployee).then(function (response) {
    connection.query("SELECT * FROM employee_role", function (err, results) {
      for (let index = 0; index < results.length; index++) {
        roleList.push(results[index].title);
        //console.log(roleList);
        
      }
      inquirer.prompt({
        type: "list",
        message: "Please select a Role for this Employee",
        choices: roleList,
        name: "newRole"
      }).then(function (userInput) {
        let query = "INSERT INTO employee (first_name, last_name, title) VALUES ('" + response.firstName + "', '" + response.lastName + "', '" + userInput.newRole + "')";
      connection.query(query, function (err, results) {
        console.log("One new Employee added");
        displayMenu();
      })
      })
    });
  });
}