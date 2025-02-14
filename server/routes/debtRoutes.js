const express = require('express');
const router = express.Router();
const debtController = require('../controllers/debtController');


router.put('/:id', debtController.updateDebt);
router.delete('/:id', debtController.deleteDebt);


module.exports = router;