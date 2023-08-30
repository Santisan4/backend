const express = require('express')
const cors = require('cors')

const productRouter = require('./routes/product.js')
const userRouter = require('./routes/user.js')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/user', userRouter)
app.use('/product', productRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
