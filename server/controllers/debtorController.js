const Debtor = require('../models/Debtor');
const Debt = require('../models/Debt');


exports.getAllDebtors = async (req, res) => {
  const limit = isNaN(parseInt(req.query.limit)) ? 100 : parseInt(req.query.limit);
  const offset = isNaN(parseInt(req.query.offset)) ? 0 : parseInt(req.query.offset);

  try {
    const debtors = await Debtor.findAll({
      include: [{
        model: Debt,
        attributes: ['debt_id', 'debt_amount', 'issue_date', 'due_date']
      }],
      attributes: ['debtor_id', 'first_name', 'last_name', 'phone_number'],
      limit: limit,
      offset: offset,
      order: [['debtor_id', 'ASC']],
    });

    const totalCount = await Debtor.count();
    res.json({ rows: debtors, totalCount });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};