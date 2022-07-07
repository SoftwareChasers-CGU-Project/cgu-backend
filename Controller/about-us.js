const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const AboutUs= require('../Model/about-us');
const AboutUsService = require('../Services/about-us');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

//  function for getting all programs
app.get('/about-us', async (req, res) => {
  try {
      const allAboutUs = await AboutUsService.getAllAboutUs();
      const all= await allAboutUs;
      if (all) {
        return res.status(200).send(
          all
        )
      }
    } catch (error) {
       console.log(error, "error!!");
    }
    	
  
  }),

  app.post('/about-us', async (req, res) => {
    try {
    const data  = req.body;
    const {title,aboutUsDescription} = data;
    if(!data) {
      return "Please pass all required fields!"
    }
    const dataToSave = {title,aboutUsDescription,ID:uuidv4()};
    let createAboutUs =  await AboutUsService.createAboutUs(dataToSave);
    if (createAboutUs) {
      return res.status(200).send(
        createAboutUs
      )
    }
    } catch (error) {
      console.log(error, "error!!");
    }
  
  })

  app.delete('/about-us/:ID', async(req, res) => {
    try {
        const Id  = req.params.ID;
        const aboutUs = await AboutUsService.deleteAboutUs(Id);
        
        if (aboutUs) {
          return res.status(200).send(
            
          )
        }
      } catch (error) {
         console.log(error, "error!!");
      }
        
    
    }),

    app.get('/about-us/:ID', async(req, res) => {
      try {
          const ID  = req.params.ID;
          const aboutUs = await AboutUsService.viewAboutUs(ID);
          
          if ( aboutUs) {
            return res.status(200).send(
              aboutUs
            )
          }
        } catch (error) {
           console.log(error, "error!!");
        }
          
      
    }),

    app.put('/about-us/:ID', async (req, res) => {
      try {
      console.log(req.body);
      const ID  = req.params.ID;
      if(!req.body) {
        return "Please pass all required fields!"
      }
      let updateAboutUs =  await AboutUsService.updateAboutUs({ID,...req.body});
      if (updateAboutUs) {
        return res.status(200).send(
          updateAboutUs
        )
      }
      } catch (error) {
        console.log(error, "error!!");
      }
 
    })


  module.exports.handler = serverless(app);