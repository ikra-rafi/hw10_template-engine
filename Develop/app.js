// Classes
const Employee = require ("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
// 
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const template = require("./src/page-template");

// Write code to use inquirer to gather information about the development team members,
const teamMembers = [];
const idArray = [];

function appMenu() {

    function createManager() {
        console.log("Please build your team");
        inquirer .prompt ([
            
            // manager's name
            {
                type: "input",
                name: "managerName",
                message: "What is the team manager’s name?", 
            },
            
            // manager's ID
            {   
                type: "input",
                name : "managerId",
                message : "What is the team manager’s id?",                   
            },

            // manager's email
            {
            type: "input",
            name: "managerEmail",
            message: "What is the team manager’s email?",
            },

            // manager's office number
            {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is the team manager’s office number",
            },


    ]).then(answers => {
        const manager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        
        creatTeam();
    });

    }
    // end Create manager function
        function creatTeam() {
            inquirer.prompt([
                {
                    type: "list",
                    name: "Choice",
                    message: "Which type of team member would you like to add ?",
                    choices: ["Engineer", "Intern" ,"I don't want to add any more team members"],
                }
            ])

            .then(userChoice => {
switch (userChoice.Choice) {
    case "Engineer":
    addEngineer();
        break;
        case "Intern":
            addIntern();
            break;
            default:
            buildTeam();
}
            })
}
function addEngineer() {
    inquirer .prompt ([
        {
            type: "input",
            name: "engineerName",
            message: "What is the Engineer name?",
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is the team manager’s id?",
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your Engineer email?",
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the Engineer github username?",
        },
     ]).then(answers => {
    const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
    teamMembers.push(engineer);
    idArray.push(answers.engineerId);
    creatTeam();
     });
    }
function addIntern(){
    inquirer.prompt ([
        {
            type: "input",
            name: "internName",
            message: "What is the Intern name?",
        },
        {
            type: "input",
            name: "internId",
            message: "What is the team Intern id ?",
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your Intern email?",
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the Intern school?",
        },
]).then(answers => {
    const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
    teamMembers.push(intern);
    idArray.push(answers.internId);
    creatTeam();
});
    }
    function buildTeam() {
if (!fs.existsSync(OUTPUT_DIR) ) {
fs.mkdirSync(OUTPUT_DIR)
}
fs.writeFileSync(outputPath,render(teamMembers),
"utf-8");
    }
    createManager();
    }
appMenu();
    
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

//run npm test
