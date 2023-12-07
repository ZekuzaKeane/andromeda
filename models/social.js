// model to hold all of the Users' socials / content of the constellations
// twitter validation to ensure provided username is between 1-15 chars, as is required by twitter themself.
// ^^^ same logic behind len validations for other socials
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
      validate: {
        len: [1, 15],
      },
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [1, 30],
      },
    },
    tiktok: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [1, 24],
      },
    },
    youtube: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [1, 30],
      },
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [1, 39],
      },
    },
    twitch: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [1, 25],
      },
    },
    steam: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [2, 32],
      },
    },
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
