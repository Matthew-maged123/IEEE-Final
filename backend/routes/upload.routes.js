const express = require('express');
const router = express.Router();
const { uploadSingle, uploadArtwork } = require('../middlewares/upload.middleware');
const { requireAuth } = require('../middlewares/auth.middleware');
const { success } = require('../utils/apiResponse');

// Single file upload
router.post('/single', requireAuth, uploadSingle, (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'لم يتم إرفاق أي ملف',
    });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  return success(
    res,
    {
      fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
    'تم رفع الملف بنجاح'
  );
});

// Multiple artwork files upload
router.post('/multiple', requireAuth, uploadArtwork, (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'لم يتم إرفاق أي ملفات',
    });
  }

  const files = req.files.map((f) => ({
    fileUrl: `/uploads/${f.filename}`,
    filename: f.filename,
    originalName: f.originalname,
    size: f.size,
  }));

  return success(res, { files }, 'تم رفع الملفات بنجاح');
});

module.exports = router;
