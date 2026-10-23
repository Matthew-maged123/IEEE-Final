const Request = require('../models/request.model');
const Service = require('../models/service.model');
const Portfolio = require('../models/portfolio.model');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const asyncWrapper = require('../utils/asyncWrapper');
const validateObjectId = require('../utils/validateObjectId');
const { assessRequestReadiness } = require('../utils/readiness');
const { generateWhatsAppLink } = require('../utils/whatsapp');

// Generate sequential readable Request Number (e.g. US-2026-0001)
async function generateRequestNumber() {
  const currentYear = new Date().getFullYear();
  const count = await Request.countDocuments();
  const serial = String(count + 1).padStart(4, '0');
  let candidate = `US-${currentYear}-${serial}`;

  // Ensure uniqueness
  while (await Request.findOne({ requestNumber: candidate })) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    candidate = `US-${currentYear}-${randomSuffix}`;
  }

  return candidate;
}

// 1. Live Readiness Check API (Distinctive Feature)
exports.validateReadiness = asyncWrapper(async (req, res) => {
  const readiness = assessRequestReadiness(req.body);
  return success(res, readiness, 'تم تقييم جاهزية الطلب بنجاح');
});

// 2. Create New Request
exports.createRequest = asyncWrapper(async (req, res) => {
  let bodyData = req.body;

  // If multipart form data parsed specifications or contactInfo as JSON strings
  if (typeof bodyData.specifications === 'string') {
    try {
      bodyData.specifications = JSON.parse(bodyData.specifications);
    } catch (e) {
      bodyData.specifications = {};
    }
  }
  if (typeof bodyData.contactInfo === 'string') {
    try {
      bodyData.contactInfo = JSON.parse(bodyData.contactInfo);
    } catch (e) {
      bodyData.contactInfo = {};
    }
  }
  if (typeof bodyData.artwork === 'string') {
    try {
      bodyData.artwork = JSON.parse(bodyData.artwork);
    } catch (e) {
      bodyData.artwork = {};
    }
  }
  if (typeof bodyData.mockup === 'string') {
    try {
      bodyData.mockup = JSON.parse(bodyData.mockup);
    } catch (e) {
      bodyData.mockup = {};
    }
  }

  // Handle uploaded files if passed through Multer
  const uploadedFiles = [];
  const originalFileNames = [];
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    req.files.forEach((file) => {
      uploadedFiles.push(`/uploads/${file.filename}`);
      originalFileNames.push(file.originalname);
    });
  }

  const artworkData = {
    files: [
      ...(Array.isArray(bodyData.artwork?.files) ? bodyData.artwork.files : []),
      ...uploadedFiles,
    ],
    originalFileNames: [
      ...(Array.isArray(bodyData.artwork?.originalFileNames)
        ? bodyData.artwork.originalFileNames
        : []),
      ...originalFileNames,
    ],
    needsDesignHelp: Boolean(bodyData.artwork?.needsDesignHelp || bodyData.needsDesignHelp === 'true'),
  };

  const payloadForReadiness = {
    category: bodyData.category,
    quantity: bodyData.quantity,
    specifications: bodyData.specifications || {},
    artwork: artworkData,
    contactInfo: bodyData.contactInfo || {
      name: req.user.name,
      phone: req.user.phone,
      email: req.user.email,
    },
    desiredDate: bodyData.desiredDate,
  };

  const readiness = assessRequestReadiness(payloadForReadiness);

  // If user passed a service ID, get title
  let serviceTitle = bodyData.serviceTitle || '';
  if (bodyData.service) {
    const srv = await Service.findById(bodyData.service);
    if (srv) serviceTitle = srv.title;
  }

  // If user selected from portfolio reference
  let referencePortfolioId = null;
  if (bodyData.referencePortfolio) {
    const portItem = await Portfolio.findById(bodyData.referencePortfolio);
    if (portItem) referencePortfolioId = portItem._id;
  }

  // Sanitization: don't store clothing size breakdown for non-clothing products
  const specsToStore = { ...(bodyData.specifications || {}) };
  if (bodyData.category !== 'clothing') {
    delete specsToStore.sizeBreakdown;
  }

  const requestNumber = await generateRequestNumber();

  const newRequest = await Request.create({
    requestNumber,
    user: req.user._id,
    service: bodyData.service || null,
    serviceTitle,
    referencePortfolio: referencePortfolioId,
    category: bodyData.category,
    quantity: Number(bodyData.quantity) || 1,
    description: bodyData.description || '',
    specifications: specsToStore,
    artwork: artworkData,
    mockup: bodyData.mockup || {},
    contactInfo: {
      name: bodyData.contactInfo?.name || req.user.name,
      phone: bodyData.contactInfo?.phone || req.user.phone,
      email: bodyData.contactInfo?.email || req.user.email,
      preferredContactMethod: bodyData.contactInfo?.preferredContactMethod || 'whatsapp',
    },
    desiredDate: bodyData.desiredDate || '',
    receiptMethod: bodyData.receiptMethod || 'pickup',
    deliveryAddress: bodyData.deliveryAddress || '',
    status: 'pending',
    statusHistory: [
      {
        status: 'pending',
        note: 'تم إرسال الطلب بنجاح وبانتظار مراجعة صاحب العمل',
        changedBy: req.user._id,
        changedAt: new Date(),
      },
    ],
    readinessScore: readiness.score,
  });

  return success(
    res,
    {
      request: newRequest,
      readiness,
    },
    'تم تسجيل وإرسال طلبك بنجاح! سيتم مراجعته والتواصل معك عبر واتساب',
    201
  );
});

// 3. Customer: View My Requests
exports.getMyRequests = asyncWrapper(async (req, res) => {
  const requests = await Request.find({ user: req.user._id })
    .populate('service', 'title slug images')
    .populate('referencePortfolio', 'title images')
    .sort({ createdAt: -1 });

  return success(res, { requests }, 'تم جلب طلباتك بنجاح');
});

// 4. View Request by ID or RequestNumber (Protected for Privacy)
exports.getRequestById = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  let request;
  if (id.startsWith('US-')) {
    request = await Request.findOne({ requestNumber: id })
      .populate('user', 'name email phone')
      .populate('service', 'title slug images basePrice')
      .populate('referencePortfolio', 'title images')
      .populate('statusHistory.changedBy', 'name role');
  } else {
    validateObjectId(id, 'معرف الطلب');
    request = await Request.findById(id)
      .populate('user', 'name email phone')
      .populate('service', 'title slug images basePrice')
      .populate('referencePortfolio', 'title images')
      .populate('statusHistory.changedBy', 'name role');
  }

  if (!request) {
    throw new AppError('الطلب المطلوب غير موجود', 404);
  }

  // PRIVACY CHECK: Only the request owner or admin can view this request
  const isOwner = req.user && String(request.user._id || request.user) === String(req.user._id);
  const isAdmin = req.user && req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    throw new AppError('غير مصرح لك بالاطلاع على تفاصيل هذا الطلب (بيانات خاصة)', 403);
  }

  return success(res, { request }, 'تم جلب تفاصيل الطلب بنجاح');
});

// 5. Secure Request Tracking with RequestNumber + Phone (Page 04 requirement: Track a request & protect privacy)
exports.trackRequest = asyncWrapper(async (req, res) => {
  const { requestNumber, phone } = req.body;

  if (!requestNumber || !phone) {
    throw new AppError('يرجى إدخال رقم الطلب ورقم الهاتف المسجل في الطلب', 400);
  }

  const cleanReqNum = requestNumber.trim().toUpperCase();
  const cleanInputPhone = phone.replace(/\D/g, '').slice(-10); // compare last 10 digits

  const request = await Request.findOne({ requestNumber: cleanReqNum })
    .populate('service', 'title slug images')
    .populate('statusHistory.changedBy', 'name role');

  if (!request) {
    throw new AppError('رقم الطلب غير موجود، يرجى التأكد من الرقم (مثال: US-2026-0001)', 404);
  }

  const cleanReqPhone = (request.contactInfo.phone || '').replace(/\D/g, '').slice(-10);

  if (cleanInputPhone !== cleanReqPhone) {
    throw new AppError(
      'رقم الهاتف غير مطابق لبيانات هذا الطلب (تم حجب البيانات لحماية خصوصية العميل)',
      403
    );
  }

  // Return safe tracking overview
  const trackingData = {
    requestNumber: request.requestNumber,
    serviceTitle: request.serviceTitle || request.category,
    category: request.category,
    quantity: request.quantity,
    status: request.status,
    nextAction: request.nextAction,
    desiredDate: request.desiredDate,
    receiptMethod: request.receiptMethod,
    adminFeedback: request.adminFeedback,
    statusHistory: request.statusHistory,
    mockupPreview: request.mockup?.previewImageUrl || '',
    createdAt: request.createdAt,
    updatedAt: request.updatedAt,
  };

  return success(res, { tracking: trackingData }, 'تم جلب بيانات تتبع الطلب بنجاح');
});

// 6. Generate WhatsApp Direct Link for this Request
exports.getWhatsAppLink = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  let request;
  if (id.startsWith('US-')) {
    request = await Request.findOne({ requestNumber: id });
  } else {
    validateObjectId(id, 'معرف الطلب');
    request = await Request.findById(id);
  }

  if (!request) {
    throw new AppError('الطلب غير موجود', 404);
  }

  // Privacy Check
  const isOwner = req.user && String(request.user) === String(req.user._id);
  const isAdmin = req.user && req.user.role === 'admin';
  if (!isOwner && !isAdmin) {
    throw new AppError('غير مصرح لك بالحصول على تفاصيل هذا الطلب', 403);
  }

  const clientBaseUrl =
    req.headers.origin || process.env.CLIENT_URL?.split(',')[0] || 'http://localhost:5173';
  const whatsappUrl = generateWhatsAppLink(request, clientBaseUrl);

  return success(
    res,
    {
      whatsappUrl,
      requestNumber: request.requestNumber,
      businessWhatsApp: process.env.BUSINESS_WHATSAPP || '01116891025',
    },
    'تم توليد رابط الواتساب بنجاح'
  );
});
