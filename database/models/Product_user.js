function productsUsersData (sequelize, DataTypes) {
  const alias = 'products_user'

  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }

  // const config = { timestamps: false }
  const config = {}

  const productsUser = sequelize.define(alias, cols, config)

  return productsUser
}

module.exports = productsUsersData
