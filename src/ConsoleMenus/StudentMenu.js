const path = require("path");
const { StudentDataReader, TeacherDataReader } = require("../DataLayer");
const { StudentService } = require("../Services");
const { Student } = require("../Models");
const { askQuestion } = require("../Common/ConsoleFunctions");


const baseFilePath = path.join(__dirname, "../../", "JSONData");
const _studentDataReader = new StudentDataReader(path.join(baseFilePath, "Students.json"));
const _teacherDataReader = new TeacherDataReader(path.join(baseFilePath, "Teachers.json"));
const _studentService = new StudentService(_studentDataReader, _teacherDataReader);

module.exports = async function StudentMenu() {
    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Add Student");
        console.log("[2] Search Students");
        console.log("[3] Update Student");
        console.log("[4] Delete Student");
        console.log("[5] Go Back");
        let userInputStudent = await askQuestion("Select an option from above: ");
        switch (userInputStudent) {
            case "1":
                await AddStudent();
                break;
            case "2":
                let searchTerm = await askQuestion("Enter search term: ");
                let matchingStudents = _studentService.searchByName(searchTerm);
                console.log(matchingStudents);
                break;
            case "5":
                console.log("Going back to main menu");
                shouldLoop = false;
                break;
            default:
        }
    }
}
async function AddStudent() {
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
}