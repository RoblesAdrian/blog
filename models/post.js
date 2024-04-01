"use strict";
const { Model, DataTypes } = require("sequelize");

// Definition of the Post model:
module.exports = (sequelize) => {
  class Post extends Model {}
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      attachmentId: {
        type: DataTypes.INTEGER,
      },
    },
    { sequelize, timestamps: true }
  );
  return Post;
};
