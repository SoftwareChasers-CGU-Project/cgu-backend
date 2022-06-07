const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const ConsultationService = require('../Services/consultation');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//CORS headers middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//  function for creating a new consultant
 app.post('/consultationReq/add', async (req, res) => {
  try {
   const data  = req.body;
   console.log("data");
   const {undergraduate_email} = data;
  if(!data) {
     return "Please pass all required fields!"
  }
   const dataToSave = {undergraduate_email,consultation_id:uuidv4()};
   let createConsultationReq =  await ConsultationService.createConsultationReq(dataToSave);
   if (createConsultationReq) {
     return res.status(200).send(
        createConsultationReq
    )
   }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
 
}),

//  function for getting all consultation requests
app.get('/consultation-Requests/list', async (req, res) => {
  try {
      const allRequests = await ConsultationService.getPendingRequests();
      const all= await allRequests;
      if (all) {
        return res.status(200).send({
            data: all
        })
      }
    } catch (error) {
       //  handle errors here
       console.log(error, "error!!");
    }
  }),

  app.get('/scheduled-sessions/list', async (req, res) => {
    try {

        const allScheduledSessions = await ConsultationService.getScheduledSessions();  
        const all= await allScheduledSessions;
        if (all)
         {
          return res.status(200).send({
              data: all   
          })
         
        }
      } catch (error) {
         //  handle errors here
         console.log(error, "error!!");
      }
    }),

module.exports.handler = serverless(app);