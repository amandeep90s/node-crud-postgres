const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const User = db.define('user', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: DataTypes.STRING,
	email: DataTypes.STRING,
});

module.exports = User;
