const router = require('express').Router();
const { postUser, patchUserPassword } = require('../controllers/user.controller.js');

router.post('/users', postUser);
router.patch('/users', patchUserPassword);

module.exports = router;