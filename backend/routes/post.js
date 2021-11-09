const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const token = require('../middleware/auth');
const multer = require('../config/multer-config');

router.get('/', token, postCtrl.getPosts);
router.get('/:id', token, postCtrl.getPostsFrom)
router.get('/reply/:id', token, postCtrl.getReplies)
router.post('/reply', token, postCtrl.reply);
router.delete('/reply/:id', token, postCtrl.deleteReply)
router.post('/new', token, multer, postCtrl.newPost);
router.delete('/:id', token, postCtrl.deletePost);

module.exports = router;