// user_id = foreign key links to user model
// status = pinned note / daily status shown on a users profile. Set max limit of 280 chars like a tweet
// coordinates (x/y) = position of the constellation

const { Model, DataTypes } = require('sequelize');
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            unique: true,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [2, 280],
            },
            references: {
                model: 'status',
                key: 'status',
            }
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