const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer/products.js')

const productController = require('../controllers/product.js')

router.get('/', productController.getAll) // GET all products

router.patch('/:id', upload.single('image'), productController.update) // update product

router.delete('/:id', productController.delete) // delete product

router.post('/', upload.single('image'), productController.create) // create new product

router.get('/:id', productController.getOne) // get by id

module.exports = router
