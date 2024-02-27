const Student = require("../models/students");
const { calcGradeTotalStudent } = require("../CalculateTotalGrade/calcTotalGrade");

const createNewStudent= async (req,res) => {
        console.log(req.body);  
        try{
                 const studentData = new Student({
                    name : {
                        first : req.body.name.first,
                        last : req.body.name.last,
                    },
                    age : req.body.age,
                    isAlive : req.body.isAlive,
                    gender : req.body.gender,
                    address : {
                        state : req.body.address.state,
                        district : req.body.address.district,
                        city : req.body.address.city,
                    },
                    science : {
                        physics : req.body.science.physics,
                        chemistry : req.body.science.chemistry,
                        mathematics : req.body.science.mathematics,
                    },
                    hobbies : req.body.hobbies,
           });

           calcGradeTotalStudent([studentData]);
           const createStudentData = await studentData.save();
           res.status(201).send(createStudentData);
    
           console.log(createStudentData);
        }
    catch(error){
        res.status(400).json("something went wrong while getting all the students : "+error);
    } 
}

const updateStudentByName = async (req,res) => {
        try{
            console.log(req.body);
            const {firstName, lastName} = req.query;
            const queryObject = { firstName : "", lastName : ""};

            if(firstName){
                queryObject.firstName = { $regex : firstName , $options : 'i'},
                console.log(queryObject);
                console.log(queryObject.firstName);
            }

            if(lastName){
                queryObject.lastName = { $regex : lastName , $options : 'i'} 
                console.log(queryObject);
                console.log(queryObject.lastName);
            }
            const updateStudent = await Student.findOneAndUpdate({"name.first" : queryObject.firstName , "name.last" : queryObject.lastName}, 
                {$set : req.body },
                 {
                   returnDocument : "after"
                 }
                );
                calcGradeTotalStudent([updateStudent]);
                const resStudent = await updateStudent.save();

              console.log(resStudent);
              res.status(201).send(updateStudent);
        }
        catch(err){
            console.log("Something went wrong while updating the data : "+err);
        }
}

const updateStudentByAddress = async (req,res) => {
    try{
        console.log(req.body);
        const {state, district, city} = req.query;
        const queryObject = { state : "", district : "", city : ""};

        if(state){
            queryObject.state ={ $regex : state , $options : 'i'};
            console.log(queryObject);
            console.log(queryObject.state);
        }

        if(district){
            queryObject.district = { $regex : district , $options : 'i'};
            console.log(queryObject);
            console.log(queryObject.district);
        }

        if(city){
            queryObject.city = { $regex : city, $options : 'i'};
            console.log(queryObject);
            console.log(queryObject.city);
        }
        const updateStudent = await Student.findOneAndUpdate({"address.state" : queryObject.state,
         "address.district" : queryObject.district, "address.city" : queryObject.city}, 
            {$set : req.body },
             {
               returnDocument : "after"
             }
            );
            calcGradeTotalStudent([updateStudent]);
            const resStudent = await updateStudent.save();

          console.log(resStudent);
          res.status(201).send(updateStudent);
    }
    catch(err){
        console.log("Something went wrong while updating the data : "+err);
    }
}

const deleteStudentByName = async (req,res) => {
    try{
        const {firstName, lastName} = req.query;
        const queryObject = { firstName : "", lastName : ""};

        if(firstName){
            queryObject.firstName = { $regex : firstName , $options : 'i'},
            console.log(queryObject);
            console.log(queryObject.firstName);
        }

        if(lastName){
            queryObject.lastName = { $regex : lastName , $options : 'i'} 
            console.log(queryObject);
            console.log(queryObject.lastName);
        }

        const studentResult = await Student.findOneAndDelete({"name.first" : queryObject.firstName, "name.last" : queryObject.lastName});

        if(!(firstName && lastName)){
           return res.status(404).send("No student is found with this first name and last name !!..");
        }
        console.log(studentResult);
        res.status(201).send(studentResult);   
    }
    catch(err){
      res.status(500).send("Somethething wrong happend in deleting : "+err);
    }
}

// deleteStudentByAddress
const deleteStudentByAddress = async (req,res) => {
    try{
        const {state, district , city} = req.query;
        const queryObject = {};

        if(state){
            queryObject.state ={ $regex : state , $options : 'i'};
            console.log(queryObject);
            console.log(queryObject.state);
        }

        if(district){
            queryObject.district = { $regex : district , $options : 'i'};
            console.log(queryObject);
            console.log(queryObject.district);
        }

        if(city){
            queryObject.city = { $regex : city, $options : 'i'};
            console.log(queryObject);
            console.log(queryObject.city);
        }

        const studentResult = await Student.findOneAndDelete({"address.state" : queryObject.state, "address.district" : queryObject.district
                                                               , "address.city" : queryObject.city});

        if(!(state && district && city)){
           return res.status(404).send("No student is found with this address !!..");
        }
        console.log(studentResult);
        res.status(201).send(studentResult);  
    }
    catch(err){
      res.status(400).send("Something went Wrong while deleting student by address : !!! "+err);
    }
}

module.exports = {
    createNewStudent,
    updateStudentByName,
    updateStudentByAddress,
    deleteStudentByName,
    deleteStudentByAddress,
}