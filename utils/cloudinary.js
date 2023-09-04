require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

async function uploadFile (file) {
  return await cloudinary.uploader.upload(file, {
    folder: '/tiendaEos/products'
  })
}

async function deleteImage (publicId) {
  return await cloudinary.uploader.destroy(publicId)
}

module.exports = { uploadFile, deleteImage }
