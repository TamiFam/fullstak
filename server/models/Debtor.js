// models/Debtor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Debtor = sequelize.define('Debtor', {
    debtor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registration_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'debtors', // 
    timestamps: false
});

module.exports = Debtor;