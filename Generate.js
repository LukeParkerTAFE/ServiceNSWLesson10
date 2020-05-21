const StudentDataReader = require("./StudentDataReader");
const TeacherDataReader = require("./TeacherDataReader");
const fs = require("fs");

let _studentDataSet = new StudentDataReader();
let _teacherDataSet = new TeacherDataReader();

if(!fs.existsSync("./JSONData")) {
    fs.mkdirSync("./JSONData")
}


_teacherDataSet.generateRandomTeachers();
let teacherIds = _teacherDataSet.getArrayFromFile().map(teacher => teacher.id);
_studentDataSet.generateRandomStudents(teacherIds);
