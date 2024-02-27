const mongoose = require("mongoose");

const studentSchema = new  mongoose.Schema({
    name : {
        first : {
            type : String,
            required : true,
        },
        last : {
            type : String,
            required : true,
        }
    },
    age : {
        type : Number,
        required : [true, "Please fill the age field ...!!!"]
    },
    isAlive : {
        type : Boolean,
        default : true,
    },
    gender : {
        type : String,
        default : "Male",
        enum : {
            values : ["Male", "Female", "Others"],
            message : `${this.values} is not supported`,
        }
    },
    address : {
        state : { type : String, required : [true, "Please Provide state ...."]},
        district : { type : String, required : [true, "Please Provide district ...."]},
        city : { type : String, required : [true, "Please Provide city ...."]},
    },
    science : {
        physics : { type : Number, require : [true, "Please provide marks of physics..."]},
        chemistry : { type : Number, require : [true, "Please provide marks of chemistry..."]},
        mathematics : { type : Number, require : [true, "Please provide marks of mathematics..."]}
    },
    total : {
      type : Number,
      default : 90,
    },
    average : {
        type : Number,
        required : [true, "Average is not calculated..!!!"]
    },
    grade : { 
        type : String,
        default : "Good",
    },
    hobbies : [String],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;