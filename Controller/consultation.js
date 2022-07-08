const serverless = require("serverless-http");
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
uuidv4();
const ConsultationService = require("../Services/consultation");
var jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//CORS headers middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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
  if (payload.role == "Admin" || payload.role == "MainAdmin") {
    next();
  } else {
    return res.status(401).send("Unauthorized");
  }
}

function verifyTokenMain(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized");
  }

  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized");
  }

  let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (payload.audience!=req.body.undergraduate_email) {
    return res.status(401).send({
      msg:"Invalid Email Address"
    });
  }
  next();
}

// creating a new consultation Request
app.post("/consultationReq/add/:consultantId", verifyTokenMain,async (req, res) => {
  try {
    const { consultantId } = req.params;
    const data = req.body;
    const { undergraduate_email, sessionType } = data;
    if (!data) {
      return "Please pass all required fields!";
    }
    const dataToConsultation = {
      undergraduate_email,
      sessionType,
      consultationId: uuidv4(),
    };
    const dataToConsultationRequests = { undergraduate_email };
    const dataToRequestprovide = { consultantId };

    let createConsultationReq = await ConsultationService.createConsultationReq(
      dataToConsultation,
      dataToConsultationRequests
    );
    let createConsultationReqProvide =
      await ConsultationService.createConsultationReqProvide(
        dataToConsultation,
        dataToRequestprovide
      );
    let createConsultation = await ConsultationService.createConsultation(
      dataToConsultation
    );

    if (createConsultationReq && createConsultationReqProvide && createConsultation) {
      res.status(200).json({ status: true, msg: "Consultation Request Sent" });
      createConsultationReq;
    } else {
      res.status(422).json({ status: false, msg: "False" });
    }

    // if (createConsultationReqProvide) {
    //   res.status(200).json({ status: true, msg: "Success" });
    //   createConsultationReqProvide;
    // } else {
    //   res.status(422).json({ status: false, msg: "False" });
    // }

    // if (createConsultation) {
    //   res.status(200).json({ status: true, msg: "Success" });
    //   createConsultation;
    // } else {
    //   res.status(422).json({ status: false, msg: "False" });
    // }
  } catch (error) {
    console.log(error, "error!!");
  }
}),
  //  getting all consultation requests
  app.get("/consultation-Requests/list", verifyToken, async (req, res) => {
    try {
      const allRequests = await ConsultationService.getPendingRequests();
      const all = await allRequests;
      if (all) {
        return res.status(200).send({
          data: all,
          message:"Success"
        });
      }
    } catch (error) {
      console.log(error, "error!!");
    }
  }),
  // getting scheduled consultation sessions
  app.get("/scheduled-sessions/list", verifyToken, async (req, res) => {
    try {
      const allScheduledSessions =
        await ConsultationService.getScheduledSessions();
      const all = await allScheduledSessions;
      if (all) {
        return res.status(200).send({
          data: all,
          message:"Success"
        });
      }
    } catch (error) {
      console.log(error, "error!!");
    }
  }),
  app.put("/scheduled-session/:consultation_id/",verifyToken,async (req, res) => {
      try {
        const consultationId = req.params.consultation_id;
        const data = req.body;
        const { sessionDate, sessionTime } = data;

        if (!data) {
          return "Please pass all required fields!";
        }
        const dataToSave = { sessionDate, sessionTime, consultationId };
        const displayedUnderScheduled =
          await ConsultationService.displayUnderScheduled(dataToSave);
        const sessionType = await ConsultationService.getSessionType(
          consultationId
        );
        const sendTo = await ConsultationService.getUndergradEmail(
          consultationId
        );

        var transporter = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "eb864cbd20d837",
            pass: "13ae191c4f4600",
          },
        });
        let info = await transporter.sendMail({
          from: '"Career Guidance Unit" <cgu.uom22@gmail.com>',
          to: sendTo[0].undergraduate_email,
          subject:
            "Regarding the Consultation Session Request | " +
            sessionType[0].sessionType,
          html:
            "<p>Dear Student,</p><p>Your session request to conduct a " +
            sessionType[0].sessionType +
            " session was recieved and Career Guidance Unit of University of Moratuwa has scheduled a " +
            sessionType[0].sessionType +
            " for you.</p><p><b>Session Date:  </b>" +
            sessionDate +
            "</p><p><b> Session Time:  </b>" +
            sessionTime +
            "</p><p>Thank you</p>Career Guidance Unit,<br><p>University of Moratuwa</p>",
        });

        if (displayedUnderScheduled) {
          return res.status(200).send({
            data: displayedUnderScheduled,
            msg: "Email Sent"
          });
        }
      } catch (error) {
        //  handle errors here
        console.log(error, "error!!");
      }
    }
  ),
  app.delete("/scheduled-session/delete/:consultation_id/",verifyToken,async (req, res) => {
      try {
        const { consultation_id } = req.params;
        const Deleteconsultation = await ConsultationService.deleteConsultation(
          { consultation_id }
        );
        const deleteRequestProvide =
          await ConsultationService.deleteRequestProvide({ consultation_id });
        const deleteRequest = await ConsultationService.deleteRequest({
          consultation_id,
        });
        if (Deleteconsultation) {
          return res.status(200).send({
            data: Deleteconsultation,
            msg:"session Deleted"
          });
        }
        if (deleteRequestProvide) {
          return res.status(200).send({
            data: deleteRequestProvide,
            msg:"session Deleted"
          });
        }
        if (deleteRequest) {
          return res.status(200).send({
            data: deleteRequest,
            msg:"session Deleted"
          });
        }
      } catch (error) {
        console.log(error, "error!!");
      }
    }
  ),
  //filtering pending consultation sessions
  app.get("/consultation-Requests/list/:sessionType/",verifyToken,async (req, res) => {
      try {
        const sessionType = req.params.sessionType;

        if (sessionType == "Individual Career Counseling Sessions") {
          const IndividualSessions =
            await ConsultationService.getIndividualSessions();
          if (IndividualSessions) {
            return res.status(200).send({
              data: IndividualSessions,
              msg:"Filtered"
            });
          }
        } else if (sessionType == "Round Table Discussion") {
          const RoundTable =
            await ConsultationService.getRoundTableDiscussions();
          if (RoundTable) {
            return res.status(200).send({
              data: RoundTable,
              msg:"Filtered"
            });
          }
        } else if (sessionType == "Soft Skill Development") {
          const softSkill = await ConsultationService.getSoftSkillDevelopment();
          if (softSkill) {
            return res.status(200).send({
              data: softSkill,
              msg:"Filtered"
            });
          }
        } else if (
          sessionType == "Session with an Expert in a Foreign University"
        ) {
          const foreignExpertSession =
            await ConsultationService.getForeignExpertSessions();
          if (foreignExpertSession) {
            return res.status(200).send({
              data: foreignExpertSession,
              msg:"Filtered"
            });
          }
        } else if (sessionType == "Mockup Interviews") {
          const mockupInterview =
            await ConsultationService.getMockupInterviews();
          if (mockupInterview) {
            return res.status(200).send({
              data: mockupInterview,
              msg:"Filtered"
            });
          }
        } else if (sessionType == "Session with an Academic Expert") {
          const academicExpertSession =
            await ConsultationService.getAcademicExpertSession();
          if (academicExpertSession) {
            return res.status(200).send({
              data: academicExpertSession,
              msg:"Filtered"
            });
          }
        } else if (sessionType == "false") {
          const allPendingRequests =
            await ConsultationService.getPendingRequests();
          if (allPendingRequests) {
            return res.status(200).send({
              data: allPendingRequests,
              msg:"all data"
            });
          }
        } else {
          const allPendingRequests =
            await ConsultationService.getPendingRequests();
          if (allPendingRequests) {
            return res.status(200).send({
              data: allPendingRequests,
              msg:"all data"
            });
          }
        }
      } catch (error) {
        //  handle errors here
        console.log(error, "error!!");
      }
    }
  );

//filtering scheduled consultation sessions
app.get("/consultation-sessions/list/:sessionType/",verifyToken,async (req, res) => {
    try {
      const sessionType = req.params.sessionType;

      if (sessionType == "Individual Career Counseling Sessions") {
        const IndividualSessions =
          await ConsultationService.getScheduledIndividualSessions();
        if (IndividualSessions) {
          return res.status(200).send({
            data: IndividualSessions,
            msg:"Filtered"
          });
        }
      } else if (sessionType == "Round Table Discussion") {
        const RoundTable =
          await ConsultationService.getScheduledRoundTableDiscussions();
        if (RoundTable) {
          return res.status(200).send({
            data: RoundTable,
            msg:"Filtered"
          });
        }
      } else if (sessionType == "Soft Skill Development") {
        const softSkill =
          await ConsultationService.getScheduledSoftSkillDevelopment();
        if (softSkill) {
          return res.status(200).send({
            data: softSkill,
            msg:"Filtered"
          });
        }
      } else if (
        sessionType == "Session with an Expert in a Foreign University"
      ) {
        const foreignExpertSession =
          await ConsultationService.getScheduledForeignExpertSessions();
        if (foreignExpertSession) {
          return res.status(200).send({
            data: foreignExpertSession,
            msg:"Filtered"
          });
        }
      } else if (sessionType == "Mockup Interviews") {
        const mockupInterview =
          await ConsultationService.getScheduledMockupInterviews();
        if (mockupInterview) {
          return res.status(200).send({
            data: mockupInterview,
            msg:"Filtered"
          });
        }
      } else if (sessionType == "Session with an Academic Expert") {
        const academicExpertSession =
          await ConsultationService.getScheduledAcademicExpertSession();
        if (academicExpertSession) {
          return res.status(200).send({
            data: academicExpertSession,
            msg:"Filtered"
          });
        }
      } else if (sessionType == "false") {
        const allPendingRequests =
          await ConsultationService.getScheduledSessions();
        if (allPendingRequests) {
          return res.status(200).send({
            data: allPendingRequests,
            msg:"all data"
          });
        }
      } else {
        const allPendingRequests =
          await ConsultationService.getScheduledSessions();
        if (allPendingRequests) {
          return res.status(200).send({
            data: allPendingRequests,
            msg:"all data"
          });
        }
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  }
);

module.exports.handler = serverless(app);
