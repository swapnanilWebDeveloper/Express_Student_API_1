const express = require("express");
const router = express.Router();

const {
    getAllStudents, // pagination , limit
    getAllStudentsByName, // sort, select, name.first, name.last, regEx...
    getAllStudentsByHobbiesGender, // sort, select, hobby, gender 
    getAllStudentsByAgeRangeAndHobbies, // sort, select, age range
    getAllStudentsByAddress, // sort, select , address state/district/city , regEx..
    getAllStudentsByScienceMarksRange, // sort, select, science physics/chemistry/mathematacis ..... 
    getAllStudentsByTotalGrade, // sort, select, total range , grade...

} = require("../controllers/studentsA");

const {
    createNewStudent,
    updateStudentByName,
    updateStudentByAddress,
    deleteStudentByName,
    deleteStudentByAddress,

} = require("../controllers/studentsB");

router.route("/").get(getAllStudents);
router.route("/Name").get(getAllStudentsByName);
router.route("/HobbyGender").get(getAllStudentsByHobbiesGender);
router.route("/AgeHobby").get(getAllStudentsByAgeRangeAndHobbies);
router.route("/Address").get(getAllStudentsByAddress);
router.route("/Marks").get(getAllStudentsByScienceMarksRange);
router.route("/TotalGrade").get(getAllStudentsByTotalGrade);

router.route("/createStudent").post(createNewStudent);
router.route("/updateStudentbyName").patch(updateStudentByName);
router.route("/updateStudentbyAddress").patch(updateStudentByAddress);
router.route("/deletebyName").delete(deleteStudentByName);
router.route("/deletebyAddress").delete(deleteStudentByAddress);

module.exports = router;