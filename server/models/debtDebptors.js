// models/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('./db'); 

// Импорт моделей
const Debtor = require('./Debtor')(sequelize); 
const Debt = require('./Debt')(sequelize);

// Определение связей
Debtor.hasMany(Debt, { foreignKey: 'debtor_id' });
Debt.belongsTo(Debtor, { foreignKey: 'debtor_id' });

module.exports = {
    Debtor,
    Debt,
    sequelize
};