import express from 'express';import express from 'express';import express from 'express';const express = require('express');const express = require('express');import express from 'express';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';import bcrypt from 'bcryptjs';

import User from '../models/User.js';

import { Op } from 'sequelize';import jwt from 'jsonwebtoken';import bcrypt from 'bcryptjs';



const router = express.Router();import User from '../models/User.js';



router.post('/register', async (req, res) => {import { Op } from 'sequelize';import jwt from 'jsonwebtoken';const bcrypt = require('bcryptjs');

  try {

    const { username, email, password } = req.body;



    if (!username || !email || !password) {const router = express.Router();import { auth } from '../middleware/auth.js';

      return res.status(400).json({

        success: false,

        message: 'Please provide username, email, and password'

      });// @route   POST /api/auth/registerimport User from '../models/User.js';const jwt = require('jsonwebtoken');const router = express.Router();import passport from '../config/passport.js';

    }

// @desc    Register a new user

    if (password.length < 6) {

      return res.status(400).json({// @access  Publicimport { Op } from 'sequelize';

        success: false,

        message: 'Password must be at least 6 characters long'router.post('/register', async (req, res) => {

      });

    }  try {const { auth } = require('../middleware/auth');



    const existingUser = await User.findOne({    const { username, email, password } = req.body;

      where: {

        [Op.or]: [const router = express.Router();

          { email: email.toLowerCase() },

          { username: username.toLowerCase() }    if (!username || !email || !password) {

        ]

      }      return res.status(400).json({const User = require('../models/User');const authController = require('../controllers/authController');import jwt from 'jsonwebtoken';

    });

        success: false,

    if (existingUser) {

      return res.status(400).json({        message: 'Please provide username, email, and password'// @route   POST /api/auth/register

        success: false,

        message: 'User with this email or username already exists'      });

      });

    }    }// @desc    Register a new user



    const saltRounds = 12;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (password.length < 6) {// @access  Public

    const user = await User.create({

      username: username.trim(),      return res.status(400).json({

      email: email.toLowerCase().trim(),

      password: hashedPassword        success: false,router.post('/register', async (req, res) => {const router = express.Router();const authMiddleware = require('../middleware/auth');import { register, login, verifyToken, getProfile, updateProfile } from '../controllers/authController.js';

    });

        message: 'Password must be at least 6 characters long'

    const token = jwt.sign(

      { userId: user.id, email: user.email },      });  try {

      process.env.JWT_SECRET || 'your-secret-key',

      { expiresIn: '7d' }    }

    );

    const { username, email, password } = req.body;

    res.status(201).json({

      success: true,    const existingUser = await User.findOne({

      message: 'User registered successfully',

      token,      where: {

      user: {

        id: user.id,        [Op.or]: [

        username: user.username,

        email: user.email,          { email: email.toLowerCase() },    // Validation// @route   POST /api/auth/registerimport { authenticateToken } from '../middleware/auth.js';

        walletAddress: user.walletAddress,

        createdAt: user.createdAt          { username: username.toLowerCase() }

      }

    });        ]    if (!username || !email || !password) {



  } catch (error) {      }

    console.error('Registration error:', error);

    res.status(500).json({    });      return res.status(400).json({// @desc    Register a new user

      success: false,

      message: 'Server error during registration'

    });

  }    if (existingUser) {        success: false,

});

      return res.status(400).json({

router.post('/login', async (req, res) => {

  try {        success: false,        message: 'Please provide username, email, and password'// @access  Public// Public routes

    const { email, password } = req.body;

        message: 'User with this email or username already exists'

    if (!email || !password) {

      return res.status(400).json({      });      });

        success: false,

        message: 'Please provide email and password'    }

      });

    }    }router.post('/register', async (req, res) => {



    const user = await User.findOne({    const saltRounds = 12;

      where: { email: email.toLowerCase().trim() }

    });    const hashedPassword = await bcrypt.hash(password, saltRounds);



    if (!user) {

      return res.status(400).json({

        success: false,    const user = await User.create({    if (password.length < 6) {  try {router.post('/register', authController.register);const router = express.Router();

        message: 'Invalid email or password'

      });      username: username.trim(),

    }

      email: email.toLowerCase().trim(),      return res.status(400).json({

    const isPasswordValid = await bcrypt.compare(password, user.password);

      password: hashedPassword

    if (!isPasswordValid) {

      return res.status(400).json({    });        success: false,    const { username, email, password } = req.body;

        success: false,

        message: 'Invalid email or password'

      });

    }    const token = jwt.sign(        message: 'Password must be at least 6 characters long'



    await user.update({ lastLogin: new Date() });      { userId: user.id, email: user.email },



    const token = jwt.sign(      process.env.JWT_SECRET || 'your-secret-key',      });router.post('/login', authController.login);

      { userId: user.id, email: user.email },

      process.env.JWT_SECRET || 'your-secret-key',      { expiresIn: '7d' }

      { expiresIn: '7d' }

    );    );    }



    res.json({

      success: true,

      message: 'Login successful',    res.status(201).json({    // Validation

      token,

      user: {      success: true,

        id: user.id,

        username: user.username,      message: 'User registered successfully',    // Check if user already exists

        email: user.email,

        walletAddress: user.walletAddress,      token,

        lastLogin: user.lastLogin,

        createdAt: user.createdAt      user: {    const existingUser = await User.findOne({    if (!username || !email || !password) {// Public routes

      }

    });        id: user.id,



  } catch (error) {        username: user.username,      where: {

    console.error('Login error:', error);

    res.status(500).json({        email: user.email,

      success: false,

      message: 'Server error during login'        walletAddress: user.walletAddress,        [Op.or]: [      return res.status(400).json({

    });

  }        createdAt: user.createdAt

});

      }          { email: email.toLowerCase() },

export default router;
    });

          { username: username.toLowerCase() }        success: false,// Protected routesrouter.post('/register', register);

  } catch (error) {

    console.error('Registration error:', error);        ]

    res.status(500).json({

      success: false,      }        message: 'Please provide username, email, and password'

      message: 'Server error during registration'

    });    });

  }

});      });router.get('/me', authMiddleware, authController.getMe);router.post('/login', login);



// @route   POST /api/auth/login    if (existingUser) {

// @desc    Login user

// @access  Public      return res.status(400).json({    }

router.post('/login', async (req, res) => {

  try {        success: false,

    const { email, password } = req.body;

        message: 'User with this email or username already exists'router.get('/verify', verifyToken);

    if (!email || !password) {

      return res.status(400).json({      });

        success: false,

        message: 'Please provide email and password'    }    if (password.length < 6) {

      });

    }



    const user = await User.findOne({    // Hash password      return res.status(400).json({module.exports = router;

      where: { email: email.toLowerCase().trim() }

    });    const saltRounds = 12;



    if (!user) {    const hashedPassword = await bcrypt.hash(password, saltRounds);        success: false,// Google OAuth routes

      return res.status(400).json({

        success: false,

        message: 'Invalid email or password'

      });    // Create user        message: 'Password must be at least 6 characters long'router.get('/google', 

    }

    const user = await User.create({

    const isPasswordValid = await bcrypt.compare(password, user.password);

      username: username.trim(),      });  passport.authenticate('google', { scope: ['profile', 'email'] })

    if (!isPasswordValid) {

      return res.status(400).json({      email: email.toLowerCase().trim(),

        success: false,

        message: 'Invalid email or password'      password: hashedPassword    });

      });

    }    });



    await user.update({ lastLogin: new Date() });



    const token = jwt.sign(    // Generate JWT token

      { userId: user.id, email: user.email },

      process.env.JWT_SECRET || 'your-secret-key',    const token = jwt.sign(    // Check if user already existsrouter.get('/google/callback',

      { expiresIn: '7d' }

    );      { userId: user.id, email: user.email },



    res.json({      process.env.JWT_SECRET || 'your-secret-key',    const existingUser = await User.findOne({  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login?error=google_failed' }),

      success: true,

      message: 'Login successful',      { expiresIn: '7d' }

      token,

      user: {    );      where: {  async (req, res) => {

        id: user.id,

        username: user.username,

        email: user.email,

        walletAddress: user.walletAddress,    res.status(201).json({        [require('sequelize').Op.or]: [    try {

        lastLogin: user.lastLogin,

        createdAt: user.createdAt      success: true,

      }

    });      message: 'User registered successfully',          { email: email.toLowerCase() },      // Generate JWT token for the user



  } catch (error) {      token,

    console.error('Login error:', error);

    res.status(500).json({      user: {          { username: username.toLowerCase() }      const token = jwt.sign(

      success: false,

      message: 'Server error during login'        id: user.id,

    });

  }        username: user.username,        ]        { userId: req.user.id, email: req.user.email },

});

        email: user.email,

export default router;
        walletAddress: user.walletAddress,      }        process.env.JWT_SECRET,

        createdAt: user.createdAt

      }    });        { expiresIn: '7d' }

    });

      );

  } catch (error) {

    console.error('Registration error:', error);    if (existingUser) {

    res.status(500).json({

      success: false,      return res.status(400).json({      // Redirect to frontend with token

      message: 'Server error during registration'

    });        success: false,      res.redirect(`http://localhost:3000/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`);

  }

});        message: 'User with this email or username already exists'    } catch (error) {



// @route   POST /api/auth/login      });      console.error('Google callback error:', error);

// @desc    Login user

// @access  Public    }      res.redirect('http://localhost:3000/login?error=auth_failed');

router.post('/login', async (req, res) => {

  try {    }

    const { email, password } = req.body;

    // Hash password  }

    // Validation

    if (!email || !password) {    const saltRounds = 12;);

      return res.status(400).json({

        success: false,    const hashedPassword = await bcrypt.hash(password, saltRounds);

        message: 'Please provide email and password'

      });// Protected routes

    }

    // Create userrouter.get('/profile', authenticateToken, getProfile);

    // Find user by email

    const user = await User.findOne({    const user = await User.create({router.put('/profile', authenticateToken, updateProfile);

      where: { email: email.toLowerCase().trim() }

    });      username: username.trim(),



    if (!user) {      email: email.toLowerCase().trim(),export default router;

      return res.status(400).json({

        success: false,      password: hashedPassword

        message: 'Invalid email or password'    });

      });

    }    // Generate JWT token

    const token = jwt.sign(

    // Check password      { userId: user.id, email: user.email },

    const isPasswordValid = await bcrypt.compare(password, user.password);      process.env.JWT_SECRET || 'your-secret-key',

      { expiresIn: '7d' }

    if (!isPasswordValid) {    );

      return res.status(400).json({

        success: false,    res.status(201).json({

        message: 'Invalid email or password'      success: true,

      });      message: 'User registered successfully',

    }      token,

      user: {

    // Update last login        id: user.id,

    await user.update({ lastLogin: new Date() });        username: user.username,

        email: user.email,

    // Generate JWT token        walletAddress: user.walletAddress,

    const token = jwt.sign(        createdAt: user.createdAt

      { userId: user.id, email: user.email },      }

      process.env.JWT_SECRET || 'your-secret-key',    });

      { expiresIn: '7d' }

    );  } catch (error) {

    console.error('Registration error:', error);

    res.json({    res.status(500).json({

      success: true,      success: false,

      message: 'Login successful',      message: 'Server error during registration'

      token,    });

      user: {  }

        id: user.id,});

        username: user.username,

        email: user.email,// @route   POST /api/auth/login

        walletAddress: user.walletAddress,// @desc    Login user

        lastLogin: user.lastLogin,// @access  Public

        createdAt: user.createdAtrouter.post('/login', async (req, res) => {

      }  try {

    });    const { email, password } = req.body;



  } catch (error) {    // Validation

    console.error('Login error:', error);    if (!email || !password) {

    res.status(500).json({      return res.status(400).json({

      success: false,        success: false,

      message: 'Server error during login'        message: 'Please provide email and password'

    });      });

  }    }

});

    // Find user by email

// @route   GET /api/auth/me    const user = await User.findOne({

// @desc    Get current user      where: { email: email.toLowerCase().trim() }

// @access  Private    });

router.get('/me', auth, async (req, res) => {

  try {    if (!user) {

    const user = await User.findByPk(req.user.id, {      return res.status(400).json({

      attributes: { exclude: ['password'] }        success: false,

    });        message: 'Invalid email or password'

      });

    if (!user) {    }

      return res.status(404).json({

        success: false,    // Check password

        message: 'User not found'    const isPasswordValid = await bcrypt.compare(password, user.password);

      });

    }    if (!isPasswordValid) {

      return res.status(400).json({

    res.json({        success: false,

      success: true,        message: 'Invalid email or password'

      user: {      });

        id: user.id,    }

        username: user.username,

        email: user.email,    // Update last login

        walletAddress: user.walletAddress,    await user.update({ lastLogin: new Date() });

        lastLogin: user.lastLogin,

        createdAt: user.createdAt    // Generate JWT token

      }    const token = jwt.sign(

    });      { userId: user.id, email: user.email },

      process.env.JWT_SECRET || 'your-secret-key',

  } catch (error) {      { expiresIn: '7d' }

    console.error('Get user error:', error);    );

    res.status(500).json({

      success: false,    res.json({

      message: 'Server error fetching user data'      success: true,

    });      message: 'Login successful',

  }      token,

});      user: {

        id: user.id,

// @route   PUT /api/auth/profile        username: user.username,

// @desc    Update user profile        email: user.email,

// @access  Private        walletAddress: user.walletAddress,

router.put('/profile', auth, async (req, res) => {        lastLogin: user.lastLogin,

  try {        createdAt: user.createdAt

    const { username, walletAddress } = req.body;      }

    const userId = req.user.id;    });



    const updateData = {};  } catch (error) {

        console.error('Login error:', error);

    if (username) {    res.status(500).json({

      // Check if username is already taken      success: false,

      const existingUser = await User.findOne({      message: 'Server error during login'

        where: {     });

          username: username.toLowerCase().trim(),  }

          id: { [Op.ne]: userId }});

        }

      });// @route   GET /api/auth/me

// @desc    Get current user

      if (existingUser) {// @access  Private

        return res.status(400).json({router.get('/me', auth, async (req, res) => {

          success: false,  try {

          message: 'Username is already taken'    const user = await User.findByPk(req.user.id, {

        });      attributes: { exclude: ['password'] }

      }    });



      updateData.username = username.trim();    if (!user) {

    }      return res.status(404).json({

        success: false,

    if (walletAddress) {        message: 'User not found'

      updateData.walletAddress = walletAddress.trim();      });

    }    }



    await User.update(updateData, { where: { id: userId } });    res.json({

      success: true,

    const updatedUser = await User.findByPk(userId, {      user: {

      attributes: { exclude: ['password'] }        id: user.id,

    });        username: user.username,

        email: user.email,

    res.json({        walletAddress: user.walletAddress,

      success: true,        lastLogin: user.lastLogin,

      message: 'Profile updated successfully',        createdAt: user.createdAt

      user: {      }

        id: updatedUser.id,    });

        username: updatedUser.username,

        email: updatedUser.email,  } catch (error) {

        walletAddress: updatedUser.walletAddress,    console.error('Get user error:', error);

        lastLogin: updatedUser.lastLogin,    res.status(500).json({

        createdAt: updatedUser.createdAt      success: false,

      }      message: 'Server error fetching user data'

    });    });

  }

  } catch (error) {});

    console.error('Profile update error:', error);

    res.status(500).json({// @route   PUT /api/auth/profile

      success: false,// @desc    Update user profile

      message: 'Server error updating profile'// @access  Private

    });router.put('/profile', auth, async (req, res) => {

  }  try {

});    const { username, walletAddress } = req.body;

    const userId = req.user.id;

// @route   POST /api/auth/logout

// @desc    Logout user (client-side token removal)    const updateData = {};

// @access  Private    

router.post('/logout', auth, (req, res) => {    if (username) {

  res.json({      // Check if username is already taken

    success: true,      const existingUser = await User.findOne({

    message: 'Logged out successfully'        where: { 

  });          username: username.toLowerCase().trim(),

});          id: { [require('sequelize').Op.ne]: userId }

        }

export default router;      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username is already taken'
        });
      }

      updateData.username = username.trim();
    }

    if (walletAddress) {
      updateData.walletAddress = walletAddress.trim();
    }

    await User.update(updateData, { where: { id: userId } });

    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        walletAddress: updatedUser.walletAddress,
        lastLogin: updatedUser.lastLogin,
        createdAt: updatedUser.createdAt
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating profile'
    });
  }
});

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Get user with password
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await user.update({ password: hashedNewPassword });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error changing password'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', auth, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;