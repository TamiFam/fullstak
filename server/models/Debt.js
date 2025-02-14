const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
// const Debtor = require('./Debtor');

const Debt = sequelize.define('Debt', {
  debt_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  debt_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  issue_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  }
  },
  {
    tableName: 'debts',
    timestamps: false
});


module.exports = Debt;