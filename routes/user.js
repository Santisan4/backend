const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.js')

router.post('/', userController.create)
router.post('/:id/checkout', userController.checkout)
router.post('/login', userController.login)
router.get('/:id/orders', userController.getOrders)

module.exports = router
