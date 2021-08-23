const generateHTML = require("./src/generateHTML");



const fs = require("fs");
const inquirer = require("inquirer");


const path = require('path');
const express = require('express');
const node = require('node');

const axios = require('axios');

const fileDirectory = path.resolve(__dirname, "dist");
const filePath = path.join(fileDirectory, "index.html");

const utils = require("utils");

// profiles
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");


const teamArray = [];

// Employee array
let employeesArr = [];

// Questions array for all employees
const questions = [{
    type: "input",
    name: "name",
    message: "What is the name of this employee?"
  },
  {
    type: "input",
    name: "id",
    message: "What is the ID of this employee?"
  },
  {
    type: "input",
    name: "email",
    message: "What is this employee's email?"
  },
  {
    type: "list",
    name: "role",
    message: "What role does this employee have?",
    choices: ["Engineer", "Intern", "Manager"]
  }
]

// Questions for manager role
managerQuestions = [{
  type: "input",
  name: "officeNumber",
  message: "What is the manager's office number? (Required)",
  validate: officeNumber => {
    if (officeNumber) {
      return true;
    } else {
      console.log("Please enter an office number!");
      return false;
    }
  }
}]

// Questions for engineer role
engineerQuestions = [{
  type: "input",
  name: "github",
  message: "What is the engineer's Github Username? (Required)",
  validate: github => {
    if (github) {
      return true;
    } else {
      console.log("Please enter a GitHub username!");
      return false;
    }
  }
}]

// Questions for intern role
internQuestions = [

  {
    type: "input",
    name: "school",
    message: "What school is the intern from? (Required)",
    validate: school => {
      if (school) {
        return true;
      } else {
        console.log("Please enter a school name!");
        return false;
      }
    }
  }
]

// Function to initialize the application
const init = () => {
  if (fs.existsSync(filePath)) {
    inquirer.prompt({
      type: "confirm",
      message: "It looks like the index.html file in the 'dist' folder already exists. Do you want to overwrite it?",
      name: "overwrite"
    }).then(async (response) => {

      let overwrite = response.overwrite;
      if (await overwrite === true) {
        console.log("Please enter your team information:")
        newEmployee()
      } else if (await overwrite === false) {
        console.log("Your index.html file in the 'dist' folder will not be overwritten. Please move the current index.html file to another folder before restarting.")
      }
    })
  } else {
    console.log("Welcome to the team profile generator. Please enter your team information below:")
    newEmployee()
  }
};

// Function to create new employees
const newEmployee = async () => {
  await inquirer.prompt(questions)
    .then((response) => {
      let name = response.name;
      let id = response.id;
      let email = response.email;
      let role = response.role;
      let officeNumber;
      let github;
      let school;

      if (role === "Engineer") {
        inquirer.prompt(engineerQuestions).then((response) => {
          github = response.github;
          let employee = new Engineer(name, id, email, github);
          employeesArr.push(employee);
          addEmployee(employeesArr);
        });
      } else if (role === "Manager") {
        inquirer.prompt(managerQuestions).then((response) => {
          officeNumber = response.officeNumber;
          let employee = new Manager(name, id, email, officeNumber);
          employeesArr.push(employee);
          addEmployee(employeesArr);
        });
      } else if (role === "Intern") {
        inquirer.prompt(internQuestions).then((response) => {
          school = response.school;
          let employee = new Intern(name, id, email, school);
          employeesArr.push(employee);
          addEmployee(employeesArr);
        });
      }

    });

};

// Function that asks if you would like to add an employee. This will keep coming up until you are finished. When you're finished and say no, it will generate the index.html file
const addEmployee = async (array) => {
  await inquirer
    .prompt({
      type: "confirm",
      name: "addEmployee",
      message: "Would you like to add an employee? (Required)"

    }).then(async (response) => {
      var createEmployee = response.addEmployee;
      if (await createEmployee === true) {
        newEmployee();
      } else if (await createEmployee === false) {
        // If the dist directory does not exist, then it creates the dist directory before creating the index.html file
        if (!fs.existsSync(fileDirectory)) {
          fs.mkdirSync(fileDirectory)
        }

        // calls the renderHTML function in the generateHTML.js file to create the index.html

        fs.writeFile(filePath, renderHTML(array), (err) => {

          if (err) {
            return console.log(err);
          }

          // Success message
          console.log("Your index.html file has been created in the 'dist' folder!");
        });

      }
    })
};
// Function call to initialize app
init();

//Break


const addManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Who is the manager of this team?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the manager's name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the manager's ID.",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("Please enter the manager's ID!");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the manager's email.",
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) {
            return true;
          } else {
            console.log("Please enter an email!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter the manager's office number",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("Please enter an office number!");
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((managerInput) => {
      const { name, id, email, officeNumber } = managerInput;
      const manager = new Manager(name, id, email, officeNumber);

      teamArray.push(manager);
    });
};

const addEmployee = () => {
  console.log(`
    ============================
    Adding employees to the team
    ============================
    `);

  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Please choose the employee's role",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What's the name of the employee?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter an employee's name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the employee's ID.",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("Please enter the employee's ID!");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the employee's email.",
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) {
            return true;
          } else {
            console.log("Please enter an email!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "github",
        message: "Please enter the employee's github username.",
        when: (input) => input.role === "Engineer",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the employee's github username!");
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "Please enter the intern's school",
        when: (input) => input.role === "Intern",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the intern's school!");
          }
        },
      },
      {
        type: "confirm",
        name: "confirmAddEmployee",
        message: "Would you like to add more team members?",
        default: false,
      },
    ])
    .then((employeeData) => {
      let { name, id, email, role, github, school, confirmAddEmployee } =
        employeeData;
      let employee;

      if (role === "Engineer") {
        employee = new Engineer(name, id, email, github);
      } else if (role === "Intern") {
        employee = new Intern(name, id, email, school);
      }

      teamArray.push(employee);

      if (confirmAddEmployee) {
        return addEmployee(teamArray);
      } else {
        return teamArray;
      }
    });
};

const writeFile = (data) => {
  fs.writeFile("./dist/index.html", data, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(
        "Your team profile has been successfully created in index.html!"
      );
    }
  });
};

addManager()
  .then(addEmployee)
  .then((teamArray) => {
    return generateHTML(teamArray);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .catch((err) => {
    console.log(err);
  });


  //https://www.npmjs.com/package/utils
  //https://www.npmjs.com/package/nodemon
  //https://www.npmjs.com/package/express
  //https://www.npmjs.com/package/axios
  //https://www.npmjs.com/package/socket.io

  //https://www.npmjs.com/package/node  npm i node 