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
  const departments = [];
  let deptSqlResults;
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) console.log(err);
    deptSqlResults = results;
    for (let index = 0; index < results.length; index++) {
      departments.push(results[index].dept_name);
    }
  })
  let prompts = [
    {
      type: "input",
      message: "What Role do you want to add?",
      name: "role"
    },
    {
      type: "input",
      message: "What is the Salary for this Role?",
      name: "salary"
    },
    {
      type: "list",
      message: "Please select the department for this Role.",
      choices: departments,
      name: "selectDept"
    }
  ];

  inquirer.prompt(prompts).then(function (response) {
    const departmentObj = deptSqlResults.filter(record => {
      return record.dept_name == response.selectDept;
    })
   
    
    let query = "INSERT INTO employee_role (title, salary, department_id) VALUES ('" + response.role + "', '" + response.salary + "', '" + departmentObj[0].id + "')";
    connection.query(query, function (err, results) {
      if (err) console.log(err);
      console.log("One new Role added");
      displayMenu();
    })
  });

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
      if (err) throw err;
      for (let index = 0; index < results.length; index++) {
        roleList.push(results[index].title);
      }
      inquirer.prompt({
        type: "list",
        message: "Please select a Role for this Employee",
        choices: roleList,
        name: "newRole"
      }).then(function (userInput) {
        let roleId;
        connection.query("SELECT * FROM employee_role WHERE title = '" + userInput.newRole + "'", function (err, results) {
          if (err) throw err;
          roleId = results[0].id;
          let query = "INSERT INTO employee (first_name, last_name, role_id) VALUES ('" + response.firstName + "', '" + response.lastName + "', '" + roleId + "')";
          connection.query(query, function (err, results) {
            if (err) throw err;
            console.log("One new Employee added");
            displayMenu();
          })
        })
      })
    });
  });
}
function updateEmployeeRoles() {
  const employee = [];
  const roles = [];
  const updateEmployee = [
    {
      type: "list",
      message: "Which Employee would you like to update?",
      choices: employee,
      name: "employeeChange"
    },
    {
      type: "list",
      message: "What is their new role?",
      choices: roles,
      name: "roleChange"
    }
  ];
  connection.query("SELECT * FROM employee_role", function (err, results) {
    if (err) throw err;
    for (let index = 0; index < results.length; index++) {
      roles.push(results[index].title);
    }
    //console.log(roles);

  })
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    for (let index = 0; index < results.length; index++) {
      employee.push(results[index].first_name + " " + results[index].last_name);
      //console.log(employee);
    }
    inquirer.prompt(updateEmployee).then(function (response) {
      const name = response.employeeChange.split(" ");
      let roleId;
      connection.query("SELECT * FROM employee_role WHERE title = '" + response.roleChange + "'", function (err, results) {
        if (err) throw err;
        roleId = results[0].id;
        let query = "UPDATE employee SET role_id = '" + roleId + "' WHERE first_name = '" + name[0] + "' AND last_name = '" + name[1] + "'";
        connection.query(query, function (err, results) {
          console.log(results.affectedRows + "record(s) updated");
          displayMenu();
        })
      })
    })

  })
}