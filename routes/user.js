const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.js')
const isAuth = require('../middleware/isAuth.js')

router.post('/', userController.create)
router.post('/payment', isAuth, userController.payment)
router.post('/login', userController.login)
router.get('/:id/orders', userController.getOrders)

module.exports = router
