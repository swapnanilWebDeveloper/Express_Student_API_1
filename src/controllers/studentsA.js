const Student = require("../models/students");

const getAllStudents= async (req,res) => {
    try{
        const {sort, select} = req.query;

        let studentData = Student.find(); 

        if(sort){
            let sortFIx = sort.replaceAll(",", " ");
            console.log(sortFIx);
            studentData = studentData.sort(sortFIx);
        }

        if(select){
            let selectFIx = select.replaceAll(",", " ");
            console.log(selectFIx);
            studentData = studentData.select(selectFIx);
        }

        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 5;

        let skip = (page - 1) * limit ;

        studentData = studentData.skip(skip).limit(limit);

        const resStudent = await studentData;
        console.log(resStudent);
        console.log(req.query);
        res.status(200).json({resStudent, lengthOfStudentList : resStudent.length});
    }
    catch(error){
        res.status(400).json("something went wrong while getting all the students : "+error);
    } 
}

const getAllStudentsByName = async (req,res) => {
        try{
            const {firstName, lastName, select, sort} = req.query;
            let queryObject = {};
    
            let studentData = Student.find();

            if(firstName){
                queryObject.firstName = { $regex : firstName , $options : 'i'},
                console.log(queryObject);
                console.log(queryObject.firstName);
                studentData = studentData.find({"name.first" : queryObject.firstName });
            }

            if(lastName){
                queryObject.lastName = { $regex : lastName , $options : 'i'} 
                console.log(queryObject);
                console.log(queryObject.lastName);
                studentData = studentData.find({"name.last" : queryObject.lastName});
            }

            if(select){
                let selectFIx = select.replaceAll(",", " ");
                console.log(selectFIx);
                studentData = studentData.select(selectFIx);
            }

            if(sort){
                let sortFIx = sort.replaceAll(",", " ");
                console.log(sortFIx);
                studentData = studentData.sort(sortFIx);
            }
    
            const resStudent = await studentData;
            console.log(resStudent);
            console.log(req.query);
            res.status(200).json({resStudent, lengthOfStudentList : resStudent.length})
        }
        catch(error){
            res.status(400).send("Something went wrong while getting all students by name : "+error);
        }
}

const getAllStudentsByHobbiesGender = async (req,res) => {
    try{
        const {hobbies , gender, sort, select} = req.query;
        const queryObject = {};

        let studentData = Student.find(); 

        if(sort){
            let sortFIx = sort.replaceAll(",", " ");
            console.log(sortFIx);
            studentData = studentData.sort(sortFIx);
        }

        if(select){
            let selectFIx = select.replaceAll(",", " ");
            console.log(selectFIx);
            studentData = studentData.select(selectFIx);
        }

        if(gender){
            queryObject.gender = gender;
            console.log(queryObject);
            console.log(queryObject.gender);
            studentData = studentData.find(queryObject)
        }

        if(hobbies){
            queryObject.hobbies = hobbies.split(",");
            console.log(queryObject);
            console.log(queryObject.hobbies);
            studentData = studentData.find({hobbies : { $all : queryObject.hobbies } })
        }

        const resStudent = await studentData;
        console.log(resStudent);
        console.log(req.query);
        res.status(200).json({resStudent, lengthOfStudentList : resStudent.length});
    }
    catch(error){
        res.status(400).json("something went wrong while getting all the students by Gender and hobbies: "+error);
    }
}

const getAllStudentsByAgeRangeAndHobbies= async (req,res) => {
    try{
        const {ageMax, ageMin, hobbies, sort, select} = req.query;
        const queryObject = {};

        let studentData = Student.find(); 

        if(sort){
            let sortFIx = sort.replaceAll(",", " ");
            console.log(sortFIx);
            studentData = studentData.sort(sortFIx);
        }

        if(select){
            let selectFIx = select.replaceAll(",", " ");
            console.log(selectFIx);
            studentData = studentData.select(selectFIx);
        }

        if(ageMax){
            queryObject.ageMax = ageMax;
            console.log(queryObject);
            console.log(queryObject.ageMax);
            studentData = studentData.find({ age : {$lte : queryObject.ageMax}});
        }

        if(ageMin){
            queryObject.ageMin = ageMin;
            console.log(queryObject);
            console.log(queryObject.ageMin);
            studentData = studentData.find({ age : { $gte : queryObject.ageMin}});
        }

        if(hobbies){
            queryObject.hobbies = hobbies.split(",");
            console.log(queryObject);
            console.log(queryObject.hobbies);
            studentData = studentData.find({hobbies : { $all : queryObject.hobbies } })
        }

        const resStudent = await studentData;
        console.log(resStudent);
        console.log(req.query);
        res.status(200).json({resStudent, lengthOfStudentList : resStudent.length});
    }
    catch(error){
        res.status(400).json("something went wrong while getting all the students by age range and hobbies: "+error);
    }
}

const getAllStudentsByAddress= async (req,res) => {
    try{
        const {state, district , city, sort, select} = req.query;
        const queryObject = {};

        let studentData = Student.find();

        if(sort){
            let sortFIx = sort.replaceAll(",", " ");
            console.log(sortFIx);
            studentData = studentData.sort(sortFIx);
        }

        if(select){
            let selectFIx = select.replaceAll(",", " ");
            console.log(selectFIx);
            studentData = studentData.select(selectFIx);
        }

        if(state){
            queryObject.state ={ $regex : state , $options : 'i'};
            console.log(queryObject);
            console.log(queryObject.state);
            studentData = studentData.find({"address.state" : queryObject.state})
        }

        if(district){
            queryObject.district = { $regex : district , $options : 'i'};
            console.log(queryObject);
            console.log(queryObject.district);
            studentData = studentData.find({"address.district" : queryObject.district});
        }

        if(city){
            queryObject.city = { $regex : city, $options : 'i'};
            console.log(queryObject);
            console.log(queryObject.city);
            studentData = studentData.find({"address.city" : queryObject.city});
        }

        const resStudent = await studentData;
        console.log(resStudent);
        console.log(req.query);
        res.status(200).send({resStudent, lengthOfStudentList : resStudent.length});
    }
    catch(error){
        res.status(400).send("Something went wrong while getting all students by address : "+error);
    }
}

const getAllStudentsByScienceMarksRange = async (req,res) => {
    try{
        const {phyMin, phyMax, chemMin, chemMax, mathMin, mathMax, sort, select} = req.query;
        const queryObject = {};

        let studentData = Student.find();

        if(sort){
            let sortFIx = sort.replaceAll(",", " ");
            console.log(sortFIx);
            studentData = studentData.sort(sortFIx);
        }

        if(select){
            let selectFIx = select.replaceAll(",", " ");
            console.log(selectFIx);
            studentData = studentData.select(selectFIx);
        }

        if(phyMin){
            queryObject.phyMin = phyMin;
            console.log(queryObject);
            console.log(queryObject.phyMin);
            studentData = studentData.find({"science.physics" : {$gte : phyMin} })
        }

        if(phyMax){
            queryObject.phyMax = phyMax;
            console.log(queryObject);
            console.log(queryObject.phyMax);
            studentData = studentData.find({"science.physics" : {$lte : phyMax} })
        }

        if(chemMin){
            queryObject.chemMin = chemMin;
            console.log(queryObject);
            console.log(queryObject.chemMin);
            studentData = studentData.find({"science.chemistry" : {$gte : chemMin} })
        }

        if(chemMax){
            queryObject.chemMax = chemMax;
            console.log(queryObject);
            console.log(queryObject.chemMax);
            studentData = studentData.find({"science.chemistry" : {$lte : chemMax} })
        }

        if(mathMin){
            queryObject.mathMin = mathMin;
            console.log(queryObject);
            console.log(queryObject.mathMin);
            studentData = studentData.find({"science.mathematics" : {$gte : mathMin} })
        }

        if(mathMax){
            queryObject.mathMax = mathMax;
            console.log(queryObject);
            console.log(queryObject.mathMax);
            studentData = studentData.find({"science.mathematics" : {$lte : mathMax} })
        }

        const resStudent = await studentData;
        console.log(resStudent);
        console.log(req.query);
        res.status(200).send({resStudent, lengthOfStudentList : resStudent.length});
    }
    catch(error){
        res.status(400).send("Something went wrong while getting all science marks range  : "+error);
    }
}

const getAllStudentsByTotalGrade = async (req,res) => {
    try{
        const {totalMin, totalMax, grade, sort, select} = req.query;
        const queryObject = {};

        let studentData = Student.find(); 

        if(sort){
            let sortFIx = sort.replaceAll(",", " ");
            console.log(sortFIx);
            studentData = studentData.sort(sortFIx);
        }

        if(select){
            let selectFIx = select.replaceAll(",", " ");
            console.log(selectFIx);
            studentData = studentData.select(selectFIx);
        }

        if(totalMax){
            queryObject.totalMax = totalMax;
            console.log(queryObject);
            console.log(queryObject.totalMax);
            studentData = studentData.find({ total : {$lte : queryObject.totalMax}});
        }

        if(totalMin){
            queryObject.totalMin = totalMin;
            console.log(queryObject);
            console.log(queryObject.totalMin);
            studentData = studentData.find({ total : { $gte : queryObject.totalMin}});
        }

        if(grade){
            queryObject.grade = { $regex : grade , $options : 'i'};
            console.log(queryObject);
            console.log(queryObject.grade);
            studentData = studentData.find({grade : queryObject.grade});
        }

        const resStudent = await studentData;
        console.log(resStudent);
        console.log(req.query);
        res.status(200).json({resStudent, lengthOfStudentList : resStudent.length});
    }
    catch(error){
        res.status(400).send("Something went wrong while getting all students Total and Grade : "+error);
    }
}

module.exports = {
    getAllStudents,
    getAllStudentsByName,
    getAllStudentsByHobbiesGender,
    getAllStudentsByAgeRangeAndHobbies,
    getAllStudentsByAddress,
    getAllStudentsByScienceMarksRange,
    getAllStudentsByTotalGrade,
}