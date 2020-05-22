const readline = require('readline');
const path = require("path");
const { StudentDataReader, TeacherDataReader } = require("./DataLayer");
const { StudentService } = require("./Services");
const { Student, Teacher } = require("./Models");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(question) {
    let answer;

    return new Promise((resolve, reject) => {
        rl.question(question, (ans) => {
            resolve(ans);
        })
    });
}


async function Program() {
    const baseFilePath = path.join(__dirname, "../", "JSONData");
    const _studentDataReader = new StudentDataReader(path.join(baseFilePath, "Students.json"));
    const _teacherDataReader = new TeacherDataReader(path.join(baseFilePath, "Teachers.json"));
    const _studentService = new StudentService(_studentDataReader, _teacherDataReader);

    // console.log(_studentDataReader.getArrayFromFile());
    // console.log(_teacherDataReader.getArrayFromFile());

    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Students");
        console.log("[2] Teachers");
        console.log("[3] Exit");
        let userInput = await askQuestion("Select an option from above: ");
        switch (userInput) {
            case "1":
                console.log("[1] Add Student");
                console.log("[2] Search For Student");
                console.log("[3] Update Student");
                console.log("[4] Delete Student");
                console.log("[5] Go Back");
                let userInputStudent = await askQuestion("Select an option from above: ");
                switch (userInputStudent) {
                    case "1":
                        let studentFirstName = await askQuestion("Enter Student First Name: ");
                        let studentLastName = await askQuestion("Enter Student Last Name: ");
                        let studentAge = await askQuestion("Enter Student Age: ");
                        let parsedStudentAge = parseInt(studentAge);
                        let grades = await askQuestion("Enter Student Grades (Space-Separated): ");
                        let teacherId = await askQuestion("Enter Teacher's ID: ");
                        let parsedGrades = grades.split(" ").map(num => parseInt(num));
                        let newStudent = new Student(
                            studentFirstName,
                            studentLastName,
                            parsedStudentAge,
                            parsedGrades,
                            teacherId
                        );
                        _studentService.addStudent(newStudent);
                        break;
                    default:
                        console.log("Going back to main menu");
                }
                break;
            case "2":
                break;
            case "3":
                shouldLoop = false;
                break;
            default:
                console.log("Error: Could not read user input. Please enter a number from 1 to 3");
        }
    }
}

Program().then(() => {
    process.exit(0);
});
