const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.js')
const isAuth = require('../middleware/isAuth.js')

router.post('/', userController.create)
router.post('/payment', isAuth, userController.payment)
router.post('/webhook', userController.webhook)
router.post('/login', userController.login)
router.get('/:id/orders', userController.getOrders)

router.get('/success', (req, res) => res.redirect('http://localhost:5173/'))
router.get('/failure', (req, res) => res.send('failure'))
router.get('/pending', (req, res) => res.send('pending'))

module.exports = router
