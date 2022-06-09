const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const News= require('../Model/news');
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
    const {newsDate,title,newsDescription} = data;
    if(!data) {
      return "Please pass all required fields!"
    }
    const dataToSave = {newsDate,title,newsDescription,newsID :uuidv4()};
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

  app.delete('/news/:newsId', async(req, res) => {
    try {
        const Id  = req.params.newsId;
        const news = await NewsService.deleteNews(Id);
        
        if (news) {
          return res.status(200).send(
            
          )
        }
      } catch (error) {
         console.log(error, "error!!");
      }
        
    
    }),

    app.get('/news/:newsId', async(req, res) => {
      try {
          const Id  = req.params.newsId;
          const news = await NewsService.viewNews(Id);
          
          if ( news) {
            return res.status(200).send(
              news
            )
          }
        } catch (error) {
           console.log(error, "error!!");
        }
          
      
    }),

    app.put('/news/:newsId', async (req, res) => {
      try {
      console.log(req.body);
      const newsID  = req.params.newsId;
      if(!req.body) {
        return "Please pass all required fields!"
      }
      let updateNews =  await NewsService.updateNews({newsID,...req.body});
      if (updateNews) {
        return res.status(200).send(
          updateNews
        )
      }
      } catch (error) {
        console.log(error, "error!!");
      }
 
    })


  module.exports.handler = serverless(app);