const { ZodError } = require('zod');

function validate(schema, source = 'body') {
  return async (req, res, next) => {
    try {
      const dataToValidate = req[source];
      const parsed = await schema.parseAsync(dataToValidate);
      req[source] = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));

        console.warn(`Validation error on ${req.method} ${req.originalUrl}:`, formattedErrors);

        return res.status(400).json({
          success: false,
          message: 'بيانات غير مكتملة أو غير صحيحة، يرجى مراجعة الحقول المطلوبة',
          errors: formattedErrors,
        });
      }
      next(err);
    }
  };
}

module.exports = validate;
