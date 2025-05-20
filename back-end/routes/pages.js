const express = require('express');
const router = express.Router();
const path = require('path');

const credentialsController = require('../controllers/userCredentials');
const loginController = require('../controllers/loginController');
const authenticateUser = require('../middleware/authMiddleware');

const viewsPath = path.join(__dirname, '../../front-end/views');


router.get('/', (req, res) => res.sendFile('index.html', { root: viewsPath }));
router.get('/login', (req, res) => res.sendFile('login.html', { root: viewsPath }));
router.get('/signup', (req, res) => res.sendFile('signup.html', { root: viewsPath }));


router.get('/main', authenticateUser, (req, res) => res.sendFile('main.html', { root: viewsPath }));
router.get('/profile', authenticateUser, (req, res) => res.sendFile('Profile.html', { root: viewsPath }));
router.get('/meal-log', authenticateUser, (req, res) => 
  res.sendFile('MealLog.html', { root: viewsPath })
);
router.get('/calculator', authenticateUser, (req, res) => res.sendFile('Calculator.html', { root: viewsPath }));
router.get('/weight-tracker', authenticateUser, (req, res) => res.sendFile('WeightTracker.html', { root: viewsPath }));
router.get('/activity-log', authenticateUser, (req, res) => res.sendFile('ActivityLog.html', { root: viewsPath }));
router.get('/my-recipe', authenticateUser, (req, res) => res.sendFile('Recipe.html', { root: viewsPath }));


router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});


router.post('/api/credentials', credentialsController.createUser);
router.post('/api/login', loginController.loginUser);

module.exports = router;
