const { z } = require('zod');

// Phone regex for Egypt (e.g. 010, 011, 012, 015)
const egyptianPhoneRegex = /^01[0125][0-9]{8}$/;

const registerSchema = z.object({
  name: z.string().trim().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  email: z.string().trim().email('صيغة البريد الإلكتروني غير صالحة'),
  phone: z
    .string()
    .trim()
    .refine((val) => egyptianPhoneRegex.test(val), {
      message: 'يرجى إدخال رقم هاتف محمول مصري صحيح (11 رقم يبدأ بـ 01)',
    }),
  password: z.string().min(6, 'كلمة المرور يجب ألا تقل عن 6 أحرف'),
});

const loginSchema = z.object({
  email: z.string().trim().email('صيغة البريد الإلكتروني غير صالحة'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
});

const serviceCreateSchema = z.object({
  title: z.string().trim().min(3, 'عنوان الخدمة يجب أن يكون 3 أحرف على الأقل'),
  category: z.enum(['clothing', 'caps', 'stickers', 'mugs', 'gifts', 'phone-cases', 'custom'], {
    errorMap: () => ({ message: 'فئة الخدمة غير صالحة' }),
  }),
  description: z.string().trim().min(5, 'وصف الخدمة مطلوب'),
  basePrice: z.coerce.number().optional().default(0),
  images: z.array(z.string()).optional().default([]),
  options: z.record(z.any()).optional().default({}),
  variants: z
    .array(
      z.object({
        colorName: z.string().trim().min(1, 'اسم اللون مطلوب'),
        colorHex: z.string().optional().default('#000000'),
        images: z.array(z.string()).optional().default([]),
        sizes: z
          .array(
            z.object({
              size: z.string().trim().min(1),
              inStock: z.boolean().optional().default(true),
            })
          )
          .optional()
          .default([]),
      })
    )
    .optional()
    .default([]),
  isActive: z.boolean().optional().default(true),
});

const portfolioCreateSchema = z.object({
  title: z.string().trim().min(3, 'عنوان العمل مطلوب'),
  category: z.enum(['clothing', 'caps', 'stickers', 'mugs', 'gifts', 'phone-cases', 'custom'], {
    errorMap: () => ({ message: 'فئة العمل غير صالحة' }),
  }),
  description: z.string().trim().min(5, 'وصف العمل مطلوب'),
  clientName: z.string().trim().optional().default('عميل يوزرسيف'),
  images: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
});

const createRequestSchema = z.object({
  category: z.enum(['clothing', 'caps', 'stickers', 'mugs', 'gifts', 'phone-cases', 'custom'], {
    errorMap: () => ({ message: 'فئة الطلب غير صالحة' }),
  }),
  quantity: z.coerce.number().min(1, 'الكمية يجب أن تكون قطعة واحدة على الأقل'),
  service: z.string().optional(),
  serviceTitle: z.string().optional(),
  description: z.string().optional().default(''),
  specifications: z.record(z.any()).optional().default({}),
  artwork: z
    .object({
      files: z.array(z.string()).optional().default([]),
      originalFileNames: z.array(z.string()).optional().default([]),
      needsDesignHelp: z.boolean().optional().default(false),
    })
    .optional()
    .default({ files: [], needsDesignHelp: false }),
  mockup: z
    .object({
      previewImageUrl: z.string().optional().default(''),
      productType: z.string().optional().default(''),
      printPosition: z.string().optional().default(''),
      placement: z.record(z.any()).optional().default({}),
    })
    .optional(),
  contactInfo: z.object({
    name: z.string().trim().min(2, 'اسم العميل مطلوب'),
    phone: z.string().trim().min(8, 'رقم الهاتف مطلوب'),
    email: z.string().trim().email('صيغة البريد الإلكتروني غير صالحة').optional().or(z.literal('')),
    preferredContactMethod: z.enum(['whatsapp', 'phone', 'email']).optional().default('whatsapp'),
  }),
  desiredDate: z.string().optional().default(''),
  receiptMethod: z.enum(['pickup', 'delivery']).optional().default('pickup'),
  deliveryAddress: z.string().optional().default(''),
});

const adminDecisionSchema = z.object({
  decision: z.enum(['approved', 'rejected'], {
    errorMap: () => ({ message: 'القرار يجب أن يكون إما approved أو rejected' }),
  }),
  rejectionReason: z.string().optional().default(''),
  approvalNotes: z.string().optional().default(''),
  estimatedCost: z.coerce.number().optional().default(0),
  estimatedDeliveryDate: z.string().optional().default(''),
});

const updateStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected', 'in_production', 'completed', 'cancelled'], {
    errorMap: () => ({ message: 'حالة الطلب غير صالحة' }),
  }),
  note: z.string().optional().default(''),
});

const createMessageSchema = z.object({
  content: z.string().trim().min(1, 'محتوى الرسالة لا يمكن أن يكون فارغاً'),
});

module.exports = {
  registerSchema,
  loginSchema,
  serviceCreateSchema,
  portfolioCreateSchema,
  createRequestSchema,
  adminDecisionSchema,
  updateStatusSchema,
  createMessageSchema,
};
