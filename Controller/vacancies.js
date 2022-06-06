const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const VacancyService = require('../Services/vacancies');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/vacancies/', async (req, res) => {
  try {
      const allVacancies = await VacancyService.getAllVacancies();  
      if (allVacancies)
       {
        return res.status(200).send({
            data: allVacancies   
        })    
      }
    } catch (error) {
       //  handle errors here
       console.log(error, "error!!");
    }
  }),

  app.get('/vacancies/pendingVacancy/', async (req, res) => {
    try {
        const allVacancies = await VacancyService.getPendingVacancies();  

        if (allVacancies)
         {
          return res.status(200).send({
              data: allVacancies   
          })
         
        }
      } catch (error) {
         //  handle errors here
         console.log(error, "error!!");
      }
    }),
    app.get('/vacancies/acceptedvacancy/', async (req, res) => {
      try {
          const allVacancies = await VacancyService.getAcceptedVacancies();  
         
          if (allVacancies)
           {
            return res.status(200).send({
                data: allVacancies   
            })
           
          }
        } catch (error) {
           //  handle errors here
           console.log(error, "error!!");
        }
      }),
        
  
  app.post('/vacancies/', async (req, res) => {
    try {
     const data  = req.body;
     const {companyName, companyEmail, vacancyTitle, vacancyDesc, closingDate, poster} = data;
   if(!data) {
       return "Please pass all required fields!"
    }
     const dataToVacancy = {companyName,companyEmail, vacancyTitle, vacancyDesc,closingDate,poster,VacancyId:uuidv4()};
     const dataToCompany = {companyEmail, companyName};
     console.log(dataToCompany);
     let createVacancy =  await VacancyService.createVacancy(dataToVacancy, dataToCompany);
     if (createVacancy) {
       return res.status(200).send(
        createVacancy
      )}
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  }),

  app.put('/vacancies/:vacancyId/', async (req, res) => {
    try {
      const vacancyId = req.params.vacancyId;
     
      console.log(vacancyId);
      const acceptvacancy = await VacancyService.acceptVacancy(vacancyId);
      // console.log(getvacancy);
      if(acceptvacancy) {
        return res.status(200).send({
          acceptvacancy
        })
      }
    } catch (error) {
       //  handle errors here
       console.log(error, "error!!");
    }
  }),
   

    app.get('/vacancies/:vacancyId/', async (req, res) => {
      try {
        const vacancyId = req.params.vacancyId;
  
        const getvacancy = await VacancyService.getVacancyById(vacancyId);
    
        // console.log(getvacancy);
        if(getvacancy) {
          return res.status(200).send({
             data: getvacancy
          })
        }
      } catch (error) {
         //  handle errors here
         console.log(error, "error!!");
      }
    }),

    app.delete('/vacancies/:vacancyId/', async (req, res) => {
      try {
        const vacancyId = req.params.vacancyId;
        const deletevacancy = await VacancyService.deleteVacancy(vacancyId);
    
        if(deletevacancy) {
          return res.status(200).send({
            deletevacancy
          })
        }
      } catch (error) {
         //  handle errors here
         console.log(error, "error!!");
      }
    }),

    app.post('/vacancies/cv/', async (req, res) => {
      try {
       const data  = req.body;
       const {vacancyId, undergrad_email} = data;
     if(!data) {
         return "Please pass all required fields!"
      }
       const dataToSave = {vacancyId, undergrad_email};
       let createCV =  await VacancyService.postCV(dataToSave);
       if (createCV) {
         return res.status(200).send(
          createCV
        )
       }
      } catch (error) {
        //  handle errors here
        console.log(error, "error!!");
      }
    })

    module.exports.handler = serverless(app);
