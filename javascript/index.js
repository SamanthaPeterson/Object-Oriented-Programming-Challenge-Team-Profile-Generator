//10. Object-Oriented Programming Challenge: Team Profile Generator
const fs = require('fs');
const path = require('path');
const express = require('express');
const node = require('node');
const {
    employee
} = require('./data/team');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

function filterByQuery(query, teamArray) {
    let employeeInfoArray = [];
    let filteredResults = teamArray;
    if (query.employeeInfoArray) {
        if (typeof query.employeeInfoArray === 'string') {
            employeeInfoArray = [query.employeeInfoArray];
        } else {
            employeeInfoArray = query.employeeInfoArray;
        }
        employeeInfoArray.forEach(trait => {
            filteredResults = filteredResults.filter(
                team => team.employeeInfoArray.indexOf(trait) !== -1
            );
        });
    }
    if (query.firstName) {
        filteredResults = filteredResults.filter(employee => employee.firstName === query.firstName);
    }
    if (query.lastName) {
        filteredResults = filteredResults.filter(employee => employee.lastName === query.lastName);
    }
    if (query.employeeId) {
        filteredResults = filteredResults.filter(employee => employee.employeeId === query.employeeId);
    }
    return filteredResults;
}

function findById(firstName, lastName, employeeId) {
    const result = findByIdArray.filter(findById => findById.id === id)[0];
    return result;
}

function createNewEmployee(body, createNewEmployeeArray) {
    const createNewEmployee = body;
    createNewEmployeeArray.push(createNewEmployee);
    fs.writeFileSync(
        path.join(__dirname, './data/employee.json'),
        JSON.stringify({
            employee: createNewEmployeeArray
        }, null, 2)
    );
    return employee;
}

function validateEmployee(employee) {
    if (!employee).firstName || typeof employee.firstName !== 'string') {
        return false;
    }
    if (!employee).lastName || typeof employee).lastName !== 'string') {
        return false;
    }
    if (!employee).id|| typeof employee).id !== 'string') {
        return false;
    }
    if (!employee).teamMemberRole || !Array.isArray(employee).teamMemberRole)) {
        return false;
    }
    return true;
}

app.get('/api/teamMember', (req, res) => {
    let results = teamMember;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/teamMember/:id', (req, res) => {
    const result = findById(req.params.id, employee);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/teamMember', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = teamMember.length.toString();

    if (!validateTeamMember(req.body)) {
        res.status(400).send('The team member is not properly formatted.');
    } else {
        const teamMember = createNewTeamMember(req.body, teamMember);
        res.json(teamMember);
    }
});
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});


// // const express = require('express');

// // const PORT = process.env.PORT || 3001;
// // const app = express();
// // const apiRoutes = require('./routes/apiRoutes');
// // const htmlRoutes = require('./routes/htmlRoutes');

// // app.use(express.urlencoded({
// //     extended: true
// // }));
// // app.use(express.json());
// // app.use(express.static('public'));

// // // Use apiRoutes
// // app.use('/api', apiRoutes);
// // app.use('/', htmlRoutes);

// // app.listen(PORT, () => {
// //     console.log(`API server now on port ${PORT}!`);
// // });

// // .├──__tests__ / //jest tests
// //     │├──Employee.test.js│├── Engineer.test.js│├── Intern.test.js│└── Manager.test.js├── dist / // rendered output (HTML) and CSS style sheet      
// //     ├──lib / // classes
// //     ├──src / // template helper code 
// //     ├──.gitignore // indicates which folders and files Git should ignore
// // ├── index.js // runs the application
// // └── package.json

// var inquirer = require('inquirer');
// inquirer
//     .prompt([
//         /* Pass your questions in here */
//     ])
//     .then((answers) => {
//         // Use user feedback for... whatever!!
//     })
//     .catch((error) => {
//         if (error.isTtyError) {
//             // Prompt couldn't be rendered in the current environment
//         } else {
//             // Something else went wrong
//         }
//     });

// // function employeeName (name) {
// //     this.name = name 
// //     this.getName = function () {
// //         return this.name
// //     }
// //       // Add a `setBalance()` function
// //     this.setName = function (value) {
// //         this.balance= value
// //     };
// //     // Add a `deposit()` function
// //     this.depositName = function (value) {
// //         // Bonus code
// //         if (typeof value !== 'number' || value <= 0) {
// //             throw new Error("'value' must be a positive number!");
// //         }
// //         let newBalance = this.getBalance() + value;
// //         this.setBalance(newBalance);
// //         console.log(`Deposited ${value}!`);
// //     };
// //     // Add a `withdraw()` function
// //     this.withdraw = function (value) {
// //         // Bonus code
// //         if (typeof value !== 'number' || value <= 0) {
// //             throw new Error("'value' must be a positive number");
// //         }
// //         let newBalance = this.getBalance() - value;
// //         // Bonus code
// //         if (newBalance < 0) {
// //             throw new Error('Insufficient funds for this transaction');
// //         }
// //         this.setBalance(newBalance);
// //         console.log(`Withdrew ${value}!`);
// //     };
// //     this.printName = function () {
// //         console.log(`Name: ${this.getName()}`);
// //     };
// //     }

// //     // =============================================================
// //     // PART 2

// //     // Create a new `bank` object
// //     let bank = new MiniBank(0);

// //     // Print the `bank` balance
// //     bank.printBalance();

// //     // Deposit some money and then print the `bank` balance
// //     bank.deposit(85);
// //     bank.printBalance();

// //     // Withdraw some money and then print the `bank` balance
// //     bank.withdraw(20);
// //     bank.printBalance();

// // };

// // The application must have these classes: Employee, Manager, Engineer, and Intern.The tests
// // for these classes( in the _tests_ directory) must all pass.

// // The first class is an Employee parent class with the following properties and methods:

// //name

// // id

// // email

// // getName()

// // getId()

// // getEmail()

// // getRole() // Returns 'Employee'

// function Person(first, last, id, email, role) {
//     this.firstName = first;
//     this.lastName = last;
//     this.id = id
//     this.email =email
//     this.role = role;
    
// }

// const employee = new Person("Kevin", "Smith", id1, email, "employee");
// const engineer = new Person("Oscar", "Martinez", id2, email, "engineer");
// const manager = new Person("Michael", "Scott", id3, email, "manager");
// const intern = new Person("Stanley", "Yelnats", id4, email, "intern");

// Person.prototype.name = function () {
//     return this.firstName + " " + this.lastName;
// };

// // The other three classes will extend Employee.



// // In addition to Employee 's properties and methods, Manager will also have:

// // officeNumber

// // getRole() // Overridden to return 'Manager'







// // In addition to Employee 's properties and methods, Engineer will also have:

// // github // GitHub username

// // getGithub()

// // getRole() // Overridden to return 'Engineer'







// // In addition to Employee 's properties and methods, Intern will also have:

// // school

// // getSchool()

// // getRole() // Overridden to return 'Intern'








// // Finally, although it’ s not a requirement, you should consider adding validation to ensure that user input provided is in the proper expected format.









// //10. Object-Oriented Programming Challenge: Team Profile Generator

// // User Story
// // AS A manager
// // I WANT to generate a webpage that displays my team 's basic info
// // SO THAT I have quick access to their emails and GitHub profiles





// // Acceptance Criteria
// // GIVEN a command - line application that accepts user input
// // WHEN I am prompted
// // for my team members and their information
// // THEN an HTML file is generated that displays a nicely formatted team roster based on user input






// // WHEN I click on an email address in the HTML
// // THEN my
// // default email program opens and populates the TO field of the email with the address






// // WHEN I click on the GitHub username
// // THEN that GitHub profile opens in a new tab






// // WHEN I start the application
// // THEN I am prompted to enter the team manager’ s name, employee ID, email address, and office number





// // WHEN I enter the team manager’ s name, employee ID, email address, and office number
// // THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team






// // WHEN I select the engineer option
// // THEN I am prompted to enter the engineer’ s name, ID, email, and GitHub username, and I am taken back to the menu






// // WHEN I select the intern option
// // THEN I am prompted to enter the intern’ s name, ID, email, and school, and I am taken back to the menu






// // WHEN I decide to finish building my team
// // THEN I exit the application, and the HTML is generated