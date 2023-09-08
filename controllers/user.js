require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mercadopago = require('mercadopago')

const db = require('../database/models')
const { validateUser } = require('../middleware/validations/register.js')

const userController = {
  create: async (req, res) => {
    try {
      const result = validateUser(req.body)

      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const userToCreate = await db.users.findOne({
        where: {
          email: result.data.email
        }
      })

      if (userToCreate) {
        return res.status(400).json({ error: 'Email already exists' })
      }

      bcrypt.hash(req.body.password, 10, (err, passwordHash) => {
        if (err) {
          return res.status(400).json({ error: err })
        }

        const newUser = {
          name: result.data.name,
          email: result.data.email,
          password: passwordHash,
          admin: 0
        }

        db.users.create(newUser)
          .then(response => {
            return res.status(201).json(response)
          })
          .catch(err => {
            return res.status(400).json({ error: err.errors[0].message })
          })
      })
    } catch (err) {
      return res.status(400).json({ error: err })
    }
  },

  login: (req, res) => {
    const { email, password } = req.body

    db.users.findOne({
      where: {
        email
      }
    })
      .then(async user => {
        const passwordCorrect = user === null
          ? false
          : await bcrypt.compare(password, user.password)

        if (!(user && passwordCorrect)) {
          return res.status(401).json({ error: 'Invalid user or password' })
        }

        const userForToken = {
          id: user.dataValues.id,
          name: user.dataValues.name,
          email: user.dataValues.email,
          admin: user.dataValues.admin
        }

        const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 })

        return res.status(200).json({
          id: userForToken.id,
          name: userForToken.name,
          email: userForToken.email,
          admin: user.dataValues.admin,
          token
        })
      })
      .catch(err => {
        console.log(err)
        return res.status(400).json({ error: 'email does not exists' })
      })
  },

  payment: async (req, res) => {
    const cartFromUser = req.body

    const items = cartFromUser.map(item => {
      return {
        title: item.title,
        unit_price: item.price,
        quantity: item.quantity,
        currency_id: 'ARS'
      }
    })

    mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN
    })

    try {
      const result = await mercadopago.preferences.create({
        items,
        back_urls: {
          success: 'http://localhost:3000/user/success',
          failure: 'http://localhost:3000/user/failure',
          pending: 'http://localhost:3000/user/pending'
        },
        notification_url: 'https://7918-181-111-4-229.ngrok-free.app/user/webhook'
      })

      return res.status(200).json(result.body)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err.message })
    }
  },

  webhook: async (req, res) => {
    const payment = req.query

    try {
      if (payment.type === 'payment') {
        const data = await mercadopago.payment.findById(payment['data.id'])
        const order = {
          user_email: 'pruba@prueba.com',
          order_id: data.body.order.id,
          order_type: data.body.order.type,
          currency: data.body.currency_id,
          user: data.body.payer.email,
          // amount: data.body.transaction_amount
          amount: data.body.transaction_details.total_paid_amount
        }
        // store in database
        db.pruebas.create(order)
          .then(order => {
            console.log('pago aprobado')
            return res.status(201).json(order)
          })
          .catch(err => {
            console.log(err)
            return res.status(400).json({ error: err })
          })
      }
      console.log('aun no se procesa el pago')
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err.message })
    }
  },

  getOrders: (req, res) => {
    const userId = req.params.id

    db.orders.findAll({
      where: {
        user_id: userId
      }
    })
      .then(orders => {
        return res.status(200).json(orders)
      })
      .catch(err => {
        return res.status(400).json({ error: err })
      })
  }
}

module.exports = userController
