const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { uploadArtwork } = require('../middlewares/upload.middleware');

// Public/Customer: Pre-validation of request readiness (No auth required so customer gets instant feedback in form)
router.post('/validate-readiness', requestController.validateReadiness);

// Public/Customer: Secure guest tracking with requestNumber + phone
router.post('/track', requestController.trackRequest);

// Protected Customer Routes
router.post('/', requireAuth, uploadArtwork, requestController.createRequest);
router.get('/my-requests', requireAuth, requestController.getMyRequests);
router.get('/:id', requireAuth, requestController.getRequestById);
router.get('/:id/whatsapp', requireAuth, requestController.getWhatsAppLink);

module.exports = router;
