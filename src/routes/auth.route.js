const router = require('express').Router();
const { postLogin } = require('../controllers/auth.controller.js');

router.post('/login', postLogin);

module.exports = router;