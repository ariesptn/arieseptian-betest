const jwt = require('jsonwebtoken')

async function getToken(obj) {
    let token = jwt.sign(obj, process.env.JWT_SECRET || 'notsosecret')
    return token
}

module.exports = { getToken }
