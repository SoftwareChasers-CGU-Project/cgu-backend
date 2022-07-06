const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const ConsultantService = require('../Services/consultants');
var jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//CORS headers middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized");
  }

  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized");
  }

  let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (payload.role == 'Admin' || payload.role == 'MainAdmin') {
    next();
  } else {
    return res.status(401).send("Unauthorized");
  }
}


//  function for getting all consultants
app.get('/consultants/list', verifyToken, async (req, res) => {
  try {
    const allConsultants = await ConsultantService.getAllConsultants();
    const all = await allConsultants;
    if (all) {
      return res.status(200).send({
        data: all
      })
    }
  } catch (error) {
    console.log(error, "error!!");
  }
}),


  //  function for creating a new consultant
  app.post('/consultants/add', verifyToken, async (req, res) => {
    try {
      const data = req.body;
      const { consultantFName, consultantLName, universityName, post, email } = data;
      if (!data) {
        return "Please pass all required fields!"
      }
      const dataToSave = { consultantFName, consultantLName, universityName, post, email, consultantId: uuidv4() };
      let createConsultant = await ConsultantService.createConsultant(dataToSave);
      if (createConsultant) {
        res.status(200).json({ status: true, msg: "Consultant Added" });
        createConsultant

      }
      else {
        res.status(422).json({ status: false, msg: "Error" });
      }
    } catch (error) {
      console.log(error, "error!!");
    }

  }),

  //  function for getting a  consultant by Id
  app.get('/consultants/view/:consultantId/', verifyToken, async (req, res) => {
    try {
      const { consultantId } = req.params;
      const getConsultant = await ConsultantService.getConsultantById({ consultantId });

      if (getConsultant) {
        return res.status(200).send({
          data: getConsultant
        })
      }
    } catch (error) {
      console.log(error, "error!!");
    }

  }),

  //fuction for deleting a consultant
  app.delete('/consultants/delete/:consultantId/', verifyToken, async (req, res) => {
    try {
      const { consultantId } = req.params;
      const DeleteConsultant = await ConsultantService.deleteConsultant({ consultantId });

      if (DeleteConsultant) {
        return res.status(200).send({
          data: DeleteConsultant,
          message:"Consultant Deleted"
        })
      }
    } catch (error) {
      console.log(error, "error!!");
    }

  }),

  app.put('/consultants/update/:consultantId/', verifyToken, async (req, res) => {
    try {
      const data = req.body;
      const consultantId = req.params.consultantId;
      const { consultantFName, consultantLName, universityName, post, email } = data;
      if (!data) {
        return "Please pass all required fields!"
      }
      const dataToSave = { consultantFName, consultantLName, universityName, post, email, consultantId };
      let updateConsultant = await ConsultantService.updateConsultant(dataToSave);
      if (updateConsultant) {
        return res.status(200).send(
          updateConsultant
        )
      }
    } catch (error) {
      console.log(error, "error!!");
    }

  });


//get consultants list to main website
app.get('/consultants', async (req, res) => {
  try {
    const allConsultants = await ConsultantService.getAllConsultants();
    const all = await allConsultants;
    if (all) {
      return res.status(200).send({
        data: all
      })
    }
  } catch (error) {
    console.log(error, "error!!");
  }
}),

  module.exports.handler = serverless(app);