const Setting = require('../models/setting.model');
const { success } = require('../utils/apiResponse');
const asyncWrapper = require('../utils/asyncWrapper');

exports.getSettings = asyncWrapper(async (req, res) => {
  let settings = await Setting.findOne();
  if (!settings) {
    settings = await Setting.create({});
  }
  return success(res, { settings }, 'تم جلب معلومات وإعدادات النشاط بنجاح');
});

exports.updateSettings = asyncWrapper(async (req, res) => {
  let settings = await Setting.findOne();
  if (!settings) {
    settings = await Setting.create(req.body);
  } else {
    Object.assign(settings, req.body);
    await settings.save();
  }
  return success(res, { settings }, 'تم تحديث معلومات النشاط التجاري بنجاح');
});
