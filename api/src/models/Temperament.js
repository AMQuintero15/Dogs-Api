const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define("temperament", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
  })
}