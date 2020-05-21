const path = require("path");
const StudentDataReader = require("./StudentDataReader");
const TeacherDataReader = require("./TeacherDataReader");

let _studentDataSet = new StudentDataReader();
let _teacherDataSet = new TeacherDataReader();



console.log(_studentData.getStudent('cc3e201c-7137-4dad-8ebe-c1e6ca638b7a'));

let will = _studentData.getStudent('cc3e201c-7137-4dad-8ebe-c1e6ca638b7a');
will.grades.push(90);
_studentData.updateStudent(will);
console.log(_studentData.getStudent('cc3e201c-7137-4dad-8ebe-c1e6ca638b7a'));
