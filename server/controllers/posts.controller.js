const mongoose = require('mongoose');
const Post = mongoose.model('Posts');

exports.getPosts = function (req, res) {
  res.send(JSON.stringify({
    user: 'admin',
    postId: 1,
    content: 'This is some post data.'
  }));
};

exports.create = function (req, res) {

  var post = new Post({
    userId: req.body.userId,
    subject: req.body.subject,
    content: req.body.content,
    whenPosted: req.body.whenPosted,
    data: req.body.data
  });

  post.save(function (err, result) {
    
    if (err) {
      res.send({
        error: err.message,
        stack: err.stack
      });
    } else {
      res.send({
        success: true,
        data: result
      });
    }

  });

};
