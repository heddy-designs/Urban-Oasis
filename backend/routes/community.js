const router = require('express').Router();
const { protect } = require('../middleware/auth');

let Community;
try { Community = require('../models/Community'); } catch(e) {}

router.get('/', async (req, res) => {
  try {
    if (Community) {
      const posts = await Community.find({ isPublic: true }).sort({ createdAt: -1 }).limit(20);
      return res.json({ success: true, data: posts });
    }
    res.json({ success: true, data: [] });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const { title, description, tags, emoji } = req.body;
    if (!title || !description) return res.status(400).json({ success: false, message: 'Title and description required' });
    if (Community) {
      const post = await Community.create({ user: req.user.id, userName: req.user.name, title, description, tags, emoji: emoji||'🌿' });
      return res.status(201).json({ success: true, data: post });
    }
    res.status(201).json({ success: true, data: { id: Date.now(), title, description } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/:id/like', protect, async (req, res) => {
  try {
    if (Community) {
      const post = await Community.findById(req.params.id);
      const liked = post.likedBy.includes(req.user.id);
      if (liked) { post.likedBy.pull(req.user.id); post.likes--; }
      else { post.likedBy.push(req.user.id); post.likes++; }
      await post.save();
      return res.json({ success: true, likes: post.likes, liked: !liked });
    }
    res.json({ success: true, likes: 1, liked: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/:id/comment', protect, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, message: 'Comment text required' });
    if (Community) {
      const post = await Community.findById(req.params.id);
      post.comments.push({ user: req.user.id, userName: req.user.name, text });
      await post.save();
      return res.json({ success: true, comment: post.comments[post.comments.length-1] });
    }
    res.status(201).json({ success: true, comment: { userName: req.user.name, text, createdAt: new Date() } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
