const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');
const validate = require('../middlewares/validate.middleware');
const { adminDecisionSchema, updateStatusSchema } = require('../utils/validations');

// All admin routes require authentication and admin role
router.use(requireAuth, authorize('admin'));

router.get('/stats', adminController.getStats);
router.get('/requests', adminController.getAllRequests);
router.get('/requests/:id', adminController.getRequestDetails);
router.patch(
  '/requests/:id/decision',
  validate(adminDecisionSchema),
  adminController.makeDecision
);
router.patch('/requests/:id/status', validate(updateStatusSchema), adminController.updateStatus);

module.exports = router;
