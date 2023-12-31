function ordersData (sequelize, DataTypes) {
  const alias = 'orders'
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER
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

  const orders = sequelize.define(alias, cols, config)

  orders.associate = function (models) {
    orders.belongsTo(models.users, {
      foreignKey: 'user_id'
    })
  }
  return orders
}

module.exports = ordersData
