const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/isAuth.js')

const productController = require('../controllers/product.js')

router.get('/', isAuth, productController.getAll) // GET all products

router.get('/:id', isAuth, productController.getOne) // get by id

module.exports = router
