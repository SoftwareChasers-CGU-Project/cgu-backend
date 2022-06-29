require('dotenv').config();

const createError = require('http-errors');

const serverless = require('serverless-http');
const express = require('express');
const app = express();

// const users = require('../Model/user-login')

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
app.use(express.json());

const userLoginService = require('../Services/user-login');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_helper')
const { authSchema } = require('../helpers/validation_schema')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


let refreshToken = []



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token.process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401)
        req.user = user;
        next()
    })

}


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expirationIn: "15s" })
}


app.delete('/admin/auth/logout', (req, res) => {
    refreshToken = refreshToken.filter(token => token !== req.body.token)
    res.sendStatus(200)
})





app.get('/auth/users/list', async(req, res) => {
        try {
            const result = await userLoginService.viewUsers();
            console.log(result);
            if (result) {
                return res.status(200).send({
                    data: result
                })
            }
        } catch (e) {
            console.log(e)
        }
    }),


    app.post('/admin/auth/login', async(req, res) => {
        try {
            const userEmail = req.body.email;
            const userPassword = req.body.undergradPassword.toString();
            const result = await userLoginService.viewUser(userEmail);
            if (result.length === 0) {
                return res.status(200).send({
                    data: 'user has not registered'
                })
            }
            console.log(`before is match`)
            const isMatch = await userLoginService.isValidPassword(userEmail, userPassword);



            console.log(isMatch);
            console.log(`after is match`)
            console.log(`before if`)
            if (!isMatch) {
                return res.status(200).send({
                    data: 'email password mismatch'
                })
            }

            const accessToken = await signAccessToken(email);
            console.log(accessToken);
            console.log('hi')
            const refreshToken = await signRefreshToken(email);
            console.log(refreshToken);

            res.send({ accessToken, refreshToken })
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Invalid Username/Password'))
                    // next(error)
        }
    })


module.exports.handler = serverless(app);