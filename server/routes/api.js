var express = require('express');
var router = express.Router();
var postCtrl = require('../controllers/posts.controller');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/* GET api listing. */
router.get('/posts', (req, res) => {
  return postCtrl.getPosts(req, res);
});

// POST new blog post
router.post('/posts', (req, res) => {
  return postCtrl.create(req, res);
});

module.exports = router;
