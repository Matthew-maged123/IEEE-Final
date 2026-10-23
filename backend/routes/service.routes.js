const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');
const validate = require('../middlewares/validate.middleware');
const { serviceCreateSchema } = require('../utils/validations');

router.get('/', serviceController.getAllServices);
router.get('/mockup-templates', serviceController.getMockupTemplates);
router.get('/:slug', serviceController.getServiceBySlug);

// Admin CMS Routes
router.post(
  '/',
  requireAuth,
  authorize('admin'),
  validate(serviceCreateSchema),
  serviceController.createService
);
router.put('/:id', requireAuth, authorize('admin'), serviceController.updateService);
router.delete('/:id', requireAuth, authorize('admin'), serviceController.deleteService);

module.exports = router;
