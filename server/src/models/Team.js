const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Team', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    }, { timestamps: false });
};