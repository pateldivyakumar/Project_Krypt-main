import jwt from 'jsonwebtoken';const jwt = require('jsonwebtoken');const jwt = require('jsonwebtoken');import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const User = require('../models/User');

export const auth = async (req, res, next) => {

  try {

    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Middleware to verify JWT token

    if (!token) {

      return res.status(401).json({ const auth = async (req, res, next) => {const authMiddleware = (req, res, next) => {export const authenticateToken = (req, res, next) => {

        success: false, 

        message: 'No token provided, authorization denied'   try {

      });

    }    // Get token from header  try {  const authHeader = req.headers['authorization'];



    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');    const token = req.header('Authorization')?.replace('Bearer ', '');

    

    const user = await User.findByPk(decoded.userId, {        // Get token from header  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

      attributes: { exclude: ['password'] }

    });    if (!token) {

    

    if (!user) {      return res.status(401).json({     const authHeader = req.header('Authorization');

      return res.status(401).json({ 

        success: false,         success: false, 

        message: 'Token is not valid' 

      });        message: 'No token provided, authorization denied'       if (!token) {

    }

      });

    req.user = user;

    next();    }    if (!authHeader) {    return res.status(401).json({

  } catch (error) {

    console.error('Auth middleware error:', error);

    

    if (error.name === 'JsonWebTokenError') {    // Verify token      return res.status(401).json({      success: false,

      return res.status(401).json({ 

        success: false,     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

        message: 'Invalid token' 

      });            success: false,      message: 'Access token required'

    }

        // Find user by ID and attach to request

    if (error.name === 'TokenExpiredError') {

      return res.status(401).json({     const user = await User.findById(decoded.userId).select('-password');        message: 'No token, authorization denied'    });

        success: false, 

        message: 'Token expired'     

      });

    }    if (!user) {      });  }

    

    res.status(500).json({       return res.status(401).json({ 

      success: false, 

      message: 'Server error in authentication'         success: false,     }

    });

  }        message: 'Token is not valid' 

};
      });  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {

    }

    // Check if header starts with 'Bearer '    if (err) {

    req.user = user;

    next();    if (!authHeader.startsWith('Bearer ')) {      return res.status(403).json({

  } catch (error) {

    console.error('Auth middleware error:', error);      return res.status(401).json({        success: false,

    

    if (error.name === 'JsonWebTokenError') {        success: false,        message: 'Invalid or expired token'

      return res.status(401).json({ 

        success: false,         message: 'Invalid token format'      });

        message: 'Invalid token' 

      });      });    }

    }

        }

    if (error.name === 'TokenExpiredError') {

      return res.status(401).json({     req.user = user;

        success: false, 

        message: 'Token expired'     // Extract token    next();

      });

    }    const token = authHeader.substring(7);  });

    

    res.status(500).json({ };

      success: false, 

      message: 'Server error in authentication'     if (!token) {

    });

  }      return res.status(401).json({export const optionalAuth = (req, res, next) => {

};

        success: false,  const authHeader = req.headers['authorization'];

// Optional middleware - doesn't require authentication but adds user if token is valid

const optionalAuth = async (req, res, next) => {        message: 'No token, authorization denied'  const token = authHeader && authHeader.split(' ')[1];

  try {

    const token = req.header('Authorization')?.replace('Bearer ', '');      });

    

    if (token) {    }  if (token) {

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

      const user = await User.findById(decoded.userId).select('-password');    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {

      

      if (user) {    try {      if (!err) {

        req.user = user;

      }      // Verify token        req.user = user;

    }

          const decoded = jwt.verify(token, process.env.JWT_SECRET || 'quantum_secret');      }

    next();

  } catch (error) {      req.user = decoded;    });

    // If token is invalid, just continue without user

    next();      next();  }

  }

};    } catch (error) {  



// Middleware to check if user is admin      res.status(401).json({  next();

const adminAuth = async (req, res, next) => {

  try {        success: false,};

    if (!req.user) {

      return res.status(401).json({         message: 'Token is not valid'

        success: false,       });

        message: 'Access denied'     }

      });  } catch (error) {

    }    console.error('Auth middleware error:', error);

    res.status(500).json({

    if (req.user.role !== 'admin') {      success: false,

      return res.status(403).json({       message: 'Server error'

        success: false,     });

        message: 'Admin access required'   }

      });};

    }

module.exports = authMiddleware;
    next();
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error in admin authentication' 
    });
  }
};

module.exports = {
  auth,
  optionalAuth,
  adminAuth
};