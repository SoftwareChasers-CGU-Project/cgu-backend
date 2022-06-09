const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const Program= require('../Model/registerEvent');
const RegisterService = require('../Services/registerEvent');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

    app.get('/registerEvent/:eventId', async(req, res) => {
      try {
          const Id  = req.params.eventId;
          const underGrads = await RegisterService.getUndergraduates(Id);
          
          if ( underGrads) {
            return res.status(200).send(
              underGrads
            )
          }
        } catch (error) {
           console.log(error, "error!!");
        }
          
      
    }),


    app.post('/registerEvent', async (req, res) => {
      // console.log(req.body);
      try {
        let registerEvent =  await RegisterService.addRegisterEvent(req.body);
        if (registerEvent) {
          res.status(200).json({status : true, msg : "Success"});
            registerEvent
          
        }
        else{
          res.status(422).json({status : false, msg : "False"});
        } }
      catch (error) {
        console.log(error, "error!!");
      }
    
    })

    
    

module.exports.handler = serverless(app);












































// app.post('/registerEvent', async (req, res) => {
//   console.log(req.body);
  // if(req.body.email == "abc"){
  //   res.status(200).json({status : true, msg : "Success"});

  // }else{
  //   res.status(422).json({status : false, msg : "False"});

  // }
  // return "Please pass all required fields!";

  //try {
  // const data  = req.body;
  // const {eventId,undergradEmail} = data;
  // if(!data) {
  //   return "Please pass all required fields!"
  // }
  // const dataToSave = req.body;
//   let createProgram =  await RegisterService.addRegisterEvent(req.body);
//   if (createProgram) {
//     res.status(200).json({status : true, msg : "Success"});
//       createProgram
    
//   }
// else{
//     res.status(422).json({status : false, msg : "False"});
//   } }
//   catch (error) {
//     console.log(error, "error!!");
//   }

// })



































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