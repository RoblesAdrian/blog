const multer = require('multer');
const upload = multer({ dest: './public/uploads/', limits: {fileSize: 20 * 1024 * 1024} }); 

var express = require("express");
var router = express.Router();
var postsController = require('../controllers/posts.js');
var authorController = require('../controllers/author.js');

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get('/posts', postsController.index);

router.get('/author', authorController.index);

router.get("/posts/new", function (req, res) {
  res.render("posts/new");
});

router.param('postId', postsController.load);

router.get('/posts/:postId', (req, res) => {
  const loadedPost = req.loadedPost;
  const mime=req.mime;
  const image=req.image;
  res.render('posts/show', { post: loadedPost, imageUrl: `data:${mime};base64,${image}`, mime:mime });
});

router.get('/posts/:postId(\\d+)/attachment', postsController.attachment);

router.get('/posts/:postId(\\d+)/edit', (req, res) => {
  const loadedPost = req.loadedPost;
  const url = req.url;
  res.render('posts/edit', { post: loadedPost, url: url });
});

router.post('/posts', upload.array('photo'), postsController.create)
router.put('/posts/:postId', upload.array('photo'), postsController.update)

router.delete('/posts/:postId', postsController.destroy)

module.exports = router;
