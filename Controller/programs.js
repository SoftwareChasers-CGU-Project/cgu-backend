const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const Program= require('../Model/programs');
const ProgramService = require('../Services/programs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

//  function for getting all programs
app.get('/programs', async (req, res) => {
  try {
      const allPrograms = await ProgramService.getAllProgram();
      const all= await allPrograms;
      if (all) {
        return res.status(200).send(
          all
        )
      }
    } catch (error) {
       console.log(error, "error!!");
    }
    	
  
  }),

  //  function for deleting a program
  app.delete('/programs/:programId', async(req, res) => {
    try {
        const Id  = req.params.programId;
        const program = await ProgramService.deleteProgram(Id);
        
        if (program) {
          return res.status(200).send(
            
          )
        }
      } catch (error) {
         console.log(error, "error!!");
      }
        
    
    }),

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
          
      
    }),

    //  function for creating a new program
    app.post('/programs', async (req, res) => {
      try {
      const data  = req.body;
      const {programImage,programName,programDate,programCat,programDesc} = data;
      if(!data) {
        return "Please pass all required fields!"
      }
      const dataToSave = {programImage,programName,programDate,programCat,programDesc,programId:uuidv4()};
      let createProgram =  await ProgramService.createProgram(dataToSave);
      if (createProgram) {
        return res.status(200).send(
          createProgram
        )
      }
      } catch (error) {
        console.log(error, "error!!");
      }
    
    }),

     //  function for updating a program
    app.put('/programs/:programId', async (req, res) => {
      try {
      console.log(req.body);
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
 
    })


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