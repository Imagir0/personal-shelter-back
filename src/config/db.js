require('dotenv').config();

const { Sequelize } = require('sequelize');

// Configuration de la connexion à la base de données
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

// Vérifier la connexion à la base de données
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch((err) => console.error('Error: ' + err));

module.exports = sequelize;

