const express = require('express')
const router = express.Router()

const isAuth = require('../middleware/isAuth.js')

const userController = require('../controllers/user.js')

// USERS
router.post('/', userController.create)
router.post('/login', userController.login)
router.get('/:name/orders', isAuth, userController.getOrderByUser)
// PAYMENTS
router.post('/payment', isAuth, userController.payment)
router.post('/webhook', userController.webhook)

// PRODUCTION
router.get('/success', (req, res) => res.redirect('https://tiendaeos.vercel.app/cart/checkout/payment/review'))
// DEVELOPMENT
// router.get('/success', (req, res) => {
//   return res.status(200).json({ message: req.query.status })
// })
router.get('/failure', (req, res) => res.send('failure'))
router.get('/pending', (req, res) => res.send('pending'))

module.exports = router
