const router = require('express').Router();
const { protect } = require('../middleware/auth');

let Schedule;
try { Schedule = require('../models/Schedule'); } catch(e) {}

router.get('/', protect, async (req, res) => {
  try {
    if (Schedule) {
      const schedules = await Schedule.find({ user: req.user.id }).sort({ date: 1 });
      return res.json({ success: true, data: schedules });
    }
    res.json({ success: true, data: [] });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const { plant, type, date, time, notes, recurring, recurringFrequency } = req.body;
    if (!plant || !type || !date) return res.status(400).json({ success: false, message: 'Plant, type, and date required' });
    if (Schedule) {
      const schedule = await Schedule.create({ user: req.user.id, plant, type, date, time: time||'07:00', notes, recurring, recurringFrequency });
      return res.status(201).json({ success: true, data: schedule });
    }
    res.status(201).json({ success: true, data: { id: Date.now(), plant, type, date, time } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.patch('/:id/complete', protect, async (req, res) => {
  try {
    if (Schedule) {
      const schedule = await Schedule.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { done: true, completedAt: new Date() },
        { new: true }
      );
      return res.json({ success: true, data: schedule });
    }
    res.json({ success: true, message: 'Task completed' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    if (Schedule) await Schedule.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
