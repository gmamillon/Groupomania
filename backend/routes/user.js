const express = require('express');
const router = express.Router();


const authCtrl = require('../controllers/user');
const token = require('../middleware/auth');
const multer = require('../config/multer-config');

router.post('/signup', authCtrl.signup, authCtrl.login);
router.post('/login', authCtrl.login);
router.put('/', token, multer, authCtrl.modify);
router.get('/', token, authCtrl.getUser);
router.delete('/', token, authCtrl.deleteUser);

module.exports = router;