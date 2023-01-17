const dotnev = require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.database,process.env.usernamesql,process.env.passwordsql,{
  dialect :'mysql',
  host:'localhost'
});

module.exports=sequelize;