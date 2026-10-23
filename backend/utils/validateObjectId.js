const mongoose = require('mongoose');
const AppError = require('./AppError');

function validateObjectId(id, label = 'المعرف (ID)') {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(`قيمة ${label} غير صالحة`, 400);
  }
}

module.exports = validateObjectId;
