const db = require("./db/connection");
const inquirer = require("inquirer");

// function for the main menu
const mainMenu = () => {
  inquirer
    .prompt([
      {
        name: "mainMenu",
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
    .then((mainMenu) => {
        console.log(mainMenu)
      if ((mainMenu.list === "VAD")) {
        db.query("SELECT * FROM department", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
      } else if ((mainMenu.list === "VAR")) {
        db.query("SELECT * FROM role", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
      } else if ((mainMenu.list === "VAE")) {
        console.log("VAE SUCCESS")
        db.query("SELECT * FROM employee", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
      }else if ((mainMenu.list === "AAD")) {
        db.query("                  ", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
      } else if ((mainMenu.list === "AAR")) {
        db.query("                  ", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
      }else if ((mainMenu.list === "AAE")) {
        db.query("                   ", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
      }else if ((mainMenu.list === "UAER")) {
        db.query("                       ", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
      }




    
    });
};

mainMenu();
