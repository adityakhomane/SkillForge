const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');

//only login user
router.get('/protected', verifyToken, (req, res) => {
  res.json({ msg: `Hello ${req.user.id}, you are authorized!` });
});

// and only for admin
router.get('/admin', verifyToken, isAdmin, (req, res) => {
  res.json({ msg: 'Welcome Admin!' });
});

module.exports = router;
