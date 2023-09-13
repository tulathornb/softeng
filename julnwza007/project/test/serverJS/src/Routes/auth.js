const express = require('express');
const authcheck = require('../Middleware/auth');
const user = require('../Controllers/auth');
const { RequestUser } = require('../Middleware/auth');

const router = express.Router();

router.post('/signup', user.register);
router.post('/signin', user.login);
router.get('/getuser', authcheck, (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    res.send(req.user);
  } else {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
