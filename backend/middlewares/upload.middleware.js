const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Disk Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${safeBase}-${uniqueSuffix}${ext}`);
  },
});

const ALLOWED_MIMES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
  'application/postscript', // AI / EPS
  'image/vnd.adobe.photoshop', // PSD
  'application/x-photoshop',
  'application/zip',
  'application/x-zip-compressed',
  'application/octet-stream',
]);

const ALLOWED_EXTS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.svg',
  '.pdf',
  '.ai',
  '.eps',
  '.psd',
  '.zip',
  '.rar',
]);

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_MIMES.has(file.mimetype) || ALLOWED_EXTS.has(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'نوع الملف غير مدعوم. الصيغ المسموحة هي: الصور (JPG, PNG, WEBP, SVG) أو ملفات التصميم (PDF, AI, PSD, ZIP)'
      ),
      false
    );
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB limit
  fileFilter,
});

// Helper wrappers
const uploadArtwork = upload.array('artworkFiles', 5);
const uploadSingle = upload.single('file');
const uploadPortfolioImages = upload.array('portfolioImages', 6);

module.exports = {
  upload,
  uploadArtwork,
  uploadSingle,
  uploadPortfolioImages,
};
