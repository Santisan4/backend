const express = require('express')
const cors = require('cors')

const productRouter = require('./routes/product.js')
const userRouter = require('./routes/user.js')
const adminRouter = require('./routes/admin.js')
const morgan = require('morgan')

const app = express()
// app.use(cors({
//   origin: (origin, callback) => {
//     const ACCEPTED_ORIGINS = [
//       'http://localhost:5173',
//       'https://tiendaeos.vercel.app',
//       'https://frontend-d6a1ro3fz-santisan4.vercel.app/',
//       'https://frontend-git-main-santisan4.vercel.app/'
//     ]

//     if (ACCEPTED_ORIGINS.includes(origin)) {
//       return callback(null, true)
//     }

//     if (!origin) {
//       return callback(null, true)
//     }

//     return callback(new Error('Not allowed by CORS'))
//   }
// }))

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.disable('x-powered-by')

app.use('/admin', adminRouter)
app.use('/user', userRouter)
app.use('/products', productRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use((req, res, next) => {
  return res.status(404).json({ message: 'Not found' })
})
