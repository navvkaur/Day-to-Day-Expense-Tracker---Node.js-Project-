const Sequelize = require('sequelize');
const sequelize = require('../util/login')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fname:{
        type: Sequelize.STRING,
        allowNull: false,  
    },
    lname:{
        type: Sequelize.STRING,
        allowNull: false,  
    },

    username: 
    {type: Sequelize.STRING,
        allowNull: false,
        unique:true

    },
    password:
    {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    ispremiumuser:Sequelize.BOOLEAN
});

module.exports=User;

