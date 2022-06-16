const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();


const UserService = require('../Services/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//create a user
app.post('/users/', async (req, res) => {
    try {
       const data  = req.body;
       const { email, undergradFName, undergradLName,faculty, batch, undergradPassword,phone_number} = data;

           if(!data) {
               return "Please pass all required fields!"
            }
  
       const dataToSaveUser = {email,phone_number};
       const dataToSaveUnderg = {email,undergradFName, undergradLName,faculty,batch, undergradPassword};

       let createUser=  await UserService.createUser(dataToSaveUser);
       let createUnderg=  await UserService.createUndergraduate(dataToSaveUnderg);
    
        if (createUnderg) {
            res.status(200).json({status : true, msg : "Success"});
               createUnderg
        }

        else{
            res.status(422).json({status : false, msg : "False"});
         }
    }
    catch (error) {
       console.log(error, "error!!");
    }    
}),



// app.get('/users/check/:email/', async (req, res) => {
//     try {
//       const email = req.params.email;
//       const checkUser = await UserService.checkUser(email);
  
//       if(checkUser) {
//         return res.status(200).send({
//            data : checkUser
//         })
//       }
//     } catch (error) {
//        //  handle errors here
//        console.log(error, "error!!");
//     }
//   })


module.exports.handler = serverless(app);