const db = require('../database/models/index.js')
// const jwt = require('jsonwebtoken')
// const { validateProduct } = require('../middleware/validations/product.js')
// const { uploadFile, deleteImage } = require('../utils/cloudinary.js')

const productController = {
  getAll: (req, res) => {
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

  getOne: (req, res) => {
    const id = req.params.id
    db.products.findOne({
      where: {
        id
      }
    })
      .then(product => {
        const imageID = product.dataValues.image_id
        db.images.findOne({
          where: {
            id: imageID
          }
        })
          .then(image => {
            const productData = {
              title: product.dataValues.title,
              description: product.dataValues.description,
              price: product.dataValues.price,
              category: product.dataValues.category,
              image: image.dataValues.image_url
            }

            return res.status(200).json(productData)
          })
          .catch(err => {
            return res.status(400).json({ error: err })
          })
      })
      .catch(err => {
        return res.status(400).json({ error: err })
      })
  }

  // create: async (req, res) => {
  //   try {
  //     const reqBody = {
  //       title: req.body.title,
  //       description: req.body.description,
  //       price: Number(req.body.price),
  //       image: req.file.path
  //     }

  //     const authorization = req.get('authorization')
  //     let token = null

  //     if (authorization && authorization.toLowerCase().startsWith('bearer')) {
  //       token = authorization.substring(7)
  //     }

  //     const decodedToken = jwt.verify(token, process.env.SECRET)

  //     if (!token || !decodedToken.id) {
  //       return res.status(401).json({ error: 'token missing or invalid' })
  //     }

  //     const result = validateProduct(reqBody)

  //     if (result.error) {
  //       return res.status(400).json({ error: JSON.parse(result.error.message) })
  //     }

  //     const resultImage = await uploadFile(req.file.path)

  //     const imageProduct = {
  //       public_id: resultImage.public_id,
  //       image_url: resultImage.secure_url,
  //       format: resultImage.format
  //     }

  //     db.images.create(imageProduct)
  //       .then(image => {
  //         const imageID = Number(image.dataValues.id)
  //         const newProduct = {
  //           ...result.data,
  //           image_id: imageID,
  //           stock: 1
  //         }

  //         db.products.create(newProduct)
  //           .then(product => {
  //             return res.status(201).json(product)
  //           })
  //           .catch(err => {
  //             return res.status(400).json({ error: err })
  //           })
  //       })
  //       .catch(err => {
  //         return res.status(400).json({ error: err })
  //       })
  //   } catch (err) {
  //     return res.status(500).json({ message: err.message })
  //   }
  // },

  // delete: (req, res) => {
  //   const id = req.params.id

  //   db.products.findOne({
  //     where: {
  //       id
  //     }
  //   })
  //     .then(product => {
  //       const imageID = product.dataValues.image_id
  //       db.images.findOne({
  //         where: {
  //           id: imageID
  //         }
  //       })
  //         .then(async image => {
  //           const publicIdImage = image.dataValues.public_id
  //           await deleteImage(publicIdImage)
  //           db.images.destroy({
  //             where: {
  //               id: imageID
  //             }
  //           })
  //             .then(() => {
  //               db.products.destroy({
  //                 where: {
  //                   id
  //                 }
  //               })
  //                 .then(() => {
  //                   return res.status(200).json({ message: 'Product deleted' })
  //                 })
  //                 .catch(err => {
  //                   return res.status(400).json({ error: err })
  //                 })
  //             })
  //             .catch(err => {
  //               return res.status(400).json({ error: err })
  //             })
  //         })
  //     })
  //     .catch(err => {
  //       return res.status(400).json({ error: err })
  //     })
  // },

  // update: (req, res) => {
  //   const id = req.params.id

  //   const fieldsToUpdate = {
  //     title: req.body.title,
  //     description: req.body.description,
  //     price: Number(req.body.price)
  //   }

  //   db.products.findOne({
  //     where: {
  //       id
  //     }
  //   })
  //     .then(product => {
  //       const imageID = product.dataValues.image_id

  //       db.images.findOne({
  //         where: {
  //           id: imageID
  //         }
  //       })
  //         .then(async image => {
  //           const publicIdImage = image.dataValues.public_id
  //           await deleteImage(publicIdImage)

  //           const result = await uploadFile(req.file.path)

  //           const imageProduct = {
  //             public_id: result.public_id,
  //             image_url: result.secure_url,
  //             format: result.format
  //           }

  //           db.images.update(imageProduct, {
  //             where: {
  //               id: imageID
  //             }
  //           })
  //             .then(() => {
  //               fieldsToUpdate.image_id = imageID
  //               db.products.update(fieldsToUpdate, {
  //                 where: {
  //                   id
  //                 }
  //               })
  //                 .then(() => {
  //                   return res.status(200).json({ message: 'Product updated' })
  //                 })
  //                 .catch(err => {
  //                   return res.status(400).json({ error: err })
  //                 })
  //             })
  //             .catch(err => {
  //               return res.status(400).json({ error: err })
  //             })
  //         })
  //         .catch(err => {
  //           return res.status(400).json({ error: err })
  //         })
  //     })
  //     .catch(err => {
  //       return res.status(400).json({ error: err })
  //     })
  // }
}

module.exports = productController
