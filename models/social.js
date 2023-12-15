const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Social extends Model {}

Social.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    tiktok: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    youtube: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    twitch: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    }, picture: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    // steam: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   unique: true,
    // },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "social",
  }
);

module.exports = Social;
