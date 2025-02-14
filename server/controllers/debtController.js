const Debt = require('../models/Debt');



exports.updateDebt = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Debt.update(req.body, { where: { debt_id: id } });

    if (updated) {
      const debt = await Debt.findByPk(id);
      return res.json(debt);
    }
    res.status(404).json({ error: 'Debt not found' });
  } catch (err) {
    res.status(400).json({ error: 'Error updating debt' });
  }
};

exports.deleteDebt = async (req, res) => {
  try {
    const { id } = req.params;
    await Debt.destroy({ where: { debt_id: id } });
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete debt' });
  }
};
