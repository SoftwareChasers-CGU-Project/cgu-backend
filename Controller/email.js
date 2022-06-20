const serverless = require('serverless-http');
const nodemailer = require("nodemailer");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();
// const ConsultationService = require('../Services/consultation');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//CORS headers middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

module.exports.sendEmail = async (event) => {
        
    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "eb864cbd20d837",
          pass: "13ae191c4f4600"
        }
      });
   
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <cgu.uom22@gmail.com>', 
      to: "nipuninuwanthika20@gmail.com",
      subject: "Regarding the Consultation Session", 
      text: "We have recieved your request to have a Mockup Interview  With Dr. Menaka Jayasooriya. We have Scheduled a Mockup Interview on 20th June 2022, at 10.00 AM.",
      html: "<b>Dear, Lakshani</b><p>We have recieved your request to have a Mockup Interview  With Dr. Menaka Jayasooriya. We have Scheduled a Mockup Interview on 20th June 2022, at 10.00 AM. </p><p>Yours Sincerely, <br> Mrs. kumari Gamage<br>Career Guidance Unit, <br>University of Moratuwa</p>",
    });
   
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        data: {
            input: event,
            messageId: info.messageId,
            previewURL: nodemailer.getTestMessageUrl(info)
        },
      },
      null,
      2
    ),
  };
};
