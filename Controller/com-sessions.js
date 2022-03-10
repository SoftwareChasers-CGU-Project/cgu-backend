const serverless = require('serverless-http');
// var sql = require('serverless-mysql')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
// const Program= require('../Model/programs');
const SessionService = require('../Services/com-sessions');
//const  config = require('../dbconfig');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//  function for getting all products
app.get('/comSessions/pending', async (req, res) => {
  try {
      // let pool = await sql.connect(config);
      // const status  = req.params.sessionStatus;
      const allSessions = await SessionService.getAllPendingSession();
      const all= await allSessions;
      if (all) {
        return res.status(200).send(
          all
        )
      }
    } catch (error) {
       //  handle errors here
       console.log(error, "error!!");
    }
    	
  
  }),

  app.get('/comSessions/accepted', async (req, res) => {
    try {
        // let pool = await sql.connect(config);
        // const status  = req.params.sessionStatus;
        const allSessions = await SessionService.getAllAcceptedSession();
        const all= await allSessions;
        if (all) {
          return res.status(200).send(
            all
          )
        }
      } catch (error) {
         //  handle errors here
         console.log(error, "error!!");
      }
        
    
    }),
  app.delete('/comSessions/:sessionId', async(req, res) => {
    try {
        const Id  = req.params.sessionId;
        const program = await SessionService.deleteSession(Id);
        
        if (program) {
          return res.status(200).send(
            
          )
        }
      } catch (error) {
         //  handle errors here
         console.log(error, "error!!");
      }
        
    
    }),

    app.get('/comSessions/:sessionId', async(req, res) => {
      try {
          const Id  = req.params.sessionId;
          const Program = await SessionService.viewSession(Id);
          
          if ( Program) {
            return res.status(200).send(
              Program
            )
          }
        } catch (error) {
           //  handle errors here
           console.log(error, "error!!");
        }
          
      
      }),

//  function for creating a new product
 app.post('/comSessions', async (req, res) => {
  try {
  //await dbConnection();
   const data  = req.body;
   const {sessionTopic,sessionDate,sessionDesc,TargetGroup,companyId} = data;
  if(!data) {
     return "Please pass all required fields!"
  }
   const dataToSave = {sessionTopic,sessionDate,sessionDesc,TargetGroup,companyId,sessionId:uuidv4()};
   let createSession =  await SessionService.createSession(dataToSave);
   if (createSession) {
     return res.status(200).send(
      createSession
    )
   }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
 
}),

app.put('/comSessions/:sessionId', async (req, res) => {
  try {
  //await dbConnection();
  //  const data  = req.body;
  //  console.log(req.body);
  //  const {ProductName} = data;
  // if(!req.body) {
    //  return "Please pass all required fields!"
  // }
  //  const dataToSave = {ProductName};
   let updateProgram =  await SessionService.updateSession();
   if (updateProgram) {
     return res.status(200).send(
      updateProgram
    )
   }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
 
}),



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