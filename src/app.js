require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 7070 ;

const students_routes  = require("./routes/students");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello I am going to create a API on student data...!!!");
});

// middleware or to set router
app.use("/api/students", students_routes);

const startStudentInformation = async (req,res) => {
    try{
      const res = await connectDB(process.env.MONGODB_URL);
      if(res){
        console.log("Connection successfull !! ");
      }
      else{
        console.log("Something wrong with Connection to Database...");
      }
       app.listen(PORT, () => {
         console.log(`${PORT} Yes I am connected !!`);
       });
    }
    catch(err){
      console.log("Something went wrong !!! : "+err);
    }
 }
 
 startStudentInformation();