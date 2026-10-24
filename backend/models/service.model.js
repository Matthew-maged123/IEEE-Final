const mongoose = require('mongoose');

const variantSizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    colorName: {
      type: String,
      required: true,
      trim: true,
    },
    colorHex: {
      type: String,
      default: '#000000',
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [variantSizeSchema],
      default: [],
    },
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'عنوان الخدمة مطلوب'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, 'فئة الخدمة مطلوبة'],
      enum: ['clothing', 'caps', 'stickers', 'mugs', 'gifts', 'phone-cases', 'custom'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'وصف الخدمة مطلوب'],
    },
    images: {
      type: [String],
      default: [],
    },
    basePrice: {
      type: Number,
      default: 0,
    },
    options: {
      sizes: [String],
      colors: [String],
      printPositions: [String],
      materials: [String],
      shapes: [String],
      customFields: [
        {
          name: String,
          label: String,
          type: { type: String, default: 'text' },
          required: Boolean,
          options: [String],
        },
      ],
    },
    variants: {
      type: [variantSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
