function success(res, data = {}, message = 'تمت العملية بنجاح', status = 200) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}

function error(res, message = 'حدث خطأ أثناء معالجة الطلب', status = 500, meta = {}) {
  return res.status(status).json({
    success: false,
    message,
    meta,
  });
}

module.exports = { success, error };
