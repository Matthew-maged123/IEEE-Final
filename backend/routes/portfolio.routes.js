const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');
const validate = require('../middlewares/validate.middleware');
const { portfolioCreateSchema } = require('../utils/validations');

router.get('/', portfolioController.getAllPortfolio);
router.get('/:id', portfolioController.getPortfolioById);

// Admin CMS Routes
router.post(
  '/',
  requireAuth,
  authorize('admin'),
  validate(portfolioCreateSchema),
  portfolioController.createPortfolioItem
);
router.delete('/:id', requireAuth, authorize('admin'), portfolioController.deletePortfolioItem);

module.exports = router;
