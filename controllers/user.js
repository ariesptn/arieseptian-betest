const models = require('../models')
const { redisClient } = require('../middlewares/redis')
const { getToken } = require('../helpers/auth')

class UserController {
    static async findAll(req, res) {
        try {
            const userData = await models.User.find({}).lean()
            res.status(200).json({ userData })
        } catch (err) {
            res.status(500).json({error: err.toString()})
        }
    }

    static async findById(req, res) {
        try {
            const cachedUserData = await redisClient.get(`user|id|${req.params.id}`)
            if(cachedUserData) return res.status(200).json({ userData: JSON.parse(cachedUserData) })
            const userData = await models.User.findById(req.params.id).lean()
            await redisClient.set(`user|id|${req.params.id}`, JSON.stringify(userData), {EX: 86400})
            res.status(200).json({ userData })
        } catch (err) {
            res.status(500).json({error: err.toString()})
        }
    }

    static async findByAccountNumber(req, res) {
        try {
            const cachedUserData = await redisClient.get(`user|accountNUmber|${req.query.account_number}`)
            if(cachedUserData) return res.status(200).json({ userData: JSON.parse(cachedUserData) })
            const userData = await models.User.findOne({accountNumber: req.query.account_number}).lean()
            await redisClient.set(`user|accountNUmber|${req.query.account_number}`, JSON.stringify(userData), {EX: 86400})
            res.status(200).json({ userData })
        } catch (err) {
            res.status(500).json({error: err.toString()})
        }
    }

    static async findByIdentityNumber(req, res) {
        try {
            const cachedUserData = await redisClient.get(`user|identityNumber|${req.query.identity_number}`)
            if(cachedUserData) return res.status(200).json({ userData: JSON.parse(cachedUserData) })
            const userData = await models.User.findOne({identityNumber: req.query.identity_number}).lean()
            await redisClient.set(`user|identityNumber|${req.query.identity_number}`, JSON.stringify(userData), {EX: 86400})
            res.status(200).json({ userData })
        } catch (err) {
            res.status(500).json({error: err.toString()})
        }
    }

    static async add(req, res) {
        try {
            let userData = await models.User.create({
                userName: req.body.userName,
                email: req.body.email,
                identityNumber: req.body.identityNumber,
                accountNumber: req.body.accountNumber,
            })
            userData = await models.User.findById(userData._id).lean()
            res.status(200).json({ userData })
        } catch (err) {
            res.status(500).json({error: err.toString()})
        }
    }

    static async edit(req, res) {
        try {
            let userData = await models.User.findById(req.params.id).lean()
            await redisClient.del(`user|id|${req.params.id}`)
            await redisClient.del(`user|identityNumber|${userData.identityNumber}`)
            await redisClient.del(`user|accountNUmber|${userData.accountNumber}`)
            userData = await models.User.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                {
                    userName: req.body.userName,
                    email: req.body.email,
                    identityNumber: req.body.identityNumber,
                    accountNumber: req.body.accountNumber,
            })
            userData = await models.User.findById(userData._id).lean()
            res.status(200).json({ userData })
        } catch (err) {
            res.status(500).json({error: err.toString()})
        }
    }

    static async remove(req, res) {
        try {
            let userData = await models.User.findById(req.params.id).lean()
            await redisClient.del(`user|id|${req.params.id}`)
            await redisClient.del(`user|identityNumber|${userData.identityNumber}`)
            await redisClient.del(`user|accountNUmber|${userData.accountNumber}`)
            userData = await models.User.deleteOne({_id: req.params.id})
            res.status(200).json({ userData })
        } catch (err) {
            res.status(500).json({error: err.toString()})
        }
    }

    static async login(req, res) {
        try {
            const tokenNum = Math.random().toString()
            const token = await getToken({token: tokenNum})
            await redisClient.set(`authToken|${tokenNum}`, 'true', {EX: 86400})
            res.status(200).json({ token })
        } catch (err) {
            res.status(500).json({error: err.toString()})
        }
    }
}

module.exports = UserController
