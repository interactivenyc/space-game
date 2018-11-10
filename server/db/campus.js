const Sequelize = require('sequelize');
const db = require('./database');

const Campus = db.define('campuses', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: '/campus.jpg'
    }
});

module.exports = Campus;
