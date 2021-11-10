'use strict';

const carsModel = (sequelize, DataTypes) => sequelize.define('Cars', {
  type: { type: DataTypes.ENUM('mercedes','bmw','audi'), required: true },
  color: { type: DataTypes.STRING},
  model: { type: DataTypes.STRING, required: true },
  price: { type: DataTypes.STRING, required: true },
});

module.exports = carsModel;