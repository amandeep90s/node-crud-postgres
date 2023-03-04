const User = require('../models/user');

// CRUD controllers

// get all users
exports.getUsers = (req, res, next) => {
	User.findAll()
		.then((users) => {
			res.status(200).json({ users });
		})
		.catch((error) => console.error(error));
};

// get user by id
exports.getUser = (req, res, next) => {
	const userId = req.params.userId;
	User.findByPk(userId)
		.then((user) => {
			if (!user) {
				return res.status(404).json({ message: 'User not found!' });
			}
			res.status(200).json({ user });
		})
		.catch((error) => console.error(error));
};

// create user
exports.createUser = (req, res, next) => {
	const { name, email } = req.body;
	User.create({ name, email })
		.then((user) =>
			res.status(201).json({ message: 'User created successfully!', user })
		)
		.catch((error) => console.error(error));
};

// update user
exports.updateUser = (req, res, next) => {
	const userId = req.params.userId;
	const { name, email } = req.body;
	User.findByPk(userId)
		.then((user) => {
			if (!user) {
				return res.status(404).json({ message: 'User not found!' });
			}
			user.name = name;
			user.email = email;
			return user.save();
		})
		.then((result) => {
			res.status(200).json({ message: 'User updated!', user: result });
		})
		.catch((error) => console.error(error));
};

// delete user
exports.deleteUser = (req, res, next) => {
	const userId = req.params.userId;
	User.findByPk(userId)
		.then((user) => {
			if (!user) {
				return res.status(404).json({ message: 'User not found!' });
			}
			return User.destroy({ where: { id: userId } });
		})
		.then(() => res.status(200).json({ message: 'User deleted!' }))
		.catch((error) => console.error(error));
};
