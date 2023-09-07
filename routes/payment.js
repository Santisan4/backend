const router = require('express').Router()

const paymentController = require('../controllers/payment.js')

router.post('/', paymentController.create)
router.get('/success', (req, res) => res.send('success'))
router.get('/failure', (req, res) => res.send('failure'))
router.get('/pending', (req, res) => res.send('pending'))

router.post('/webhook', paymentController.webhook)

module.exports = router
