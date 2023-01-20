const dotnev = require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('expense_database','root','navneet',{
  dialect :'mysql',
  host: 'localhost'
});

module.exports=sequelize;