const Request = require('../models/request.model');
const User = require('../models/user.model');
const Service = require('../models/service.model');
const Message = require('../models/message.model');
const Enquiry = require('../models/enquiry.model');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const asyncWrapper = require('../utils/asyncWrapper');
const validateObjectId = require('../utils/validateObjectId');

// 1. Admin: List All Requests with filters & search
exports.getAllRequests = asyncWrapper(async (req, res) => {
  const { status, category, search, page = 1, limit = 20 } = req.query;
  const query = {};

  if (status) query.status = status;
  if (category) query.category = category;

  if (search) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [
      { requestNumber: searchRegex },
      { 'contactInfo.name': searchRegex },
      { 'contactInfo.phone': searchRegex },
      { description: searchRegex },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Request.countDocuments(query);
  const requests = await Request.find(query)
    .populate('user', 'name email phone')
    .populate('service', 'title slug')
    .populate('referencePortfolio', 'title images')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  return success(
    res,
    {
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      requests,
    },
    'تم جلب قائمة طلبات العملاء بنجاح'
  );
});

// 2. Admin: Get Full Request Details (Including Messages Thread)
exports.getRequestDetails = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  validateObjectId(id, 'معرف الطلب');

  const request = await Request.findById(id)
    .populate('user', 'name email phone')
    .populate('service', 'title slug basePrice images')
    .populate('referencePortfolio', 'title images')
    .populate('statusHistory.changedBy', 'name role');

  if (!request) {
    throw new AppError('الطلب المطلوب غير موجود', 404);
  }

  // Also fetch discussion messages for this request
  const messages = await Message.find({ request: id })
    .populate('sender', 'name role')
    .sort({ createdAt: 1 });

  return success(
    res,
    {
      request,
      messages,
    },
    'تم جلب تفاصيل الطلب والمحادثة المرتبطة به بنجاح'
  );
});

// 3. Admin Decision (Approve / Reject) — Page 06 requirement
exports.makeDecision = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  validateObjectId(id, 'معرف الطلب');

  const { decision, rejectionReason, approvalNotes, estimatedCost, estimatedDeliveryDate } =
    req.body;

  const request = await Request.findById(id);
  if (!request) {
    throw new AppError('الطلب غير موجود', 404);
  }

  if (decision === 'rejected' && (!rejectionReason || rejectionReason.trim().length === 0)) {
    throw new AppError('يرجى كتابة سبب رفض الطلب لتوضيحه للعميل', 400);
  }

  const newStatus = decision === 'approved' ? 'approved' : 'rejected';
  const statusNote =
    decision === 'approved'
      ? `تمت الموافقة على الطلب من قبل صاحب العمل. ملاحظات: ${approvalNotes || 'جاهز للبدء'}`
      : `تم رفض الطلب. السبب: ${rejectionReason}`;

  request.status = newStatus;
  request.adminFeedback = {
    decision,
    rejectionReason: rejectionReason || '',
    approvalNotes: approvalNotes || '',
    estimatedCost: Number(estimatedCost) || 0,
    estimatedDeliveryDate: estimatedDeliveryDate || '',
    decidedAt: new Date(),
  };

  request.statusHistory.push({
    status: newStatus,
    note: statusNote,
    changedBy: req.user._id,
    changedAt: new Date(),
  });

  await request.save();

  return success(
    res,
    { request },
    decision === 'approved' ? 'تمت الموافقة على الطلب بنجاح' : 'تم تسجيل رفض الطلب مع السبب بنجاح'
  );
});

// 4. Admin: Update Fulfillment Status (e.g. in_production, completed)
exports.updateStatus = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  validateObjectId(id, 'معرف الطلب');

  const { status, note } = req.body;

  const request = await Request.findById(id);
  if (!request) {
    throw new AppError('الطلب غير موجود', 404);
  }

  const statusArabicMap = {
    pending: 'قيد المراجعة',
    approved: 'تمت الموافقة',
    rejected: 'مرفوض',
    in_production: 'قيد التنفيذ والطباعة',
    completed: 'مكتمل وجاهز للتسليم',
    cancelled: 'ملغي',
  };

  request.status = status;
  request.statusHistory.push({
    status,
    note: note || `تم تحديث حالة الطلب إلى: ${statusArabicMap[status] || status}`,
    changedBy: req.user._id,
    changedAt: new Date(),
  });

  await request.save();

  return success(res, { request }, 'تم تحديث مرحلة الطلب بنجاح');
});

// 5. Admin: Dashboard Statistics
exports.getStats = asyncWrapper(async (req, res) => {
  const [
    total,
    pending,
    approved,
    inProduction,
    completed,
    rejected,
    totalUsers,
    totalServices,
    totalEnquiries,
    newEnquiries,
  ] = await Promise.all([
    Request.countDocuments(),
    Request.countDocuments({ status: 'pending' }),
    Request.countDocuments({ status: 'approved' }),
    Request.countDocuments({ status: 'in_production' }),
    Request.countDocuments({ status: 'completed' }),
    Request.countDocuments({ status: 'rejected' }),
    User.countDocuments({ role: 'customer' }),
    Service.countDocuments({ isActive: true }),
    Enquiry.countDocuments(),
    Enquiry.countDocuments({ status: 'new' }),
  ]);

  return success(
    res,
    {
      stats: {
        totalRequests: total,
        pendingRequests: pending,
        approvedRequests: approved,
        inProductionRequests: inProduction,
        completedRequests: completed,
        rejectedRequests: rejected,
        totalCustomers: totalUsers,
        activeServices: totalServices,
        totalEnquiries,
        newEnquiries,
      },
    },
    'تم جلب إحصائيات لوحة التحكم بنجاح'
  );
});
