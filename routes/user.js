const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.js')
const isAuth = require('../middleware/isAuth.js')

router.post('/', userController.create)
router.post('/:id/checkout', isAuth, userController.checkout)
router.post('/login', userController.login)
router.get('/:id/orders', userController.getOrders)

module.exports = router
