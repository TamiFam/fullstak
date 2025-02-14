const express = require('express');
const router = express.Router();
const debtorController = require('../controllers/debtorController');

router.get('/', debtorController.getAllDebtors);

module.exports = router;