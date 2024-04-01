"use strict";
const { Model, DataTypes } = require("sequelize");

// Definition of the Attachment model:
module.exports = (sequelize) => {
  class Attachment extends Model {}
  Attachment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      mime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
      },
    },
    { sequelize, timestamps: true }
  );
  return Attachment;
};
