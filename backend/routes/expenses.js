const router = require('express').Router();
const { protect } = require('../middleware/auth');

let Expense;
try { Expense = require('../models/Expense'); } catch(e) {}

// GET /api/expenses
router.get('/', protect, async (req, res) => {
  try {
    if (Expense) {
      const { category, month, year } = req.query;
      let query = { user: req.user.id };
      if (category) query.category = category;
      if (month && year) {
        const start = new Date(year, month-1, 1);
        const end = new Date(year, month, 0);
        query.date = { $gte: start, $lte: end };
      }
      const expenses = await Expense.find(query).sort({ date: -1 });
      const total = expenses.reduce((s, e) => s + e.amount, 0);
      return res.json({ success: true, data: expenses, total });
    }
    res.json({ success: true, data: [], total: 0 });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/expenses
router.post('/', protect, async (req, res) => {
  try {
    const { item, category, amount, date, shop, notes } = req.body;
    if (!item || !category || !amount) return res.status(400).json({ success: false, message: 'Item, category, and amount required' });
    if (Expense) {
      const expense = await Expense.create({ user: req.user.id, item, category, amount, date: date||new Date(), shop, notes });
      return res.status(201).json({ success: true, data: expense });
    }
    res.status(201).json({ success: true, data: { id: Date.now(), item, category, amount, date, shop } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/expenses/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    if (Expense) {
      await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    }
    res.json({ success: true, message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
