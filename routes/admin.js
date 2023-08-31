const router = require('express').Router()
const isAdmin = require('../middleware/isAdm.js')
const isAuth = require('../middleware/isAuth.js')
const adminController = require('../controllers/admin.js')
const upload = require('../middleware/multer/products.js')

router.post('/products', isAuth, isAdmin, upload.single('image'), adminController.createProduct)
router.get('/products', isAuth, isAdmin, adminController.getProducts)
router.patch('/products/:id', isAuth, isAdmin, upload.single('image'), adminController.updateProduct)
router.delete('/products/:id', isAuth, isAdmin, adminController.deleteProduct)

module.exports = router
