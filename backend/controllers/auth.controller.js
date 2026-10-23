const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const asyncWrapper = require('../utils/asyncWrapper');

function signToken(user) {
  return jwt.sign(
    {
      id: user._id,
      sub: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

exports.register = asyncWrapper(async (req, res) => {
  const { name, email, phone, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError('البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول', 409);
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role: 'customer',
  });

  const token = signToken(user);

  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

  return success(res, { user: userData, token }, 'تم إنشاء الحساب بنجاح، أهلاً بك في يوزرسيف', 201);
});

exports.login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError('بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور', 401);
  }

  if (user.isBanned) {
    throw new AppError('تم حظر هذا الحساب، يرجى التواصل مع إدارة يوزرسيف', 403);
  }

  const token = signToken(user);

  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

  return success(res, { user: userData, token }, 'تم تسجيل الدخول بنجاح');
});

exports.getMe = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  return success(res, { user }, 'تم جلب بيانات المستخدم بنجاح');
});

exports.updateProfile = asyncWrapper(async (req, res) => {
  const { name, phone } = req.body;
  const updates = {};
  if (name && name.trim().length >= 2) updates.name = name.trim();
  if (phone && phone.trim().length >= 8) updates.phone = phone.trim();

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  }).select('-password');

  return success(res, { user }, 'تم تحديث بيانات الملف الشخصي بنجاح');
});

exports.updatePassword = asyncWrapper(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new AppError('يرجى إدخال كلمة المرور الحالية وكلمة المرور الجديدة', 400);
  }

  if (newPassword.length < 6) {
    throw new AppError('كلمة المرور الجديدة يجب ألا تقل عن 6 أحرف', 400);
  }

  const user = await User.findById(req.user._id).select('+password');
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new AppError('كلمة المرور الحالية غير صحيحة', 401);
  }

  user.password = newPassword;
  await user.save();

  return success(res, null, 'تم تغيير كلمة المرور بنجاح');
});

exports.logout = asyncWrapper(async (req, res) => {
  res.clearCookie('accessToken');
  return success(res, null, 'تم تسجيل الخروج بنجاح');
});
