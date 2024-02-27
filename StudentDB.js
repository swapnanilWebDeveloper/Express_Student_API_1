const connectDB = require("./src/db/connect");
require("dotenv").config();
const { 
    calcGradeTotalStudent
   }  = require("./src/CalculateTotalGrade/calcTotalGrade");

const Student = require("./src/models/students");
const StudentJson = require("./Students.json");

const startDataBase = async () => {
    try{
        await connectDB(process.env.MONGODB_URL);
       // await Product.deleteMany();
        calcGradeTotalStudent(StudentJson);
        await Student.create(StudentJson);
        console.log("Successfully Documents of students inserted...!!!");
    }
    catch(error){
        console.log("Something went wrong with Databse connection ....!!!"+error);
    }
}

startDataBase();
