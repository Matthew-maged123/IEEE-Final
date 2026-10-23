const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'اسم مقدم الاستفسار مطلوب'],
      trim: true,
      minlength: [2, 'الاسم يجب أن يكون حرفين على الأقل'],
    },
    phone: {
      type: String,
      required: [true, 'رقم الهاتف مطلوب للتواصل'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    subject: {
      type: String,
      trim: true,
      default: 'استفسار عام',
    },
    serviceCategory: {
      type: String,
      enum: ['clothing', 'caps', 'stickers', 'mugs', 'gifts', 'phone-cases', 'custom', 'general'],
      default: 'general',
    },
    message: {
      type: String,
      required: [true, 'نص الاستفسار مطلوب'],
      trim: true,
      minlength: [5, 'الاستفسار يجب أن يكون 5 أحرف على الأقل'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'resolved'],
      default: 'new',
      index: true,
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
