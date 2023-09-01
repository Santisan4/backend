require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

async function uploadFile (file) {
  const env = process.env.NODE_ENV === 'development'
  if (env === 'development') {
    return await cloudinary.uploader.upload(file, {
      folder: '/development/tienda/products'
    })
  } else {
    return await cloudinary.uploader.upload(file, {
      folder: '/tienda/products'
    })
  }
}

async function deleteImage (publicId) {
  return await cloudinary.uploader.destroy(publicId)
}

module.exports = { uploadFile, deleteImage }
