const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const Session= require('../Model/programs');
const SessionService = require('../Services/com-sessions');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//  function for getting all pending sessions
app.get('/comSessions/pending', async (req, res) => {
  try {
      const allSessions = await SessionService.getAllPendingSession();
      const all= await allSessions;
      if (all) {
        return res.status(200).send(
          all
        )
      }
    } catch (error) {
       console.log(error, "error!!");
    }
    	
  
  }),

  //  function for getting all accepted sessions
  app.get('/comSessions/accepted', async (req, res) => {
    try {
        const allSessions = await SessionService.getAllAcceptedSession();
        const all= await allSessions;
        if (all) {
          return res.status(200).send(
            all
          )
        }
      } catch (error) {
         console.log(error, "error!!");
      }
        
    
    }),

   //  function for getting all delete sessions
  app.delete('/comSessions/:sessionId', async(req, res) => {
    try {
        const Id  = req.params.sessionId;
        const session = await SessionService.deleteSession(Id);
        
        if (session) {
          return res.status(200).send(
            
          )
        }
      } catch (error) {
         console.log(error, "error!!");
      }
        
    
    }),

    //  function for viewing a session
    app.get('/comSessions/:sessionId', async(req, res) => {
      try {
          const Id  = req.params.sessionId;
          const session = await SessionService.viewSession(Id);
          
          if ( session) {
            return res.status(200).send(
              session
            )
          }
        } catch (error) {
           console.log(error, "error!!");
        }
          
      
      }),

 //  function for creating a new session
 app.post('/comSessions', async (req, res) => {
  try {
   const data  = req.body;
   const {sessionTopic,sessionDate,sessionDesc,TargetGroup,companyName,companyEmail} = data;
  if(!data) {
     return "Please pass all required fields!"
  }

  // companyId:uuidv4();
  const dataToSaveCompany = {companyName,companyEmail};
  const dataToSaveSession = {sessionTopic,sessionDate,sessionDesc,TargetGroup,companyEmail,sessionId:uuidv4()};

  let createCompany =  await SessionService.createCompany(dataToSaveCompany);
  let createSession =  await SessionService.createSession(dataToSaveSession);
   if (createCompany) {
     return res.status(200).send(
      createCompany
    )
  }
  
  

  


   if (createSession) {
     return res.status(200).send(
      createSession
    )
   } 
  } catch (error) {
    console.log(error, "error!!");
  }

  }),

  //  function for update a session
  app.put('/comSessions/:sessionId', async (req, res) => {
    try {
      
    let updateSession =  await SessionService.updateSession(req.params);
    if (updateSession) {
      return res.status(200).send(
        updateSession
      )
    }
    } catch (error) {
      console.log(error, "error!!");
    }
  
  }),

  app.get('/company/:companyEmail', async(req, res) => {
    try {
        const Id  = req.params.companyEmail;
        const company = await SessionService.viewCompany(Id);
        
        if (company) {
          return res.status(200).send(
            company
          )
        }
      } catch (error) {
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