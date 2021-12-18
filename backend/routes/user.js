const express = require('express');
const router = express.Router();


const authCtrl = require('../controllers/user');
const token = require('../middleware/auth');
const multer = require('../config/multer-config');
const email = require('../middleware/emailCheck')

router.post('/signup', email, authCtrl.signup, authCtrl.login);
router.post('/login', authCtrl.login);
router.put('/', multer, token, authCtrl.modify);
router.get('/:id', token, authCtrl.getOne)
router.post('/many', token, authCtrl.getUsers);
router.delete('/:id', token, authCtrl.deleteUser);

module.exports = router;