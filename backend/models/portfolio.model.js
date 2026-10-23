const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'عنوان العمل مطلوب'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'فئة العمل مطلوبة'],
      enum: ['clothing', 'caps', 'stickers', 'mugs', 'gifts', 'phone-cases', 'custom'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'وصف العمل مطلوب'],
    },
    images: {
      type: [String],
      required: [true, 'صور العمل مطلوبة'],
      validate: [(val) => val.length > 0, 'يجب إرفاق صورة واحدة على الأقل للعمل'],
    },
    clientName: {
      type: String,
      trim: true,
      default: 'عميل يوزرسيف',
    },
    relatedService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
