const jwt = require('jsonwebtoken')
const {redisClient} = require('./redis')

async function authentication(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization ? req.headers.authorization.replace('Bearer ','') : ''
        let decoded = jwt.verify(authorizationHeader, process.env.JWT_SECRET)
        if (decoded) {
            const sessionStatus = await redisClient.get(`authToken|${decoded.token}`)
            if(sessionStatus === 'true'){
                next()
            } else {
                res.status(401).json({error: 'Token is invalid or expired'})
            }
        } else {
            res.status(401).json({error: 'Token is invalid'})
        }
    } catch (err) {
        res.status(401).json({error: err.toString()})
    }
}

module.exports = { authentication, }
