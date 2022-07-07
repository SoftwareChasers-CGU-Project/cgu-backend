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
          user: "81b84593f18680",
          pass: "0f368be67351ed"
        }
      });
   
    let info = await transporter.sendMail({
      from: '"Career Guidence Unit, Unversity of Moratuwa" <cgu.uom22@gmail.com>', 
      to: "99x.info@gmail.com",
      subject: "Regarding publishing vacancies in website of Career Guidence Unit of University of Moratuwa", 
      text: "Thank you for sending us your vacancy. We have published your vacancy on our website. We will send you the details of applicants in future.",
      html: "<b>Dear Sir/Madam, </b><p>Thank you for sending us your vacancy. We have published your vacancy on our website. We will send you the details of applicants in future.</p><p>Yours Sincerely, <br> Mrs. kumari Gamage<br>Career Guidance Unit, <br>University of Moratuwa</p>",
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