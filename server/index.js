require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const Debtor = require('./models/Debtor');
const Debt = require('./models/Debt');

const app = express();
const port = process.env.PORT || 5000;

Debtor.hasMany(Debt, { foreignKey: 'debtor_id' });
Debt.belongsTo(Debtor, { foreignKey: 'debtor_id' });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/debtors', require('./routes/debtorRoutes'));
app.use('/api/debts', require('./routes/debtRoutes'));

// Database connection and synchronization
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Models synchronized');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });