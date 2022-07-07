const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
uuidv4();
const UserService = require("../Services/users");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//create a user
app.post("/users/", async (req, res) => {
  try {
    const data = req.body;
    const {email, undergradFName, undergradLName, faculty, batch, Password, phone_number} = data;
    const undergradPassword = await bcrypt.hash(Password, 10);

    if (!data) {
      return "Please pass all required fields!";
    }

    const dataToSaveUser = { email, phone_number };
    const dataToSaveUnderg = {email, undergradFName, undergradLName, faculty, batch, undergradPassword,};

    let createUser = await UserService.createUser(dataToSaveUser);
    let createUnderg = await UserService.createUndergraduate(dataToSaveUnderg);

    if (createUnderg) {
      res.status(200).json({ status: true, msg: "Success" });
      createUnderg;
    } else {
      res.status(422).json({ status: false, msg: "False" });
    }
  } catch (error) {
    console.log(error, "error!!");
  }
})
  
module.exports.handler = serverless(app);
