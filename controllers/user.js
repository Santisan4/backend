require('dotenv').config()
const db = require('../database/models')
const { validateUser } = require('../middleware/validations/register.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (user === null || !passwordMatch) {
          return res.status(400).json({ error: 'Invalid user or password' })
        }

        const userForToken = {
          id: user.dataValues.id,
          name: user.dataValues.name,
          email: user.dataValues.email,
          admin: user.dataValues.admin
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        return res.status(200).send({
          id: userForToken.id,
          name: userForToken.name,
          email: userForToken.email,
          admin: user.dataValues.admin,
          token
        })
      })
      .catch(err => {
        return res.status(400).json({ error: 'email does not exists' })
      })
  },

  checkout: (req, res) => {
    const idUser = req.params.id
    const { quantity, total } = req.body

    const newOrder = {
      user_id: idUser,
      quantity: Number(quantity),
      total
    }

    db.orders.create(newOrder)
      .then(response => {
        return res.status(201).json(response)
      })
      .catch(err => {
        return res.status(400).json({ error: err })
      })
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
