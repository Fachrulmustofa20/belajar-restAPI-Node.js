const express = require('express');
const auth = require('./auth');
const verification = require('./verification');
let router = express.Router();

router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);

// halaman yang perlu otorisasi
router.get('/api/v1/secret', verification(), auth.secretPage);

module.exports = router;
