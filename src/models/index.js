
'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const carsModel = require('./cars/model.js');
const carsAccessoriesModel = require('./carsAccessories/model.js');
const userModel = require('./users.js');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);
const cars = carsModel(sequelize, DataTypes);
const accessories = carsAccessoriesModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  cars: new Collection(cars),
  accessories: new Collection(accessories),
  users: userModel(sequelize, DataTypes),
};