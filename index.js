const express = require('express')
const cors = require('cors')

const productRouter = require('./routes/product.js')
const userRouter = require('./routes/user.js')
const adminRouter = require('./routes/admin.js')

const app = express()
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'https://tiendaeos.vercel.app',
      'http://localhost:5173'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
// app.use(cors())
app.use(express.json())
app.use('/admin', adminRouter)
app.use('/user', userRouter)
app.use('/products', productRouter)

// 404 not found
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
