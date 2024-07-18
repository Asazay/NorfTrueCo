// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const itemRouter = require('./items.js');
const reviewRouter = require('./reviews.js')
const orderRouter = require('./orders.js')
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/items', itemRouter);

router.use('/reviews', reviewRouter)

router.use('/orders', orderRouter)

module.exports = router;