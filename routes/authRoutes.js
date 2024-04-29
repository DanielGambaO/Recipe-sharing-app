const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');



// register
router.post('/signup', authController.signup);


// login 
router.post('/login', authController.login);

// logout
router.get('/logout', authController.logout);



module.exports = router;
