const Sequelize = require('sequelize');
const db = require('./database');

const Student = db.define('students', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '/steve.jpg',
        validate: {
            notEmpty: true
        }
    },
    gpa: {
        type: Sequelize.STRING
    }
});

module.exports = Student;
