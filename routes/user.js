const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')


router.post('/login', UserController.login)

router.use(authentication)
router.get('/find_all', UserController.findAll)
router.get('/find_by_accnum', UserController.findByAccountNumber)
router.get('/find_by_idnum', UserController.findByIdentityNumber)
router.get('/:id', UserController.findById)
router.post('/', UserController.add)
router.put('/:id', UserController.edit)
router.delete('/:id', UserController.remove)

module.exports = router
