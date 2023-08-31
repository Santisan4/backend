function productsData (sequelize, DataTypes) {
  const alias = 'products'

  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image_id: {
      type: DataTypes.INTEGER
    },
    stock: {
      type: DataTypes.INTEGER
    },
    category_id: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.DATE
    }
  }

  const config = { timestamps: false }

  const products = sequelize.define(alias, cols, config)

  products.associate = function (models) {
    products.belongsToMany(models.users, {
      as: 'users',
      through: 'product_user',
      foreignKey: 'product_id',
      sourceKey: 'id',
      timestamps: false
    })
  }

  products.associate = function (models) {
    products.belongsTo(models.images, {
      foreignKey: 'image_id'
    })
  }

  return products
}

module.exports = productsData
