const Sequelize = require('sequelize');
const sequelize = require('../util/login')

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymentid:{
        type: Sequelize.STRING,
        unique:true
    },
    orderid:{
        type: Sequelize.STRING,
        unique:true
    },
    status:Sequelize.STRING
});

module.exports=Order;
