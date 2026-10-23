/**
 * WhatsApp Helper for UserSeif
 * Formats direct click-to-chat links with pre-filled order data.
 * Official number: 01116891025 -> 201116891025
 */

function generateWhatsAppLink(request, clientBaseUrl = 'http://localhost:5173') {
  const rawPhone = process.env.BUSINESS_WHATSAPP || '01116891025';
  let formattedPhone = rawPhone.replace(/\D/g, '');
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '2' + formattedPhone;
  } else if (!formattedPhone.startsWith('20')) {
    formattedPhone = '20' + formattedPhone;
  }

  const reqNum = request.requestNumber || request._id;
  const serviceTitle = request.serviceTitle || request.category || 'طلب طباعة مخصص';
  const qty = request.quantity || 1;
  const statusLabels = {
    pending: 'قيد المراجعة',
    approved: 'تمت الموافقة',
    rejected: 'تم الرفض',
    in_production: 'جاري التنفيذ والطباعة',
    completed: 'جاهز للاستلام / مكتمل',
    cancelled: 'ملغي',
  };
  const statusArabic = statusLabels[request.status] || request.status;

  const trackingLink = `${clientBaseUrl}/track/${reqNum}`;

  const message = [
    `مرحباً يوزرسيف 🖨️`,
    `بخصوص طلبي رقم: *${reqNum}*`,
    `الخدمة / المنتج: ${serviceTitle}`,
    `الكمية: ${qty} قطعة`,
    `الحالة الحالية: ${statusArabic}`,
    `رابط متابعة الطلب: ${trackingLink}`,
    `شكراً لكم!`,
  ].join('\n');

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

module.exports = { generateWhatsAppLink };
