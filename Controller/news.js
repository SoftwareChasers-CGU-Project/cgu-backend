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
app.get('/news', async (req, res) => {
  try {
      const allProgrammes = await NewsService.getAllNews();
      const all= await allProgrammes;
      if (all) {
        return res.status(200).send(
          all
        )
      }
    } catch (error) {
       console.log(error, "error!!");
    }
    	
  
  }),

  app.post('/news',verifyToken, async (req, res) => {
    try {
    const data  = req.body;
    const {newsDate,title,newsDescription,newsCate} = data;
    if(!data) {
      return "Please pass all required fields!"
    }
    const dataToSave = {newsDate,title,newsDescription,newsCate,newsID:uuidv4()};
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

  app.delete('/news/:newsId',verifyToken, async(req, res) => {
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

    app.put('/news/:newsID',verifyToken, async (req, res) => {
      try {
      console.log(req.body);
      const newsID  = req.params.newsID;
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

    app.get('/news/newsCate/:newsCate', async (req, res) => {
      try {
        const newsCate = req.params.newsCate;
        console.log(newsCate);
    
        if(newsCate == "CGU")
        {
            const DepartmentEvents = await NewsService.getCGUNews();  
            if (DepartmentEvents) {
              return res.status(200).send(
                DepartmentEvents   
            )
            }
          }
        else if(newsCate == "Company"){
            const CGUEvents = await NewsService.getCompanyNews();  
            if (CGUEvents) {
              return res.status(200).send(
                CGUEvents   
              )
            }
        }
        else if(newsCate == "false"){
          const Programs = await NewsService.getAllNews();  
          if (Programs) {
            return res.status(200).send(
              Programs   
            )
          }
        }
      } catch (error) {
          console.log(error, "error!!");
      }
    });


  module.exports.handler = serverless(app);