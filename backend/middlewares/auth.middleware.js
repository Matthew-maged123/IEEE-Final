const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const AppError = require('../utils/AppError');

async function requireAuth(req, res, next) {
  let token = req.cookies?.accessToken;
  const auth = req.headers.authorization;
  if (!token && auth?.startsWith('Bearer ')) {
    token = auth.slice(7);
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'يرجى تسجيل الدخول للوصول إلى هذه الخدمة',
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub || payload.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'رمز الدخول غير صالح أو المستخدم غير موجود',
      });
    }

    if (user.isBanned) {
      return res.status(403).json({
        success: false,
        message: 'تم حظر هذا الحساب، يرجى التواصل مع إدارة يوزرسيف',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'انتهت صلاحية الجلسة، يرجى إعادة تسجيل الدخول',
    });
  }
}

module.exports = { requireAuth };
