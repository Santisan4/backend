const express = require('express')
const cors = require('cors')
const path = require('node:path')

const productRouter = require('./routes/product.js')
const userRouter = require('./routes/user.js')

const app = express()
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'https://tiendaeos.vercel.app/'
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
app.use(express.json())
app.use('/user', userRouter)
app.use('/product', productRouter)

// Serve static assets if in production
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
)

// 404 not found
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
