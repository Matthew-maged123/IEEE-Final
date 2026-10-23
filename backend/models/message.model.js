const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request',
      required: [true, 'معرف الطلب مطلوب'],
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'مرسل الرسالة مطلوب'],
    },
    senderRole: {
      type: String,
      enum: ['customer', 'admin'],
      required: true,
    },
    senderName: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'نص الرسالة مطلوب'],
      trim: true,
    },
    attachments: {
      type: [String],
      default: [],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
