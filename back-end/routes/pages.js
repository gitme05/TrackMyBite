const express = require('express');
const router = express.Router();
const path = require('path');

const credentialsController = require('../controllers/userCredentials');
const loginController = require('../controllers/loginController'); 
const viewsPath = path.join(__dirname, '../../front-end/views');

router.get('/login', (req, res) => res.sendFile('login.html', { root: viewsPath }));
router.get('/signup', (req, res) => res.sendFile('signup.html', { root: viewsPath }));
router.get('/main', (req, res) => res.sendFile('main.html', { root: viewsPath }));
router.get('/profile', (req, res) => res.sendFile('Profile.html', { root: viewsPath }));
router.get('/preferences', (req, res) => res.sendFile('Preferences.html', { root: viewsPath }));
router.get('/user-demographic', (req, res) => res.sendFile('userDemographic.html', { root: viewsPath }));
router.get('/weight-tracker', (req, res) => res.sendFile('WeightTracker.html', { root: viewsPath }));
router.get('/activity-log', (req, res) => res.sendFile('ActivityLog.html', { root: viewsPath }));
router.get('/', (req, res) => res.sendFile('index.html', { root: viewsPath }));


router.post('/api/credentials', credentialsController.createUser); 
router.post('/api/login', loginController.loginUser); 

module.exports = router;