const serverless = require('serverless-http');
const express = require('express');
const nodemailer = require("nodemailer");
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const Session= require('../Model/com-sessions');
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

  app.get('/comSessions/past', async (req, res) => {
    try {
      const allPrograms = await SessionService.getAllPastComsessions();
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

  app.delete('/comSessions/:sessionId', async(req, res) => {
    try {
        const data  = req.body;
        const {sessionId,reason} = data;
        let email=await  SessionService.getEmail(sessionId);
        const session = await SessionService.deleteSession(sessionId);

      
        console.log(email[0].companyEmail)
        var transporter = nodemailer.createTransport({
                  host: "smtp.mailtrap.io",
                  port: 2525,
                  auth: {
                    user: "8030025c130717",
                    pass: "92144cf4b2d238"
                  }
                });
             
                
              let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <cgu.uom22@gmail.com>', 
                to:email[0].companyEmail,
                subject:"Regarding the session Request | "+ email[0].sessionTopic, 
                text:reason,
                html: "<p>Dr madam/sir,</p><p>Your session request to conduct a session on " + email[0].sessionTopic +" was rejected by the Career Guidance Unit of university of Moratuwa.<p><b>The reason for rejecting session:</b></p>"+ reason+"<p>For more details contact the career guidance unit of University of Moratuwa.</p><p>Thank you</p>Career Guidance Unit,<br><p>University of Moratuwa</p>",
              });
        
              return res.status(200).send(
                
              )
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

  //function for creating a new session
  app.post('/comSessions', async (req, res) => {
    try {
    const data  = req.body;
    const {sessionTopic,sessionDate,sessionTime,sessionDesc,TargetGroup,companyName,companyEmail} = data;
    if(!data) {
      return "Please pass all required fields!"
    }

    const dataToSaveCompany = {companyName,companyEmail};
    const dataToSaveSession = {sessionTopic,sessionDate,sessionTime,sessionDesc,TargetGroup,companyEmail,sessionId:uuidv4()};

    let createCompany =  await SessionService.createCompany(dataToSaveCompany);
    if(createCompany==undefined){
      res.status(422).json({status : false, msg : "False"});
      return;
    }
    let createSession =  await SessionService.createSession(dataToSaveSession);
    if (createSession) {
      return res.status(200).send(
      createSession
    )
    } 
   
    if (createCompany && createSession) {
      res.status(200).json({status : true, msg : "Success"});

      
    }else{
      res.status(422).json({status : false, msg : "False"});
      return;
    }
    } catch (error) {
      console.log(error, "error!!");
    }

  }),

  // function for update a session
  app.put('/comSessions/:sessionId', async (req, res) => {
    try {
      
    let updateSession =  await SessionService.updateSession(req.params.sessionId);
    
    let email=await  SessionService.getEmail(req.params.sessionId);
    console.log(email[0].companyEmail)
    var transporter = nodemailer.createTransport({
              host: "smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "8030025c130717",
                pass: "92144cf4b2d238"
              }
            });
         
          let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <cgu.uom22@gmail.com>', 
            to:email[0].companyEmail,
            subject: "Regarding the session Request | "+ email[0].sessionTopic, 
            text: "Dr madam/sir",
            html: "<p>Dr madam/sir,</p><p>Your session request to conduct a session on " + email[0].sessionTopic +" was accepetd by the Career Guidance Unit of university of Moratuwa.</p><p>Thank you</p>Career Guidance Unit,<br><p>University of Moratuwa</p>" ,
          });
      
      return res.status(200).send(
        updateSession
      )
  ``} catch (error) {
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