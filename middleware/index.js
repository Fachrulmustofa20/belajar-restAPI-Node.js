const express = require('express');
const auth = require('./auth');
let router = express.Router();

router.post('/api/v1/register', auth.register);

module.exports = router;
