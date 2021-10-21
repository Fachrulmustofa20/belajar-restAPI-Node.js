const express = require('express');
const auth = require('./auth');
let router = express.Router();

router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);

module.exports = router;
