
'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const carsModel = require('./cars/model.js');
const carsAccessoriesModel = require('./carsAccessories/model.js');
const userModel = require('./users.js');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);
const cars = carsModel(sequelize, DataTypes);
const accessories = carsAccessoriesModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  cars: new Collection(cars),
  accessories: new Collection(accessories),
  users: userModel(sequelize, DataTypes),
};