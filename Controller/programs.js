const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const Program= require('../Model/programs');
const ProgramService = require('../Services/programs');
const nodemailer = require("nodemailer");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer  = require('multer');
const registerEventService = require('../Services/registerEvent');
const upload = multer({ dest: 'uploads/' });
var jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
 
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized");
  }

  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token === "null") {
    return res.status(401).send("Unauthorized");
  }

  let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if(payload.role == 'Admin' || payload.role == 'MainAdmin'){
    next();

  }else{
    return res.status(401).send("Unauthorized");
  }
  
}

//  function for getting all programs
app.get('/programs/past', async (req, res) => {

  try {
      const allPrograms = await ProgramService.getAllPastProgram();
      const allPast= await allPrograms;
      if (allPast) {
        return res.status(200).send(
          allPast
        )
      }
    } catch (error) {
       console.log(error, "error!!");
    }
    	
  
  });

app.get('/programs/programType/:programCat', async (req, res) => {
  try {
    const programCat = req.params.programCat;
    console.log(programCat);

    if(programCat == "Department")
    {
        const DepartmentEvents = await ProgramService.getDepartmentEvents();  
        if (DepartmentEvents) {
          return res.status(200).send(
            DepartmentEvents   
        )
        }
      }
    else if(programCat == "CGU"){
        const CGUEvents = await ProgramService.getCGUEvents();  
        if (CGUEvents) {
          return res.status(200).send(
            CGUEvents   
          )
        }
    }
    else if(programCat == "Workshops"){
      const Workshops = await ProgramService.getWorkshops();  
      if (Workshops) {
        return res.status(200).send(
          Workshops   
        )
      }
    }
    else if(programCat == "false"){
      const Programs = await ProgramService.getAllProgram();  
      if (Programs) {
        return res.status(200).send(
          Programs   
        )
      }
    }
  } catch (error) {
      console.log(error, "error!!");
  }
});


  //  function for deleting a program
  app.delete('/programs/:programId', verifyToken,async(req, res) => {
    try {
        const Id  = req.params.programId;
        const underGrads=await registerEventService.getEmails(Id);
        const programDetails=await ProgramService.viewProgram(Id);
        const program = await ProgramService.deleteProgram(Id);
        console.log(programDetails)

        var dateArr = programDetails[0].programDate.toString().slice(4,15);
        var emailStrings = "";
        console.log(dateArr)

        for (let index = 0; index < underGrads.length; index++) {
          emailStrings += (underGrads.length-1) == index ? underGrads[0].undergradEmail : underGrads[0].undergradEmail  + ",";
        }
        
        console.log(emailStrings);
        if(underGrads[0]!=null){
          var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "8030025c130717",
              pass: "92144cf4b2d238"
            }
          });
       
          
        let info = await transporter.sendMail({
          from: ' <cgu.uom22@gmail.com>', 
          to:emailStrings,
          subject:"Regarding the session Request | "+ programDetails[0].programName, 
          html: "<p>Dr Student,</p><p>The program on topic " + programDetails[0].programName +" that is held to be on "  + dateArr+" is cancelled.</p><p>Thank you</p>Career Guidance Unit,<br><p>University of Moratuwa</p>",
        });
  
        }

        
           
        if (program) {
          return res.status(200).send(
            
          )
        }
      } catch (error) {
         console.log(error, "error!!");
      }
        
    
    });

    //  function for viewing a program
    app.get('/programs/:programId', async(req, res) => {
      try {
          const Id  = req.params.programId;
          const Program = await ProgramService.viewProgram(Id);
          
          if ( Program) {
            return res.status(200).send(
              Program
            )
          }
        } catch (error) {
           console.log(error, "error!!");
        }
          
      
    });

    //  function for creating a new program
    app.post('/programs',verifyToken, async (req, res) => {
      try {
      const data  = req.body;
      const {programImage,programName,programDate,programTime,programCat,programDesc} = data;
      if(!data) {
        return "Please pass all required fields!"
      }
      const dataToSave = {programImage,programName,programDate,programTime,programCat,programDesc,programId:uuidv4()};
      let createProgram =  await ProgramService.createProgram(dataToSave);
      if (createProgram) {
        return res.status(200).send(
          createProgram
        )
      }
      } catch (error) {
        console.log(error, "error!!");
      }
    
    });

     //  function for updating a program
    app.put('/programs/:programId',verifyToken, async (req, res) => {
      try {
      // console.log(req.body);
      if(!req.body) {
        return "Please pass all required fields!"
      }
      let updateProgram =  await ProgramService.updateProgram(req.body);
      if (updateProgram) {
        return res.status(200).send(
          updateProgram
        )
      }
      } catch (error) {
        console.log(error, "error!!");
      }
 
    });


module.exports.handler = serverless(app);


































// app.get("/", async(req, res) => {

//   let sql = `SELECT * from products`;

//   let query = mysql.query(sql, (err) => {

//     if (err) {

//       throw err;

//     }

//     if (query) {
//       return res.status(200).send({
//         data: query
//       })
//     }
   

//   });

// }),



// app.post("/", (req, res) => {

  // let post = { name: "Jake Smith", description: "Chief Executive Officer" };
  // const data  = req.body;
  // const {ProductName} = data;
  // const dataToSave = {ProductName,Id:uuidv4()};
  // if(!data) {
  //    return "Please pass all required fields!"
  // }


  // let sql = "INSERT INTO products SET ?";

  // let query = mysql.query(sql, dataToSave, (err) => {

  // let sql = `INSERT INTO products (Id, ProductName) values (dataToSave`;

  // let query = mysql.query(sql, (err) => {

//     if (err) {

//       throw err;

//     }

//     if (query) {
//       return res.status(200).send({
//         data: query
//       })
//     }

//   });

// });