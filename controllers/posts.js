const models = require("../models/index.js");
const fs = require("fs");
const Sequelize = require("sequelize");


exports.index = async (req, res, next) => {
  try {
    const posts = await models.Post.findAll();
    for (let post of posts) {
      try {
        const attachment = await models.Attachment.findByPk(post.attachmentId);
        if (attachment) {
          post.datosdeimagen = `data:${attachment.mime};base64,${attachment.image.toString("base64")}`
        } else {
            post.datosdeimagen = '';
        }
      } catch (error) {
        console.log(error)
      }
      if (post.datosdeimagen !== '') {
        console.log(post.id)
      }
    }
    res.render('posts.ejs', { posts } )
  } catch (error) {
    next(error);
  }
};

exports.load = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await models.Post.findByPk(postId);
    if (post) {
      const attachment = await models.Attachment.findByPk(post.attachmentId);
      req.loadedPost = post;
      if (attachment) {
        req.mime = attachment.mime;
        req.image = attachment.image.toString("base64");
      }
      next();
    } else {
      throw createError(404, "There is no post with id=" + postId);
    }
  } catch (error) {
    next(error);
  }
};


exports.attachment = async (req, res, next) => {
  try {
    const post = await models.Post.findByPk(req.params.postId);
    const attachment = await models.Attachment.findByPk(post.attachmentId);
    req.url = attachment.url;
    if (!attachment) {
      res.redirect("../../images/none.jpg");
    } else if (attachment.image) {
      res.type(attachment.mime);
      res.send(attachment.image);
    } else if (attachment.url) {
      res.redirect(attachment.url);
    } else {
      res.redirect("../../images/none.jpg");
    }
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const post = await models.Post.create({
      title,
      body,
    });
    console.log(req)
    if (req.files[0]) {
      const { originalname, mimetype, path } = req.files[0];
      const imageBuffer = fs.readFileSync(path);
      const attachment = await models.Attachment.create({
        url: path,
        mime: mimetype,
        image: imageBuffer,
      });
      const new_attachment = attachment.id;
      await post.update({ attachmentId: new_attachment });
    }
    res.redirect("/posts/" + post.id);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      console.log("There are errors in the form:");
      error.errors.forEach(({ message }) => console.log(message));
      res.render("posts/new", { post });
    } else {
      next(error);
    }
  }
};

exports.update = async (req, res, next) => {
  const post = await models.Post.findByPk(req.params.postId);
  const attachment = await models.Attachment.findByPk(post.attachmentId);
  try {
    post.title = req.body.title;
    post.body = req.body.body;
    if (req.files[0]) {
      if (attachment) {
        delete post.attachmentId;
        await post.save()
        await attachment.destroy();
      }
      const { originalname, mimetype, path } = req.files[0];
      const imageBuffer = fs.readFileSync(path);
      const replace_attachment = await models.Attachment.create({
        url: path,
        mime: mimetype,
        image: imageBuffer,
      });
      const new_attachment = replace_attachment.id;
      await post.update({ attachmentId: new_attachment });
    }
    await post.save({ fields: ["title", "body"] });
    res.redirect("/posts/" + post.id);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      console.log("There are errors in the form:");
      error.errors.forEach(({ message }) => console.log(message));
      res.render("posts/edit", { post });
    } else {
      next(error);
    }
  }
};

exports.destroy = async (req, res, next) => {
    try {
    const post = await models.Post.findByPk(req.params.postId);
    const attachment = await models.Attachment.findByPk(post.attachmentId);
    await post.destroy();
    if (attachment) {
        await attachment.destroy()
    }
    res.redirect('/posts');
    } catch (error) {
    next(error);
    }
   };

