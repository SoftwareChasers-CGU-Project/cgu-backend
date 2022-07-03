const serverless = require("serverless-http");
const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const app = express();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
uuidv4();
const VacancyService = require("../Services/vacancies");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function verifyToken(req, res, next) {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized");
  }

  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token === "null") {
    return res.status(401).send("Unauthorized");
  }

  let payload = jwt.verify(token, "adminccu");
  if (!payload) {
    return req.status(401).send("Unauthorized");
  }
  // req.userId=payload.subject
  next();
}


//get all linkdin profile links
app.get("/vacancies/apply", async (req, res) => {
  try {
    const allLinks = await VacancyService.getAllLinks();

    if (allLinks) {
      return res.status(200).send({
        data: allLinks,
      });
    }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
}),

  //get all vacancies
  app.get("/vacancies/", async (req, res) => {
    try {
      const allVacancies = await VacancyService.getAllVacancies();
      if (allVacancies) {
        return res.status(200).send({
          data: allVacancies,
        });
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  }),

  //get all pending vacancies
  app.get("/vacancies/pendingVacancy/", async (req, res) => {
    try {
      const allVacancies = await VacancyService.getPendingVacancies();

      if (allVacancies) {
        return res.status(200).send({
          data: allVacancies,
        });
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  }),

  //get all accepted vacancies
  app.get("/vacancies/acceptedvacancy/", async (req, res) => {
    try {
      const allVacancies = await VacancyService.getAcceptedVacancies();

      if (allVacancies) {
        return res.status(200).send({
          data: allVacancies,
        });
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  }),

   //get all accepted vacancies in main website
  app.get("/vacancies/acceptedvacancies/", async (req, res) => {
    try {
      const allVacancies = await VacancyService.getAcceptedVacancies();

      if (allVacancies) {
        return res.status(200).send({
          data: allVacancies,
        });
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  }),

  //post a vacancy
  app.post("/vacancies/", async (req, res) => {
    try {
      const data = req.body;
      const {
        companyName,
        companyEmail,
        vacancyTitle,
        vacancyType,
        contractType,
        location,
        vacancyDesc,
        closingDate,
      } = data;
      if (!data) {
        return "Please pass all required fields!";
      }
      const dataToVacancy = {
        companyName,
        companyEmail,
        vacancyTitle,
        vacancyType,
        contractType,
        location,
        vacancyDesc,
        closingDate,
        VacancyId: uuidv4(),
      };
      const dataToCompany = { companyEmail, companyName };

      let createVacancy = await VacancyService.createVacancy(
        dataToVacancy,
        dataToCompany
      );
      if (createVacancy) {
        return res.status(200).send(createVacancy);
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  }),

  //Accept a vacancy
  app.put("/vacancies/:vacancyId/", async (req, res) => {
    try {
      const vacancyId = req.params.vacancyId;
      const acceptvacancy = await VacancyService.acceptVacancy(vacancyId);
      let email = await VacancyService.getEmail(vacancyId);
      console.log(email[0].companyEmail);

      var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "81b84593f18680",
          pass: "0f368be67351ed",
        },
      });

      let info = await transporter.sendMail({
        from: '"Career Guidence Unit, Unversity of Moratuwa" <cgu.uom22@gmail.com>',
        to: email[0].companyEmail,
        subject:
          "Regarding publishing a vacancy on website of Career Guidence Unit of University of Moratuwa",
        text: "Dear Sir/Madam",
        html:
          "<p>Dear Sir/Madam,</p>Thank you for sending us your vacancy. We have published your vacancy of " +
          email[0].vacancyTitle +
          " on our website. We will send you the details of applicants in future.</p><p>Yours Sincerely, <br> Mrs. kumari Gamage,<br>Career Guidance Unit, <br>University of Moratuwa",
      });

      if (acceptvacancy) {
        return res.status(200).send({
          data: acceptvacancy,
        });
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  }),

  //get a vacancy by Id
  app.get("/vacancies/:vacancyId/", async (req, res) => {
    try {
      const vacancyId = req.params.vacancyId;
      const getvacancy = await VacancyService.getVacancyById(vacancyId);

      if (getvacancy) {
        return res.status(200).send({
          data: getvacancy,
        });
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  }),

  //delete a vacancy
  app.delete("/vacancies/:vacancyId/", async (req, res) => {
    try {
      const vacancyId = req.params.vacancyId;

      let email = await VacancyService.getEmail(vacancyId);
      console.log(email.companyEmail);

      var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "81b84593f18680",
          pass: "0f368be67351ed",
        },
      });

      let info = await transporter.sendMail({
        from: '"Career Guidence Unit, Unversity of Moratuwa" <cgu.uom22@gmail.com>',
        to: email[0].companyEmail,
        subject:
          "Regarding publishing a vacancy on website of Career Guidence Unit of University of Moratuwa",
        text: "Dear Sir/Madam",
        html:
          "<p>Dear Sir/Madam,</p><p>Your request to publish a vacancy of " +
          email[0].vacancyTitle +
          " was rejected by the Career Guidance Unit of University of Moratuwa because of a unavoidable reason.For more details please contact the career guidance unit of University of Moratuwa.</p><p>Yours Sincerely, <br> Mrs. kumari Gamage<br>Career Guidance Unit, <br>University of Moratuwa",
      });
      
      const deletevacancy = await VacancyService.deleteVacancy(vacancyId);

      if (deletevacancy) {
        return res.status(200).send({
          deletevacancy,
        });
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  }),
  
  //delete an accepted vacancy
  app.delete("/vacancies/delete/:vacancyId/", async (req, res) => {
    try {
      const vacancyId = req.params.vacancyId;
      console.log(vacancyId);

      const deleteapplyvacancies = await VacancyService.deleteApplyVacancies(vacancyId);
      const deletevacancy = await VacancyService.deleteVacancy(vacancyId);

      if (deletevacancy) {
        return res.status(200).send({
          deletevacancy,
        });
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  }),

  //apply for a vacancy
  app.post("/vacancies/apply/", async (req, res) => {
    try {
      const data = req.body;
      const { vacancyId, undergrad_email, linkedin } = data;
      if (!data) {
        return "Please pass all required fields!";
      }
      const dataToSave = { vacancyId, undergrad_email, linkedin, id: uuidv4() };
      let apply = await VacancyService.applyVacancy(dataToSave);
      if (apply) {
        return res.status(200).send(apply);
      } else {
        res.status(422).json({ status: false, msg: "False" });
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  }),

  //filter vacancies
  app.get("/vacancies/filterVacancies/:vacancyType/", async (req, res) => {
    try {
      const vacancyType = req.params.vacancyType;

      if (vacancyType == "Private") {
        const privateVacancies = await VacancyService.getPrivateVacancies();
        if (privateVacancies) {
          return res.status(200).send({
            data: privateVacancies,
          });
        }
      } else if (vacancyType == "Government") {
        const governmentVacancies =
          await VacancyService.getGovernmentVacancies();
        if (governmentVacancies) {
          return res.status(200).send({
            data: governmentVacancies,
          });
        }
      } else if (vacancyType == "NGO") {
        const ngoVacancies = await VacancyService.getNgoVacancies();
        if (ngoVacancies) {
          return res.status(200).send({
            data: ngoVacancies,
          });
        }
      } else if (vacancyType == "Internship") {
        const intrnshipVacancies =
          await VacancyService.getInternshipVacancies();
        if (intrnshipVacancies) {
          return res.status(200).send({
            data: intrnshipVacancies,
          });
        }
      } else if (vacancyType == "Volunteer") {
        const volunteerVacancies = await VacancyService.getVolunteerVacancies();
        if (volunteerVacancies) {
          return res.status(200).send({
            data: volunteerVacancies,
          });
        }
      } else {
        const acceptedVacancies = await VacancyService.getAcceptedVacancies();
        if (acceptedVacancies) {
          return res.status(200).send({
            acceptedVacancies,
          });
        }
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  }),

  //Send linkedin profiles to companies
  app.get("/vacancies/applyVacancies/:id/", async (req, res) => {
    try {
      const linkedin = req.params.id;
      console.log(linkedin);
      let details = await VacancyService.getProfileDetails(linkedin);
      console.log(details[0].linkedin);

      var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "81b84593f18680",
          pass: "0f368be67351ed",
        },
      });

      let info = await transporter.sendMail({
        from: '"Career Guidence Unit, Unversity of Moratuwa" <cgu.uom22@gmail.com>',
        to: details[0].companyEmail,
        subject:
          "Regarding the vacancy published on website of Career Guidence Unit of University of Moratuwa",
        text: "Dear Sir/Madam",
        html:
          "<p>Dear Sir/Madam,</p>Thank you for sending us your vacancy. This applicant named " +
          details[0].fullname +
          " have applied for your vacancy of " +
          details[0].vacancyTitle +
          ' published on our website. Herewith, I have attached the LinkedIn profile Link of the undergraduate.<br><br>Linkedin Profile Link: <a href="details[0].linkedin">' +
          details[0].linkedin +
          "</a></p><p>Yours Sincerely, <br> Mrs. kumari Gamage<br>Career Guidance Unit, <br>University of Moratuwa</p>",
      });

      if (details) {
        return res.status(200).send({
          data: details,
        });
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  });

module.exports.handler = serverless(app);
