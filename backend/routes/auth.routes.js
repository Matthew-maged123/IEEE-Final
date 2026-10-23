const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const loginLimiter = require('../middlewares/loginLimiter.middleware');
const validate = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('../utils/validations');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', loginLimiter, validate(loginSchema), authController.login);
router.get('/me', requireAuth, authController.getMe);
router.put('/profile', requireAuth, authController.updateProfile);
router.put('/password', requireAuth, authController.updatePassword);
router.post('/logout', requireAuth, authController.logout);

module.exports = router;
