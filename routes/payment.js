const router = require('express').Router()

const paymentController = require('../controllers/payment.js')

router.post('/', paymentController.create)

router.post('/webhook', paymentController.webhook)

module.exports = router
