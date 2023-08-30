function imagesData (sequelize, DataTypes) {
  const alias = 'images'

  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    public_id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    format: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE
    }
  }

  const config = { timestamps: false }

  const images = sequelize.define(alias, cols, config)

  images.associate = function (models) {
    images.belongsTo(models.products, {
      foreignKey: 'id'
    })
  }

  return images
}

module.exports = imagesData
