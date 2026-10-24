const slugify = require('slugify');
const Service = require('../models/service.model');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const asyncWrapper = require('../utils/asyncWrapper');
const validateObjectId = require('../utils/validateObjectId');

// Official Mockup Canvas Specifications for UserSeif (Aswan Printing)
const MOCKUP_TEMPLATES = {
  clothing: {
    productName: 'تيشيرت / هودي مخصص',
    views: [
      {
        id: 'chest',
        name: 'الصدر (Front Center)',
        canvasImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        printableArea: { topPercent: 25, leftPercent: 30, widthPercent: 40, heightPercent: 45 },
      },
      {
        id: 'back',
        name: 'الظهر (Back)',
        canvasImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
        printableArea: { topPercent: 20, leftPercent: 25, widthPercent: 50, heightPercent: 50 },
      },
      {
        id: 'pocket',
        name: 'الجيب الأيسر (Left Chest)',
        canvasImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        printableArea: { topPercent: 24, leftPercent: 55, widthPercent: 18, heightPercent: 20 },
      },
    ],
    availableColors: ['#111111', '#ffffff', '#1b2a4a', '#808080', '#e0d8b0'],
  },
  mugs: {
    productName: 'مج سيراميك / سحري',
    views: [
      {
        id: 'front',
        name: 'الواجهة الأمامية للمج',
        canvasImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
        printableArea: { topPercent: 28, leftPercent: 26, widthPercent: 42, heightPercent: 48 },
      },
    ],
    availableColors: ['#ffffff', '#111111'],
  },
  caps: {
    productName: 'كاب شبابي مطبوع',
    views: [
      {
        id: 'front',
        name: 'مقدمة الكاب (Front Crown)',
        canvasImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
        printableArea: { topPercent: 35, leftPercent: 32, widthPercent: 36, heightPercent: 32 },
      },
    ],
    availableColors: ['#111111', '#1b2a4a', '#ffffff'],
  },
  'phone-cases': {
    productName: 'كفر موبايل سيليكون / صلب',
    views: [
      {
        id: 'back',
        name: 'ظهر الكفر بالكامل',
        canvasImage: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop&q=80',
        printableArea: { topPercent: 10, leftPercent: 12, widthPercent: 76, heightPercent: 80 },
      },
    ],
  },
  stickers: {
    productName: 'استيكر فينيل مفرغ',
    views: [
      {
        id: 'laptop',
        name: 'معاينة على سطح لابتوب',
        canvasImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
        printableArea: { topPercent: 30, leftPercent: 35, widthPercent: 30, heightPercent: 35 },
      },
    ],
  },
};

exports.getAllServices = asyncWrapper(async (req, res) => {
  const query = {};
  if (!req.user || req.user.role !== 'admin') {
    query.isActive = true;
  }
  if (req.query.category) {
    query.category = req.query.category;
  }

  const services = await Service.find(query).sort({ displayOrder: 1, createdAt: -1 });
  return success(res, { services }, 'تم جلب قائمة الخدمات بنجاح');
});

exports.getMockupTemplates = asyncWrapper(async (req, res) => {
  const { category } = req.query;
  if (category && MOCKUP_TEMPLATES[category]) {
    return success(res, { templates: { [category]: MOCKUP_TEMPLATES[category] } }, 'تم جلب قوالب المعاينة بنجاح');
  }
  return success(res, { templates: MOCKUP_TEMPLATES }, 'تم جلب جميع قوالب المعاينة الحية بنجاح');
});

exports.getServiceBySlug = asyncWrapper(async (req, res) => {
  const { slug } = req.params;
  const service = await Service.findOne({ slug });

  if (!service) {
    throw new AppError('الخدمة المطلوبة غير موجودة', 404);
  }

  return success(res, { service }, 'تم جلب تفاصيل الخدمة بنجاح');
});

exports.createService = asyncWrapper(async (req, res) => {
  const { title, category, description, basePrice, options, images, variants, isActive } = req.body;

  let baseSlug = slugify(title, { lower: true, strict: false, trim: true }) || 'service';
  if (!baseSlug || baseSlug === 'service') {
    baseSlug = `service-${category}-${Date.now().toString().slice(-4)}`;
  }

  let slug = baseSlug;
  let count = 1;
  while (await Service.findOne({ slug })) {
    slug = `${baseSlug}-${count++}`;
  }

  const service = await Service.create({
    title,
    slug,
    category,
    description,
    basePrice: Number(basePrice) || 0,
    options: options || {},
    images: Array.isArray(images) ? images : [],
    variants: Array.isArray(variants) ? variants : [],
    isActive: isActive !== undefined ? isActive : true,
  });

  return success(res, { service }, 'تمت إضافة الخدمة بنجاح', 201);
});

exports.updateService = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  validateObjectId(id, 'معرف الخدمة');

  const service = await Service.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    throw new AppError('الخدمة المطلوبة غير موجودة', 404);
  }

  return success(res, { service }, 'تم تحديث بيانات الخدمة بنجاح');
});

exports.deleteService = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  validateObjectId(id, 'معرف الخدمة');

  const service = await Service.findByIdAndDelete(id);
  if (!service) {
    throw new AppError('الخدمة المطلوبة غير موجودة', 404);
  }

  return success(res, null, 'تم حذف الخدمة بنجاح');
});
