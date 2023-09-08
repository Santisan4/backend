const mercadopago = require('mercadopago')

const db = require('../database/models')

const paymentController = {
  create: async (req, res) => {
    mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN
    })

    try {
      const result = await mercadopago.preferences.create({
        items: [
          {
            title: 'Bermuda Nike',
            unit_price: 500,
            currency_id: 'ARS',
            quantity: 1
          },
          {
            title: 'Campera',
            unit_price: 2500,
            currency_id: 'ARS',
            quantity: 2
          }
        ],
        back_urls: {
          success: 'http://localhost:3000/payment/success',
          failure: 'http://localhost:3000/payment/failure',
          pending: 'http://localhost:3000/payment/pending'
        },
        notification_url: 'https://049f-181-111-4-229.ngrok-free.app/payment/webhook'
      })

      return res.send(result.body)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  webhook: async (req, res) => {
    const payment = req.query

    try {
      if (payment.type === 'payment') {
        const data = await mercadopago.payment.findById(payment['data.id'])
        // console.log(data)
        const order = {
          order_id: data.body.order.id,
          order_type: data.body.order.type,
          currency: data.body.currency_id,
          user: data.body.payer.email,
          amout: data.body.transaction_amount
        }
        // console.log(order)
        // store in database
        db.orderstest.create(order)
          .then(order => {
            return res.status(201).json(order)
          })
          .catch(err => {
            console.log(err)
            return res.status(400).json({ error: err })
          })
        // db.users.findOne({
        //   where: {
        //     email: order.user
        //   }
        // })
        //   .then(user => {
        //     if (!user) {
        //       return res.status(400).json({ error: 'user not found' })
        //     }

        //     db.orders.create({
        //       user_id: user.dataValues.id,
        //       order_id: order.order_id,
        //       order_type: order.order_type,
        //       amout: order.amout,
        //       currency: order.currency
        //     })
        //       .then(order => {
        //         return res.status(201).json(order)
        //       })
        //       .catch(err => {
        //         console.log(err)
        //         return res.status(400).json({ error: err })
        //       })
        //   })
        //   .catch(err => {
        //     console.log(err)
        //     return res.status(400).json({ error: err })
        //   })
      }
      console.log('aun no se procesa el pago')
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err.message })
    }
  }
}

module.exports = paymentController
