const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    requestNumber: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'صاحب الطلب مطلوب'],
      index: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
    serviceTitle: {
      type: String,
      trim: true,
    },
    referencePortfolio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Portfolio',
      default: null,
    },
    category: {
      type: String,
      required: [true, 'فئة الطلب مطلوبة'],
      enum: ['clothing', 'caps', 'stickers', 'mugs', 'gifts', 'phone-cases', 'custom'],
      index: true,
    },
    quantity: {
      type: Number,
      required: [true, 'الكمية المطلوبة يجب ألا تقل عن 1'],
      min: [1, 'الكمية يجب أن تكون 1 على الأقل'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    specifications: {
      sizeBreakdown: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
      color: {
        type: String,
        trim: true,
        default: '',
      },
      printPosition: {
        type: String,
        trim: true,
        default: '',
      },
      dimensions: {
        width: Number,
        height: Number,
        unit: { type: String, default: 'سم' },
      },
      shape: {
        type: String,
        trim: true,
        default: '',
      },
      intendedUse: {
        type: String,
        trim: true,
        default: '',
      },
      phoneModel: {
        type: String,
        trim: true,
        default: '',
      },
      personalizationText: {
        type: String,
        trim: true,
        default: '',
      },
      material: {
        type: String,
        trim: true,
        default: '',
      },
      extraNotes: {
        type: String,
        trim: true,
        default: '',
      },
    },
    artwork: {
      files: {
        type: [String],
        default: [],
      },
      originalFileNames: {
        type: [String],
        default: [],
      },
      needsDesignHelp: {
        type: Boolean,
        default: false,
      },
    },
    mockup: {
      previewImageUrl: {
        type: String,
        default: '',
      },
      productType: {
        type: String,
        default: '',
      },
      printPosition: {
        type: String,
        default: '',
      },
      placement: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        scale: { type: Number, default: 1 },
        rotation: { type: Number, default: 0 },
      },
    },
    contactInfo: {
      name: {
        type: String,
        required: [true, 'اسم العميل مطلوب للتواصل'],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, 'رقم هاتف العميل مطلوب'],
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      preferredContactMethod: {
        type: String,
        enum: ['whatsapp', 'phone', 'email'],
        default: 'whatsapp',
      },
    },
    desiredDate: {
      type: String,
      default: '',
    },
    receiptMethod: {
      type: String,
      enum: ['pickup', 'delivery'],
      default: 'pickup',
    },
    deliveryAddress: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'in_production', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    statusHistory: [
      {
        status: { type: String, required: true },
        note: { type: String, default: '' },
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        changedAt: { type: Date, default: Date.now },
      },
    ],
    adminFeedback: {
      decision: { type: String, default: '' },
      rejectionReason: { type: String, default: '' },
      approvalNotes: { type: String, default: '' },
      estimatedCost: { type: Number, default: 0 },
      estimatedDeliveryDate: { type: String, default: '' },
      decidedAt: { type: Date },
    },
    readinessScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for human-readable next action (Page 04 requirement: "Show current status, notes and next action")
requestSchema.virtual('nextAction').get(function () {
  switch (this.status) {
    case 'pending':
      return 'طلبك قيد المراجعة الفنية من قبل صاحب العمل لتدقيق المواصفات وتقدير السعر والمدة';
    case 'approved':
      return 'تمت الموافقة على طلبك! سيتم التواصل معك عبر الواتساب لتأكيد بدء التنفيذ واستلام العربون إن وُجد';
    case 'rejected':
      return 'تم رفض الطلب لعدم مطابقة المواصفات الفنية للطباعة. يرجى مراجعة سبب الرفض الموضح والتواصل معنا للتعديل';
    case 'in_production':
      return 'طلبك الآن قيد الطباعة والتنفيذ في ورشة يوزرسيف بأسوان بجودة عالية';
    case 'completed':
      return this.receiptMethod === 'delivery'
        ? 'تم الانتهاء من تجهيز طلبك وهو في طريقه إليك مع مندوب التوصيل في أسوان'
        : 'تم الانتهاء من تجهيز طلبك وهو جاهز للاستلام من مقر يوزرسيف بأسوان';
    case 'cancelled':
      return 'تم إلغاء هذا الطلب';
    default:
      return 'جاري المتابعة';
  }
});

module.exports = mongoose.model('Request', requestSchema);
