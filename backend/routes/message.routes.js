const express = require('express');
const router = express.Router({ mergeParams: true });
const messageController = require('../controllers/message.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createMessageSchema } = require('../utils/validations');

router.use(requireAuth);

router.get('/', messageController.getRequestMessages);
router.post('/', validate(createMessageSchema), messageController.sendMessage);

module.exports = router;
