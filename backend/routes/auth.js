const express = require('express');
const router = express.Router();
require('dotenv').config();


const { register, login, logout, forgotPassword,getProfile,resetPassword, getAllUsers,getUserDetail, updateUser, deleteUser } = require('../controllers/authController');

// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public
const { isAuthenticatedUser, authorizeRoles}= require("../middleware/auth")
router.route('/register').post(register)
router.route('/login').post(login)
// router.route("/password/forgot").post(forgotPassword)
// router.route("/password/reset/:token").put(resetPassword)
router.route('/logout').get(logout)
router.route('/me').get(isAuthenticatedUser,getProfile)
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"),getAllUsers) 
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetail) 
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUser) 
router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser) 



module.exports = router;