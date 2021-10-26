// using Manager constructor 
const Manager = require('../lib/Manager');

// creating manager object  
test('creates an Manager object', () => {
    const manager = new Manager('Samantha', 222, 'samantha.peterson@gmail.com', 02);

    expect(manager.officeNumber).toEqual(expect.any(Number));
});

// gets role from getRole()
test('gets role of employee', () => {
    const manager = new Manager('Samantha', 222, 'samantha.peterson@gmail.com', 02);

    expect(manager.getRole()).toEqual("Manager");
});