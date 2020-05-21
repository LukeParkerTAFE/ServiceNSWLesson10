const Student = require("./Student");
const fs = require("fs");

module.exports = class StudentDataReader {
    constructor(fileName) {
        this.fileName = fileName;
    }

    getArrayFromFile() {
        return JSON.parse(fs.readFileSync(this.fileName).toString()).map(studentRaw => new Student(
            studentRaw.firstName,
            studentRaw.lastName,
            studentRaw.age,
            studentRaw.grades,
            studentRaw.teacherId,
            studentRaw.id
        ));
    }

    writeArrayToFile(arrayValue) {
        fs.writeFileSync(this.fileName, JSON.stringify(arrayValue));
    }

    getStudent(id) {
        return this.getArrayFromFile().find(s => s.id == id);
    }

    updateStudent(student) {
        this.writeArrayToFile(this.getArrayFromFile().map(s => {
            if (s.id == student.id) {
                return student;
            } else {
                return s;
            }
        }));
    }

    deleteStudent(id) {
        this.writeArrayToFile(this.getArrayFromFile().filter(s => s.id != id));
    }

    addStudent(student) {
        this.writeArrayToFile(this.getArrayFromFile().concat([student]));
    }

    // WARNING: THIS WILL OVERRIDE ANY DATA CURRENTLY IN THE "Students.json" FILE
    generateRandomStudents(teacherIds) {
        this.writeArrayToFile(Student.generateRandomPeople(100, teacherIds));
    }
}
