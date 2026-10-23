const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'اسم المستخدم مطلوب'],
      trim: true,
      minlength: [2, 'الاسم يجب أن يكون حرفين على الأقل'],
    },
    email: {
      type: String,
      required: [true, 'البريد الإلكتروني مطلوب'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'يرجى إدخال بريد إلكتروني صالح'],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, 'رقم الهاتف مطلوب'],
    },
    password: {
      type: String,
      required: [true, 'كلمة المرور مطلوبة'],
      minlength: [6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'],
      select: false,
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
