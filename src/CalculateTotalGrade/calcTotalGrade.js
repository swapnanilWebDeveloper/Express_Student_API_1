const student = require("../models/students");

const calcGradeTotalStudent = (studentData) => {
    let total, avg, dataLength;
    dataLength = studentData.length;

    console.log("Hello , I am calculating Total and Grade ...!!!");
    console.log("Length of student data list = "+dataLength);

    for(var i = 0; i < dataLength ; i++){
        studentData[i].total = studentData[i].science.physics + studentData[i].science.chemistry + studentData[i].science.mathematics;
        total = studentData[i].total;
        avg = total / 3;
        studentData[i].average = avg.toFixed(2); 
        getGradeStudent(studentData,avg,i);
    } 
}

const getGradeStudent = (studentData,avg,ind) => {

     if(avg >= 90){
         studentData[ind].grade = "Excellent";
     }
     else if(avg >= 80 && avg < 90){
         studentData[ind].grade = "Very Good";
     }
     else if(avg >= 70 && avg < 80){
        studentData[ind].grade = "Good";
    }
    else if(avg >= 60 && avg < 70){
        studentData[ind].grade = "Satisfactory";
    }
    else if(avg >= 40 && avg < 60){
        studentData[ind].grade = "Not Good";
    }
    else{
        studentData[ind].grade = "Fail";
    }
}

module.exports = {
    calcGradeTotalStudent
}