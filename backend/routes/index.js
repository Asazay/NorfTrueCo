const express = require('express');
const router = express.Router();

const { setTokenCookie } = require('../utils/auth.js');
const { User } = require('../db/models');

const apiRouter = require('./api');
router.use('/api', apiRouter);

// backend/routes/index.js
// ...
// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });

// GET /api/set-token-cookie
router.get('/api/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

module.exports = router;