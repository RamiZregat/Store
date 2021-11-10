'use strict';

const carsAccessoriesModel = (sequelize, DataTypes) => sequelize.define('CarsAccessories', {
  type: { type: DataTypes.STRING, required: true },
  price: { type: DataTypes.STRING, required: true },
});

module.exports = carsAccessoriesModel;