const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    logger.warn(`File too large error: ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    return res.status(413).json({
      success: false,
      message: 'حجم الملف المرفق كبير جداً. الحد الأقصى المسموح به هو 25 ميجابايت.',
    });
  }

  if (err.message && (err.message.includes('نوع الملف غير مدعوم') || err.message.includes('File type'))) {
    logger.warn(`Invalid file type error: ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    return res.status(415).json({
      success: false,
      message: err.message || 'نوع الملف غير مدعوم.',
    });
  }

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || '';
    logger.warn(`Duplicate key error on field: ${field}`);
    const fieldArabic =
      field === 'email' ? 'البريد الإلكتروني' : field === 'requestNumber' ? 'رقم الطلب' : field;
    return res.status(409).json({
      success: false,
      message: `${fieldArabic} مسجل بالفعل، يرجى استخدام قيمة أخرى`,
    });
  }

  const status = err.status || 500;
  const message =
    status === 500
      ? 'حدث خطأ غير متوقع في الخادم، يرجى المحاولة لاحقاً'
      : err.message || 'حدث خطأ في معالجة طلبك';

  // Log in English to console and files
  if (status >= 500) {
    logger.error(
      `ServerError: ${status} - ${err.message || 'Internal Server Error'} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      { error: err }
    );
  } else {
    logger.warn(
      `ClientWarn: ${status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }

  const meta = {};
  if (process.env.NODE_ENV === 'development') {
    meta.errorDetails = err.message;
    meta.stack = err.stack;
  }

  return res.status(status).json({
    success: false,
    message,
    meta: Object.keys(meta).length > 0 ? meta : undefined,
  });
};
