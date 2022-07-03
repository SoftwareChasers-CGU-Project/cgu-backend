const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminService = require("../Services/admins");
const UserService = require("../Services/users");
const multer = require("multer");
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

function verifyMainAdminToken(req, res, next) {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized");
  }

  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token === "null") {
    return res.status(401).send("Unauthorized");
  }

  let payload = jwt.verify(token, "mainadminccu");
  if (!payload) {
    return req.status(401).send("Unauthorized");
  }
  // req.userId=payload.subject
  next();
}

app.post("/generateJWTToken/admin", async (req, res) => {
  var token = jwt.sign(
    {
      role: "Admin",
      user: "prabashi",
    },
    "adminccu"
  );
  return res.status(200).send({
    token: token,
  });
});

app.post("/generateJWTToken/mainadmin/", async (req, res) => {
  var token = jwt.sign(
    {
      role: "Main Admin",
      user: "Kumari",
    },
    "mainadminccu"
  );
  return res.status(200).send({
    token: token,
  });
});

//Register a new admin
app.post("/admins", async (req, res) => {
  try {
    const data = req.body;
    const { adminFName, adminLName, email, Password, phone_number } = data;
    const adminPassword = await bcrypt.hash(Password, 10);
    console.log(adminPassword);
    if (!data) {
      return "Please pass all required fields!";
    }
    const dataToSaveUser = { email, phone_number };
    const dataToSaveAdmin = { email, adminFName, adminLName, adminPassword };

    let createUser = await UserService.createUser(dataToSaveUser);
    let createAdmin = await AdminService.createAdmin(dataToSaveAdmin);

    if (createAdmin) {
      res.status(200).json({ status: true, msg: "Success" });
      createAdmin;
    } else {
      res.status(422).json({ status: false, msg: "False" });
    }
  } catch (error) {
    console.log(error, "error!!");
  }
}),

  //get all administrators
  app.get("/admins/", verifyToken, async (req, res) => {
    try {
      const AllAdmins = await AdminService.getAllAdmins();
      if (AllAdmins) {
        return res.status(200).send({
          data: AllAdmins,
        });
      }
    } catch (error) {
      //  handle errors here
      console.log(error, "error!!");
    }
  });

module.exports.handler = serverless(app);
