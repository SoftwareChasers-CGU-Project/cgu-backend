require('dotenv').config();

const createError = require('http-errors');
const nodemailer = require("nodemailer");
const serverless = require('serverless-http');
const express = require('express');
const app = express();

const undergraduate = require('../Model/user-login')

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
app.use(express.json());

const userLoginService = require('../Services/user-login');
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


// app.get('/auth/users/all', async(req, res) => {
//         try {
//             const result = await userLoginService.viewUsers();
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


app.post('/auth/login', async (req, res) => {
    try {
        console.log(req.body);
        const userEmail = req.body.email;
        const userPassword = req.body.undergradPassword.toString();
        const result = await userLoginService.viewUser(userEmail);
        if (result.length === 0) {

            return res.status(403).send({
                data: 'user has not registered'

            })
        }

        const isMatch = await userLoginService.isValidPassword(userEmail, userPassword);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(403).send({
                data: 'email password mismatch'
            })
        }


        const accessToken = await signAccessToken(userEmail);
        console.log(accessToken);


        return res.status(200).send({
            email: userEmail,
            roles: undergraduate,
            accessToken: accessToken
        })




    } catch (error) {
        if (error.isJoi === true)
            return next(createError.BadRequest('Invalid Username/Password'))
        // next(error)
    }
}),

app.put('/auth/forgot-password', async (req, res) => {
    const userEmail = req.body.email;
    console.log(req.body)
    console.log(userEmail);
    const result = await userLoginService.viewUser(userEmail);
    if (result.length === 0) {
        return res.status(403).send({
            data: 'user has not registered'
        })
    }

    const token = jwt.sign({ userEmail }, process.env.RESET_PASSWORD_KEY, { expiresIn: '20m' });
    console.log(token)
    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b4aa8528f611a2",
          pass: "22f7dc05b604c3"
        }
      });
    console.log(transporter)
    const link = process.env.CLIENT_URL;
    let info = await transporter.sendMail({
        from: '"Career Guidance Unit, University of Moratuwa" <cgu.uom22@gmail.com>',
        to: userEmail,
        subject: "Account Activation Link",
        text: "Please click on the given link to reset your password reset password.",
        html:
            "<p>Link to reset your password <a href = " + link + "/" + token + "> activation link </a></p>"

    });
    console.log('before info')
    console.log(info)
    return res.status(200).send({
        email: userEmail,
        message: "email sent"
    })

}),



app.put('/auth/reset-password', async (req, res) => {
    try {
        const { token, newPass, email } = req.body;
        console.log(token)
        console.log(newPass)
        console.log(email)
        if (token) {
            jwt.verify(token, process.env.RESET_PASSWORD_KEY, function (error, decodedData) {
                if (error) {
                    return res.json({
                        error: "Incorrect token or expired"
                    })
                }
            })
        } else {
            return res.status(401).json({ error: "Authentication error " });
        }
        const undergradPassword = await bcrypt.hash(newPass, 10);
        console.log(undergradPassword);
        const dataToSave = { email, undergradPassword }
        const updatePassword = await userLoginService.updatePassword(dataToSave);

        if (updatePassword) {
            return res.status(200).send(updatePassword)
        }


    } catch (err) {
        return "error"
    }
})




module.exports.handler = serverless(app);