const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true
    },
    secondary_email: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    postal_address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    profile_picture_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    dial_code: {
        type: DataTypes.STRING(10),
        allowNull: true
    }
}, {
    tableName: 'Users', // Nom de la table si nécessaire
    timestamps: false // Désactivez les champs createdAt/updatedAt si vous n'en avez pas besoin
});

module.exports = User;
