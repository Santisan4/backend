function categoriesData (sequelize, DataTypes) {
  const alias = 'categories'

  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    }
  }

  const config = { timestamps: false }

  const category = sequelize.define(alias, cols, config)

  category.associate = function (models) {
    category.belongsTo(models.products, {
      foreignKey: 'category_id'
    })
  }

  return category
}

module.exports = categoriesData
