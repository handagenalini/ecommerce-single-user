const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'nalini@200026', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;