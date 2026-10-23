const Enquiry = require('../models/enquiry.model');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const asyncWrapper = require('../utils/asyncWrapper');
const validateObjectId = require('../utils/validateObjectId');

// 1. Public: Submit a General Enquiry (Page 04 requirement: route for people not ready to order)
exports.submitEnquiry = asyncWrapper(async (req, res) => {
  const { name, phone, email, subject, serviceCategory, message } = req.body;

  if (!name || name.trim().length < 2) {
    throw new AppError('يرجى إدخال اسمك للتواصل', 400);
  }

  if (!phone || phone.trim().length < 8) {
    throw new AppError('يرجى إدخال رقم هاتف صالح', 400);
  }

  if (!message || message.trim().length < 5) {
    throw new AppError('يرجى كتابة نص الاستفسار بشكل مفصل (5 أحرف على الأقل)', 400);
  }

  const enquiry = await Enquiry.create({
    name: name.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : '',
    subject: subject ? subject.trim() : 'استفسار عام بخصوص الطباعة والتخصيص',
    serviceCategory: serviceCategory || 'general',
    message: message.trim(),
  });

  return success(
    res,
    { enquiry },
    'تم استلام استفسارك بنجاح! سيتواصل معك فريق يوزرسيف في أقرب وقت عبر واتساب أو الهاتف',
    201
  );
});

// 2. Admin: Get All Enquiries
exports.getAllEnquiries = asyncWrapper(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const query = {};
  if (status) query.status = status;

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Enquiry.countDocuments(query);
  const enquiries = await Enquiry.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  return success(
    res,
    {
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      enquiries,
    },
    'تم جلب قائمة استفسارات العملاء بنجاح'
  );
});

// 3. Admin: Update Enquiry Status
exports.updateEnquiryStatus = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  validateObjectId(id, 'معرف الاستفسار');

  const { status, adminNotes } = req.body;
  if (!['new', 'contacted', 'resolved'].includes(status)) {
    throw new AppError('حالة الاستفسار غير صالحة (new, contacted, resolved)', 400);
  }

  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    throw new AppError('الاستفسار غير موجود', 404);
  }

  enquiry.status = status;
  if (adminNotes !== undefined) {
    enquiry.adminNotes = adminNotes;
  }
  await enquiry.save();

  return success(res, { enquiry }, 'تم تحديث حالة الاستفسار وملاحظات المتابعة بنجاح');
});
