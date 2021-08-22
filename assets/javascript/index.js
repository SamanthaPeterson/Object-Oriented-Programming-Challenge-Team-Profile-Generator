//10. Object-Oriented Programming Challenge: Team Profile Generator

// .├──__tests__ / //jest tests
//     │├──Employee.test.js│├── Engineer.test.js│├── Intern.test.js│└── Manager.test.js├── dist / // rendered output (HTML) and CSS style sheet      
//     ├──lib / // classes
//     ├──src / // template helper code 
//     ├──.gitignore // indicates which folders and files Git should ignore
// ├── index.js // runs the application
// └── package.json

function employeeName (name) {
    this.name = name 
    this.getName = function () {
        return this.name
    }
      // Add a `setBalance()` function
    this.setName = function (value) {
        this.balance= value
    };
    // Add a `deposit()` function
    this.depositName = function (value) {
        // Bonus code
        if (typeof value !== 'number' || value <= 0) {
            throw new Error("'value' must be a positive number!");
        }
        let newBalance = this.getBalance() + value;
        this.setBalance(newBalance);
        console.log(`Deposited ${value}!`);
    };
    // Add a `withdraw()` function
    this.withdraw = function (value) {
        // Bonus code
        if (typeof value !== 'number' || value <= 0) {
            throw new Error("'value' must be a positive number");
        }
        let newBalance = this.getBalance() - value;
        // Bonus code
        if (newBalance < 0) {
            throw new Error('Insufficient funds for this transaction');
        }
        this.setBalance(newBalance);
        console.log(`Withdrew ${value}!`);
    };
    this.printName = function () {
        console.log(`Name: ${this.getName()}`);
    };
    }

    // =============================================================
    // PART 2

    // Create a new `bank` object
    let bank = new MiniBank(0);

    // Print the `bank` balance
    bank.printBalance();

    // Deposit some money and then print the `bank` balance
    bank.deposit(85);
    bank.printBalance();

    // Withdraw some money and then print the `bank` balance
    bank.withdraw(20);
    bank.printBalance();

};
// The application must have these classes: Employee, Manager, Engineer, and Intern.The tests
// for these classes( in the _tests_ directory) must all pass.

// The first class is an Employee parent class with the following properties and methods:

//name

// id

// email

// getName()

// getId()

// getEmail()

// getRole() // Returns 'Employee'

function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.id = id
    this.email =email
    this.role = role;
    
}

const employee = new Person("John", "Doe", id, email, "employee");
const engineer = new Person("Sally", "Rally", id, email, "engineer");
const manager = new Person("Sally", "Rally", id, email, "manager");
const intern = new Person("Sally", "Rally", id, email, "intern");

// The other three classes will extend Employee.

// In addition to Employee 's properties and methods, Manager will also have:

// officeNumber

// getRole() // Overridden to return 'Manager'

// In addition to Employee 's properties and methods, Engineer will also have:

// github // GitHub username

// getGithub()

// getRole() // Overridden to return 'Engineer'

// In addition to Employee 's properties and methods, Intern will also have:

// school

// getSchool()

// getRole() // Overridden to return 'Intern'

// Finally, although it’ s not a requirement, you should consider adding validation to ensure that user input provided is in the proper expected format.



//10. Object-Oriented Programming Challenge: Team Profile Generator

// User Story
// AS A manager
// I WANT to generate a webpage that displays my team 's basic info
// SO THAT I have quick access to their emails and GitHub profiles





// Acceptance Criteria
// GIVEN a command - line application that accepts user input
// WHEN I am prompted
// for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input






// WHEN I click on an email address in the HTML
// THEN my
// default email program opens and populates the TO field of the email with the address






// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab






// WHEN I start the application
// THEN I am prompted to enter the team manager’ s name, employee ID, email address, and office number





// WHEN I enter the team manager’ s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team






// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’ s name, ID, email, and GitHub username, and I am taken back to the menu






// WHEN I select the intern option
// THEN I am prompted to enter the intern’ s name, ID, email, and school, and I am taken back to the menu






// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated