const JWT = require('jsonwebtoken')
const createError = require('http-errors')
    // const client = require('./init_redis')

module.exports = {
    signAccessToken: (email,adminType) => {
        return new Promise((resolve, reject) => {
            const payload = {
                audience: email,
                role:adminType}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: '1h',
                issuer: 'pickurpage.com',
                
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                    return
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message =
                    err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
            req.payload = payload
            next()
        })
    },



    signRefreshToken: (email) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.REFRESH_TOKEN_SECRET
            console.log(secret)
            const options = {
                    expiresIn: '1y',
                    issuer: 'pickurpage.com',
                    audience: email,
                }
                // console.log(`options` + options)
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(payload)
                    console.log(secret)
                    console.log(options)
                    console.log(token)
                    console.log(err.message)

                    // reject(err)
                    Promise.reject(createError.InternalServerError())
                    console.log('reject')
                    return
                }

                // client.SET(email, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
                //     if (err) {
                //         console.log(email)
                //         console.log(token)
                //         console.log(err.message)
                //         reject(createError.InternalServerError())
                //         return
                //     }
                //     console.log('no err')
                resolve(token)
                    // })
            })
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, payload) => {
                    if (err) return reject(createError.Unauthorized())
                    const email = payload.aud
                    client.GET(email, (err, result) => {
                        if (err) {
                            console.log(err.message)
                            reject(createError.InternalServerError())
                            return
                        }
                        if (refreshToken === result) return resolve(email)
                        reject(createError.Unauthorized())
                    })
                }
            )
        })
    },
}