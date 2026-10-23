const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    whatsapp: {
      type: String,
      default: '01116891025',
      trim: true,
    },
    phone: {
      type: String,
      default: '01116891025',
      trim: true,
    },
    email: {
      type: String,
      default: 'contact@userseif.com',
      trim: true,
    },
    address: {
      type: String,
      default: 'أسوان، جمهورية مصر العربية',
    },
    businessName: {
      type: String,
      default: 'يوزرسيف للطباعة والتخصيص',
    },
    aboutText: {
      type: String,
      default:
        'يوزرسيف مشروع متخصص في الطباعة والتخصيص في أسوان. نقدم خدمات طباعة احترافية على الملابس، الهوديز، الكابات، الاستيكرات، المجات، والهدايا الدعائية مع تجربة استلام مميزة وجودة عالية.',
    },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com' },
      instagram: { type: String, default: 'https://instagram.com' },
      tiktok: { type: String, default: '' },
    },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    policies: {
      privacy: { type: String, default: 'نحافظ على سرية وخصوصية تصميمات وبيانات جميع عملائنا.' },
      ordering: {
        type: String,
        default:
          'يتم مراجعة كل طلب من قبل صاحب العمل وإصدار الموافقة وتقدير التكلفة والمدة قبل بدء التنفيذ.',
      },
      quality: {
        type: String,
        default: 'نستخدم أفضل خامات الطباعة المقاومة للغسيل والاستخدام المتكرر.',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);
