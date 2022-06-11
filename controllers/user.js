const models = require('../models')
const { redisClient } = require('../middlewares/redis')
const { getToken } = require('../helpers/auth')

class UserController {
    static async findAll(req, res) {
        try {
            const userData = await models.User.find({}).lean()
            res.status(200).json({ userData })
        } catch (err) {
            console.log(err)
            res.status(500).json({error: err.toString()})
        }
    }

    static async findById(req, res) {
        try {
            const userData = await models.User.findById(req.params.id).lean()
            res.status(200).json({ userData })
        } catch (err) {
            console.log(err)
            res.status(500).json({error: err.toString()})
        }
    }

    static async findByAccountNumber(req, res) {
        try {
            const userData = await models.User.findOne({accountNumber: req.query.account_number}).lean()
            res.status(200).json({ userData })
        } catch (err) {
            console.log(err)
            res.status(500).json({error: err.toString()})
        }
    }

    static async findByIdentityNumber(req, res) {
        try {
            const userData = await models.User.findOne({identityNumber: req.query.identity_number}).lean()
            res.status(200).json({ userData })
        } catch (err) {
            console.log(err)
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
            console.log(err)
            res.status(500).json({error: err.toString()})
        }
    }

    static async edit(req, res) {
        try {
            let userData = await models.User.findOneAndUpdate(
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
            console.log(err)
            res.status(500).json({error: err.toString()})
        }
    }

    static async remove(req, res) {
        try {
            const userData = await models.User.deleteOne({_id: req.params.id})
            res.status(200).json({ userData })
        } catch (err) {
            console.log(err)
            res.status(500).json({error: err.toString()})
        }
    }

    static async login(req, res) {
        try {
            const tokenNum = Math.random().toString()
            const token = await getToken({token: tokenNum})
            await redisClient.set(`authToken_${tokenNum}`, 'true')
            res.status(200).json({ token })
        } catch (err) {
            console.log(err)
            res.status(500).json({error: err.toString()})
        }
    }
}

module.exports = UserController
