const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const ContactUs= require('../Model/contact-us');
const ContactUsService = require('../Services/contact-us');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer  = require('multer');
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
app.get('/contact-us', async (req, res) => {
  try {
      const allContacts = await ContactUsService.getAllContacts();
      const all= await allContacts;
      if (all) {
        return res.status(200).send(
          all
        )
      }
    } catch (error) {
       console.log(error, "error!!");
    }
    	
  
  }),

  app.post('/contact-us',verifyToken, async (req, res) => {
    try {
    const data  = req.body;
    const {NameOf,Title,Email,Faculty,PhNum} = data;
    if(!data) {
      return "Please pass all required fields!"
    }
    const dataToSave = {NameOf,Title,Email,Faculty,PhNum,ID:uuidv4()};
    let createContactUs =  await ContactUsService.createContactUs(dataToSave);
    if (createContactUs) {
      return res.status(200).send(
        createContactUs
      )
    }
    } catch (error) {
      console.log(error, "error!!");
    }
  
  })

  app.delete('/contact-us/:ID',verifyToken, async(req, res) => {
    try {
        const ID  = req.params.ID;
        const ContactUs = await ContactUsService.deleteContacts(ID);
        
        if (ContactUs) {
          return res.status(200).send(
            
          )
        }
      } catch (error) {
         console.log(error, "error!!");
      }
        
    
    }),

    app.get('/contact-us/:ID', async(req, res) => {
      try {
          const ID  = req.params.ID;
          const ContactUs = await ContactUsService.viewContacts(ID);
          
          if ( ContactUs) {
            return res.status(200).send(
                ContactUs
            )
          }
        } catch (error) {
           console.log(error, "error!!");
        }
          
      
    }),

    app.put('/contact-us/:ID',verifyToken, async (req, res) => {
      try {
      console.log(req.body);
      const ID  = req.params.ID;
      if(!req.body) {
        return "Please pass all required fields!"
      }
      let updateContactUs =  await ContactUsService.updateContacts({ID,...req.body});
      if (updateContactUs) {
        return res.status(200).send(
            updateContactUs
        )
      }
      } catch (error) {
        console.log(error, "error!!");
      }
 
    })

    app.get('/contact-us/Faculty/:Faculty', async (req, res) => {
      try {
        const Faculty = req.params.Faculty;
        console.log(Faculty);
    
        if(Faculty == "CGU")
        {
            const CGUContacts = await ContactUsService.getCGUContacts();  
            if (CGUContacts) {
              return res.status(200).send(
                CGUContacts   
            )
            }
          }
        else if(Faculty == "IT"){
            const ITContacts = await ContactUsService.getITContacts();  
            if (ITContacts) {
              return res.status(200).send(
                ITContacts   
              )
            }
        }
        else if(Faculty == "Architecture"){
          const ArchiContacts = await ContactUsService.getArchiContacts();  
          if (ArchiContacts) {
            return res.status(200).send(
              ArchiContacts   
            )
          }
      }
      else if(Faculty == "Engineering"){
        const EngContacts = await ContactUsService.getEngContacts();  
        if (EngContacts) {
          return res.status(200).send(
            EngContacts   
          )
        }
    }
        else if(Faculty == "false"){
          const Contacts = await ContactUsService.getAllContacts();  
          if (Contacts) {
            return res.status(200).send(
              Contacts   
            )
          }
        }
      } catch (error) {
          console.log(error, "error!!");
      }
    });


  module.exports.handler = serverless(app);