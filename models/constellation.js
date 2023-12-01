// user_id = foreign key links to user model
// status = pinned note / daily status shown on a users profile. Set max limit of 280 chars like a tweet
// coordinates (x/y) = position of the constellation

const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Constellation extends Model { }

Constellation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        created_date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            validation: {
                len: [2, 280],
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'constellation',
    }
);



module.exports = Constellation;