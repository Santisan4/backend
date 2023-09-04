const router = require('express').Router()
const isAdmin = require('../middleware/isAdm.js')
const isAuth = require('../middleware/isAuth.js')
const adminController = require('../controllers/admin.js')
const upload = require('../middleware/multer/products.js')

// create
router.post('/products', isAuth, isAdmin, upload.single('image'), adminController.createProduct)

// get all
router.get('/products', isAuth, isAdmin, adminController.getProducts)

// get one
router.get('/products/:id', isAuth, isAdmin, adminController.getOneProduct)

// update
router.patch('/products/:id', isAuth, isAdmin, upload.single('image'), adminController.updateProduct)

// delete
router.delete('/products/:id', isAuth, isAdmin, adminController.deleteProduct) // delete

// USERS
// get all
router.get('/users', isAuth, isAdmin, adminController.getUsers)

module.exports = router
