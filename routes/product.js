const express = require('express')
const router = express.Router()

const productController = require('../controllers/product.js')

router.get('/', productController.getAll) // GET all products

router.get('/:id', productController.getOne) // get by id

module.exports = router
