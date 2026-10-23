const Portfolio = require('../models/portfolio.model');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const asyncWrapper = require('../utils/asyncWrapper');
const validateObjectId = require('../utils/validateObjectId');

exports.getAllPortfolio = asyncWrapper(async (req, res) => {
  const query = {};
  if (req.query.category) {
    query.category = req.query.category;
  }
  if (req.query.featured === 'true') {
    query.featured = true;
  }

  const items = await Portfolio.find(query)
    .populate('relatedService', 'title slug category')
    .sort({ featured: -1, createdAt: -1 });

  return success(res, { portfolio: items }, 'تم جلب معرض الأعمال بنجاح');
});

exports.getPortfolioById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  validateObjectId(id, 'معرف العمل');

  const item = await Portfolio.findById(id).populate('relatedService', 'title slug category basePrice');
  if (!item) {
    throw new AppError('العمل المطلوب غير موجود في المعرض', 404);
  }

  return success(res, { item }, 'تم جلب تفاصيل العمل بنجاح');
});

exports.createPortfolioItem = asyncWrapper(async (req, res) => {
  const { title, category, description, images, clientName, relatedService, featured, tags } =
    req.body;

  if (!images || (Array.isArray(images) && images.length === 0)) {
    throw new AppError('يجب إرفاق صورة واحدة على الأقل للعمل في المعرض', 400);
  }

  const item = await Portfolio.create({
    title,
    category,
    description,
    images: Array.isArray(images) ? images : [images],
    clientName: clientName || 'عميل يوزرسيف',
    relatedService: relatedService || null,
    featured: Boolean(featured),
    tags: Array.isArray(tags) ? tags : [],
  });

  return success(res, { item }, 'تمت إضافة العمل إلى المعرض بنجاح', 201);
});

exports.deletePortfolioItem = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  validateObjectId(id, 'معرف العمل');

  const item = await Portfolio.findByIdAndDelete(id);
  if (!item) {
    throw new AppError('العمل المطلوب غير موجود في المعرض', 404);
  }

  return success(res, null, 'تم حذف العمل من المعرض بنجاح');
});
