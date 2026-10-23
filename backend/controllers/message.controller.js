const Message = require('../models/message.model');
const Request = require('../models/request.model');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const asyncWrapper = require('../utils/asyncWrapper');
const validateObjectId = require('../utils/validateObjectId');

exports.getRequestMessages = asyncWrapper(async (req, res) => {
  const { requestId } = req.params;
  validateObjectId(requestId, 'معرف الطلب');

  const request = await Request.findById(requestId);
  if (!request) {
    throw new AppError('الطلب المطلوب غير موجود', 404);
  }

  // Privacy Check: Only request owner or admin can see the messages
  const isOwner = String(request.user) === String(req.user._id);
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) {
    throw new AppError('غير مصرح لك بالاطلاع على محادثات هذا الطلب', 403);
  }

  const messages = await Message.find({ request: requestId })
    .populate('sender', 'name role')
    .sort({ createdAt: 1 });

  return success(res, { messages }, 'تم جلب رسائل وملاحظات الطلب بنجاح');
});

exports.sendMessage = asyncWrapper(async (req, res) => {
  const { requestId } = req.params;
  validateObjectId(requestId, 'معرف الطلب');

  const { content, attachments } = req.body;

  const request = await Request.findById(requestId);
  if (!request) {
    throw new AppError('الطلب المطلوب غير موجود', 404);
  }

  // Privacy Check: Only request owner or admin can send messages
  const isOwner = String(request.user) === String(req.user._id);
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) {
    throw new AppError('غير مصرح لك بإرسال رسائل بخصوص هذا الطلب', 403);
  }

  const message = await Message.create({
    request: requestId,
    sender: req.user._id,
    senderRole: req.user.role,
    senderName: req.user.name,
    content: content.trim(),
    attachments: Array.isArray(attachments) ? attachments : [],
  });

  return success(res, { message }, 'تم إرسال الرسالة بنجاح', 201);
});
