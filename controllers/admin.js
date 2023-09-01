const db = require('../database/models')
const { validateProduct } = require('../middleware/validations/product')
const { uploadFile } = require('../utils/cloudinary.js')
const { validateUpdate } = require('../middleware/validations/update.js')

const adminController = {
  getProducts: (req, res) => {
    db.products.findAll()
      .then((products) => {
        const productsData = products.map(product => {
          return {
            id: product.dataValues.id,
            title: product.dataValues.title,
            description: product.dataValues.description,
            price: product.dataValues.price,
            category: product.dataValues.category,
            image_id: product.dataValues.image_id
          }
        })

        db.images.findAll()
          .then(images => {
            const imagesData = images.map(image => {
              return {
                id: image.dataValues.id,
                url: image.dataValues.image_url
              }
            })
            const productsDataWithImages = productsData.map(product => {
              const image = imagesData.find(image => image.id === product.image_id)
              return {
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                category: product.category,
                image: image.url
              }
            })

            return res.status(200).json(productsDataWithImages)
          })
          .catch(err => {
            return res.status(400).json({ error: err })
          })
      })
      .catch((err) => {
        return res.status(400).json({ error: err })
      })
  },

  createProduct: async (req, res) => {
    try {
      const reqBody = {
        title: req.body.title,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category
      }

      const result = validateProduct(reqBody)

      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const resultImage = await uploadFile(req.file.path)

      const imageProduct = {
        public_id: resultImage.public_id,
        image_url: resultImage.secure_url,
        format: resultImage.format
      }

      db.images.create(imageProduct)
        .then(image => {
          const imageID = Number(image.dataValues.id)

          const newProduct = {
            ...result.data,
            image_id: imageID,
            stock: 1
          }

          db.products.create(newProduct)
            .then(product => {
              return res.status(201).json(product)
            })
            .catch(err => {
              return res.status(400).json({ error: err })
            })
        })
        .catch(err => {
          return res.status(400).json({ error: err })
        })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  },

  updateProduct: (req, res) => {
    const { id } = req.params

    db.products.findOne({
      where: {
        id
      }
    })
      .then(product => {
        if (!product) {
          return res.status(404).json({ message: 'Product not found' })
        }

        const result = validateUpdate(req.body)

        if (result.error) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        db.products.update(result.data, {
          where: {
            id
          }
        })
          .then(() => {
            return res.status(200).json({ message: 'Product updated' })
          })
          .catch(err => {
            return res.status(400).json({ error: err })
          })
      })
  },

  deleteProduct: (req, res) => {
    const { id } = req.params

    db.products.findOne({
      where: {
        id
      }
    })
      .then(product => {
        if (!product) {
          return res.status(404).json({ message: 'Product not found' })
        }

        db.products.destroy({
          where: {
            id
          }
        })
          .then(() => {
            return res.status(200).json({ message: 'Product deleted' })
          })
          .catch(err => {
            return res.status(400).json({ error: err })
          })
      })
      .catch(err => {
        return res.status(400).json({ error: err })
      })
  }
}

module.exports = adminController
