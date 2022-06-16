const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// const Admin= require('../Model/admins');
const AdminService = require('../Services/admins');
const UserService = require('../Services/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer  = require('multer');

//Register a new admin
app.post('/admins', async (req, res) => {
    try {
      const data  = req.body;
      const {adminFName,adminLName,email,adminPassword,phone_number} = data;
       if(!data) {
          return "Please pass all required fields!"
       }
      const dataToSaveUser = {email,phone_number};
      const dataToSaveAdmin = {email,adminFName,adminLName,adminPassword};

      let createUser=  await UserService.createUser(dataToSaveUser);
      let createAdmin=  await AdminService.createAdmin(dataToSaveAdmin);

      
      if (createAdmin) {
        res.status(200).json({status : true, msg : "Success"});
            createAdmin
      }

      else{
        res.status(422).json({status : false, msg : "False"});
     }
}
catch (error) {
   console.log(error, "error!!");
}    
}),

//get all administrators
app.get('/admins/', async (req, res) => {
    try {
        const AllAdmins = await AdminService.getAllAdmins();  
        if (AllAdmins)
         {
          return res.status(200).send({
              data: AllAdmins   
          }) 
         }
    }catch (error) {
         //  handle errors here
         console.log(error, "error!!");
    }
})

module.exports.handler = serverless(app);
