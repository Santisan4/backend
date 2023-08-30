function usersData (sequelize, DataTypes) {
  const alias = 'users'

  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    admin: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.DATE
    }
  }

  const config = { timestamps: false, tableName: 'users' }

  const users = sequelize.define(alias, cols, config)

  users.associate = function (models) {
    users.belongsToMany(models.products, {
      through: 'productUser',
      foreignKey: 'user_id',
      sourceKey: 'id',
      timestamps: false
    })
  }

  return users
}

module.exports = usersData
