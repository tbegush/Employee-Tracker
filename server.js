const db = require("./db/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { query } = require("./db/connection");

// function for the main menu
const mainMenu = () => {
  inquirer
    .prompt([
      {
        name: "answer",
        type: "list",
        message: "What would you like to do?",
        choices: [
          {
            name: "View all Departments",
            value: "VAD",
          },
          {
            name: "View all Roles",
            value: "VAR",
          },
          {
            name: "View all Employees",
            value: "VAE",
          },
          {
            name: "Add a Department",
            value: "AAD",
          },
          {
            name: "Add a Role",
            value: "AAR",
          },
          {
            name: "Add an Employee",
            value: "AAE",
          },
          {
            name: "Update an Employee Role",
            value: "UAER",
          },
        ],
      },
    ])
    .then(({ answer }) => {
      // console.log(mainMenu)
      if (answer === "VAD") {
        db.query("SELECT id, name FROM department", function (err, res) {
          if (err) throw err;
          console.table(res);
          mainMenu();
        });
      } else if (answer === "VAR") {
        db.query("SELECT * FROM role", function (err, res) {
          if (err) throw err;
          console.table(res);
          mainMenu();
        });
      } else if (answer === "VAE") {
        console.log("VAE SUCCESS");
        db.query("SELECT * FROM employee", function (err, res) {
          if (err) throw err;
          console.table(res);
          mainMenu();
        });
      } else if (answer === "AAD") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "department",
              message: "Enter new Department name:",
            },
          ])
          .then(({ department }) => {
            db.query(
              `INSERT INTO department (name) VALUES ("${department}")`,
              function (err, res) {
                if (err) throw err;
                console.log(`Added new ${department} department`);
                mainMenu();
              }
            );
          });
      } else if (answer === "AAR") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "role",
              message: "Enter new Role name",
            },
            {
              type: "input",
              name: "salary",
              message: "Enter new salary",
            },
            {
              type: "input",
              name: "department",
              message: "Enter dept",
            },
          ])
          .then(({ role, salary, department }) => {
            db.query(
              `INSERT INTO role (title,salary,department_id) VALUES ("${role}",${salary},${department})`,
              function (err, res) {
                if (err) throw err;
                console.log(`Added new ${role} role`);
                mainMenu();
              }
            );
          });
      } else if (answer === "AAE") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "Enter first name",
            },
            {
              type: "input",
              name: "last_name",
              message: "Enter last name",
            },
            {
              type: "input",
              name: "role",
              message: "Enter employee's role",
            },
            {
              type: "input",
              name: "manager",
              message: "Enter manager name",
            },
          ])
          .then(({ first_name, last_name, role, manager }) => {
            db.query(
              `INSERT INTO employee (first_name,last_name, role_id, manager_id) VALUES ("${first_name}","${last_name}",${role},${manager})`,
              function (err, res) {
                if (err) throw err;
                console.log(`Added new employee ${first_name}`);
                mainMenu();
              }
            );
          });
      } else if (answer === "UAER") {
        let employees = [];
        let roles = [];

        db.query(
          "Select id as value, concat(first_name,' ',last_name) as name FROM employee",
          function (err, res) {
            if (err) throw err;
            employees = res;
            db.query(
              "select id as value, title as name FROM role",
              function (err, res) {
                if (err) throw err;
                roles = res;
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "employee",
                      message: "Select an employee to update.",
                      choices: employees,
                    },
                    {
                      type: "list",
                      name: "role",
                      message: "Choose new role.",
                      choices: roles,
                    },
                  ])
                  .then((selectedEmp) => {
                    db.query(
                      `UPDATE employee SET role_id = ${selectedEmp.role} WHERE id = ${selectedEmp.employee}`,
                      function (err, res) {
                        if (err) throw err;
                        console.log(
                          "\n --------------> Updated employee role.<---------------- \n"
                        );
                        mainMenu();
                      }
                    );
                  });
              }
            );
          }
        );
      }
    });
};

mainMenu();
