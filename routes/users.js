const express = require('express');
const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/users');

const router = express.Router();

// CRUD Routes /users
router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
