const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const Program= require('../Model/programs');
const NewsService = require('../Services/news');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

//  function for getting all programs
app.get('/news', async (req, res) => {
  try {
      const allPrograms = await NewsService.getAllNews();
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

  app.post('/news', async (req, res) => {
    try {
    const data  = req.body;
    const {news_image,add_date,title,descriptipn} = data;
    if(!data) {
      return "Please pass all required fields!"
    }
    const dataToSave = {news_image,add_date,title,descriptipn,news_id :uuidv4()};
    let createProgram =  await NewsService.createNews(dataToSave);
    if (createProgram) {
      return res.status(200).send(
        createProgram
      )
    }
    } catch (error) {
      console.log(error, "error!!");
    }
  
  })

  module.exports.handler = serverless(app);