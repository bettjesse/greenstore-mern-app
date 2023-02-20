const express = require('express');
const router = express.Router();
require('dotenv').config();


const { register, login, logout } = require('../controllers/authController');

// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)

module.exports = router;
