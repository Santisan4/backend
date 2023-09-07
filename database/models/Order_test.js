function ordersTestData (sequelize, DataTypes) {
  const alias = 'orders_test'
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_email: {
      type: DataTypes.STRING(100)
    },
    order_id: {
      type: DataTypes.STRING(100)
    },
    order_type: {
      type: DataTypes.STRING(100)
    },
    amount: {
      type: DataTypes.INTEGER
    },
    currency: {
      type: DataTypes.STRING(100)
    },
    created_at: {
      type: DataTypes.DATE
    }
  }

  const config = { timestamps: false }

  const orderstest = sequelize.define(alias, cols, config)

  return orderstest
}

module.exports = ordersTestData
