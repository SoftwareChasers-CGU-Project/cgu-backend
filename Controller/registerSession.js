const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const Program= require('../Model/registerSession');
const RegisterSessionService = require('../Services/registerSession');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

    app.get('/registerSession/:eventId', async(req, res) => {
      try {
          const Id  = req.params.eventId;
          
          const Program = await RegisterSessionService.getUndergraduates(Id);
          
          if ( Program) {
            return res.status(200).send(
              Program
            )
          }
        } catch (error) {
           console.log(error, "error!!");
        }
          
      
    }),

 

    app.post('/registerSession', async (req, res) => {
      try {
        let registerSession =  await RegisterSessionService.addRegisterSession(req.body);
        if (registerSession) {
          res.status(200).json({status : true, msg : "Success"});
          registerSession
          
        }
        else{
          res.status(422).json({status : false, msg : "False"});
        } }
      catch (error) {
        console.log(error, "error!!");
      }
    
    })



module.exports.handler = serverless(app);

































// app.get("/", async(req, res) => {

//   let sql = `SELECT * from products`;

//   let query = mysql.query(sql, (err) => {

//     if (err) {

//       throw err;

//     }

//     if (query) {
//       return res.status(200).send({
//         data: query
//       })
//     }
   

//   });

// }),



// app.post("/", (req, res) => {

  // let post = { name: "Jake Smith", description: "Chief Executive Officer" };
  // const data  = req.body;
  // const {ProductName} = data;
  // const dataToSave = {ProductName,Id:uuidv4()};
  // if(!data) {
  //    return "Please pass all required fields!"
  // }


  // let sql = "INSERT INTO products SET ?";

  // let query = mysql.query(sql, dataToSave, (err) => {

  // let sql = `INSERT INTO products (Id, ProductName) values (dataToSave`;

  // let query = mysql.query(sql, (err) => {

//     if (err) {

//       throw err;

//     }

//     if (query) {
//       return res.status(200).send({
//         data: query
//       })
//     }

//   });

// });