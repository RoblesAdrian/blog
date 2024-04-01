// Load ORM
const Sequelize = require("sequelize");
const sequelize = new Sequelize("sqlite:blog.sqlite");

const Post = require("./post")(sequelize);
const Attachment = require("./attachment")(sequelize);

Attachment.hasOne(Post, {
  foreignKey: "attachmentId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = { sequelize, Post, Attachment };
