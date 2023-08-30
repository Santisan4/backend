const router = require('express').Router()
const cartController = require('../controllers/cart.js')

router.get('/', cartController.getCart)
router.post('/', cartController.addToCart)

module.exports = router
