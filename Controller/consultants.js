const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const ConsultantService = require('../Services/consultants');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//CORS headers middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//  function for getting all consultants
app.get('/consultants/list', async (req, res) => {
  try {
      const allConsultants = await ConsultantService.getAllConsultants();
      const all= await allConsultants;
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



//  function for creating a new consultant
 app.post('/consultants/add', async (req, res) => {
  try {
   const data  = req.body;
   const {consultantFName,consultantLName,universityName, post, email} = data;
  if(!data) {
     return "Please pass all required fields!"
  }
   const dataToSave = {consultantFName,consultantLName,universityName, post, email,consultantId:uuidv4()};
   let createConsultant =  await ConsultantService.createConsultant(dataToSave);
   if (createConsultant) {
     return res.status(200).send(
      createConsultant
    )
   }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
 
}),

//  function for getting a  consultant by Id
app.get('/consultants/view/:consultantId/', async (req, res) => {
  try {
    const {consultantId} = req.params;
    const getConsultant = await ConsultantService.getConsultantById({consultantId});
    
    if(getConsultant) {
      return res.status(200).send({
        data: getConsultant
      })
    }
  } catch (error) {
     //  handle errors here
     console.log(error, "error!!");
  }
  
}),

//fuction for deleting a consultant
app.delete('/consultants/delete/:consultantId/', async (req, res) => {
  try {
    const {consultantId} = req.params;
    const DeleteConsultant = await ConsultantService.deleteConsultant({consultantId});
    
    if(DeleteConsultant) {
      return res.status(200).send({
        data: DeleteConsultant
      })
      console.log("data");
    }
  } catch (error) {
     //  handle errors here
     console.log(error, "error!!");
  }
  
}),

app.put('/consultants/update/:consultantId/', async (req, res) => {
  try {
   const data  = req.body;
   console.log(data);
   const {consultantFName,consultantLName,universityName, post, email,consultantId} = data;
  if(!data) {
     return "Please pass all required fields!"
  }
   const dataToSave = {consultantFName,consultantLName,universityName, post, email,consultantId};
   let updateConsultant =  await ConsultantService.updateConsultant(dataToSave);
   console.log(dataToSave);
   if (updateConsultant) {
     return res.status(200).send(
      updateConsultant
    )
   }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
 
});

module.exports.handler = serverless(app);