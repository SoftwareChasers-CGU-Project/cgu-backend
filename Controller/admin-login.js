require('dotenv').config();

const createError = require('http-errors');

const serverless = require('serverless-http');
const express = require('express');
const app = express();



const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
app.use(express.json());

const adminLoginService = require('../Services/admin-login');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_helper')
const { authSchema } = require('../helpers/validation_schema')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// let refreshToken = []

// app.get('/auth/posts', authenticateToken, (req, res) => {
//     res.json(users.filter(user => user.email === req.user.email))
// })

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split('')[1]
//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token.process.env.ACCESS_TOKEN_SECRET, (err, undergraduate) => {
//         if (err) return res.sendStatus(401)
//         req.undergraduate = undergraduate;
//         next()
//     })

// }


// app.post('/auth/token', (req, res) => {
//     const refreshToken = req.body.token;
//     if (refreshToken == null)
//         return res.sendStatus(401)
//     if (refreshToken.includes(refreshToken))
//         return res.sendStatus(403)
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         const accessToken = generateAccessToken({ em: user.name })
//         res.json({ accessToken: accessToken })
//     })
// })



// function generateAccessToken(user) {
//     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expirationIn: "15s" })
// }



// app.delete('/auth/logout', (req, res) => {
//     refreshToken = refreshToken.filter(token => token !== req.body.token)
//     res.sendStatus(200)
// }),


// app.delete('/auth/logout', async(req, res, next) => {
//         try {
//             const { refreshToken } = req.body
//             if (!refreshToken) throw createError.BadRequest()
//             const email = await verifyRefreshToken(refreshToken)
//             console.log('email')
//             client.DEL(email, (err, val) => {
//                 if (err) {
//                     console.log(err.message)
//                     throw createError.InternalServerError()
//                 }
//                 console.log(val)
//                 res.sendStatus(204)
//             })
//         } catch (error) {
//             next(error)
//         }
//     }),


// app.get('/auth/users/list', async(req, res) => {
//         try {
//             const result = await adminLoginService.viewUsers();
//             console.log(result);
//             if (result) {
//                 return res.status(200).send({
//                     data: result
//                 })
//             }
//         } catch (e) {
//             console.log(e)
//         }
//     }),




app.post('/admin/auth/login', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userPassword = req.body.adminPassword.toString();
        console.log(userEmail)
        console.log(userPassword)
        const result = await adminLoginService.viewUser(userEmail);
        if (result.length === 0) {
            return res.status(403).send({
                data: 'user has not registered'
            })
        }

        const isMatch = await adminLoginService.isValidPassword(userEmail, userPassword);
        console.log(isMatch);

        if (isMatch.match == false) {
            return res.status(403).send({
                data: 'email password mismatch'
            })
        }

        const accessToken = await signAccessToken(isMatch.userDetails[0].email, isMatch.userDetails[0].adminType);
        console.log(accessToken);


        // const refreshToken = await signRefreshToken(userEmail);
        // console.log(refreshToken);


        // if (accessToken && refreshToken) {
        //     return res.status(200).send({
        //         data: ({ accessToken, refreshToken })
        //     })
        // }


        if (accessToken) {
            return res.status(200).send({

                accessToken

               


            })
        }

    } catch (error) {
        console.log(error)
        if (error.isJoi === true)
            return next(createError.BadRequest('Invalid Username/Password'))
        // next(error)
    }
})



module.exports.handler = serverless(app);