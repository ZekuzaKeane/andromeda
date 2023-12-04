// Pinned Status/message for profile/constellation display
// status = primary key, so it may be a foreign key to Constellation model 
// ^^^ 280 max char to match twitter

// Should we update the primary key to the ID? if so, will need to update other models' 'status' foreign keys to match

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Status extends Model { }

Status.init(
    {
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            primaryKey: true,
            validate: {
                len: [2, 280],
            },
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
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
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'status',
    }
);


module.exports = Status;