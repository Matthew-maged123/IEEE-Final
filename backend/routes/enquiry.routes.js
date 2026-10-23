const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiry.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');

// Public route: Submit an enquiry
router.post('/', enquiryController.submitEnquiry);

// Admin routes: View & manage enquiries
router.get('/', requireAuth, authorize('admin'), enquiryController.getAllEnquiries);
router.patch('/:id/status', requireAuth, authorize('admin'), enquiryController.updateEnquiryStatus);

module.exports = router;
