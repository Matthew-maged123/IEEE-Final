const express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');

router.get('/', settingController.getSettings);
router.put('/', requireAuth, authorize('admin'), settingController.updateSettings);

module.exports = router;
