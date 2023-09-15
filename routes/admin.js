const router = require('express').Router()

const isAdmin = require('../middleware/isAdm.js')
const isAuth = require('../middleware/isAuth.js')
const upload = require('../middleware/multer/products.js')

const adminController = require('../controllers/admin.js')

// MANAGE PRODUCTS
router.get('/products', isAuth, isAdmin, adminController.getProducts)
router.get('/products/:id', isAuth, isAdmin, adminController.getOneProduct)
router.post('/products', isAuth, isAdmin, upload.single('image'), adminController.createProduct)
router.patch('/products/:id', isAuth, isAdmin, upload.single('image'), adminController.updateProduct)
router.delete('/products/:id', isAuth, isAdmin, adminController.deleteProduct) // delete

// MANAGE USERS
router.get('/users', isAuth, isAdmin, adminController.getUsers)

// ORDERS
router.get('/orders', isAuth, isAdmin, adminController.getOrders)

module.exports = router
