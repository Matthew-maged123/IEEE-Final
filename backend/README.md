# UserSeif Backend API 🖨️
## IEEE Brand & Build Competition Client Brief - Official Backend

واجهة برمجية وتطبيق خادم متكامل لمشروع **"يوزرسيف" (UserSeif)** للطباعة والتخصيص في أسوان، مبني بأعلى المعايير البرمجية لتغطية متطلبات بريف مسابقة IEEE Brand & Build بالكامل.

---

### 🌟 الميزات التنافسية الأساسية (The Distinctive Features)
1. **Request-Readiness Engine (المحرك الذكي لفحص جاهزية الطلب):**
   - فحص ديناميكي لكل فئة (ملابس، كابات، استيكرات، مجات، كفرات موبايل).
   - التحقق الصارم من تطابق مجموع تفصيل المقاسات مع الكمية الإجمالية للملابس والكابات.
   - التحقق من أبعاد وشكل واستخدام الاستيكر، وموديل الهاتف لكفرات الموبايل.
   - حساب نسبة جاهزية الطلب (0-100%) وقائمة الحقول المتبقية تفاعلياً قبل الإرسال.
2. **Live Mockup & Visualizer Support:**
   - تخزين مسار التصميم عالي الدقة للطباعة (`artwork`).
   - توفير قوالب الكانفاس ومساحات الطباعة عبر `GET /api/v1/services/mockup-templates`.
   - تخزين موضع وإحداثيات وزاوية وحجم المعاينة (`placement: { x, y, scale, rotation }`) لمنع أي سوء فهم بين العميل وصاحب العمل.
3. **Secure Guest Order Tracking (تتبع الطلب المحمي):**
   - تتبع الطلب برقم الطلب والهاتف (`POST /api/v1/requests/track`) لمنع التطفل وحماية خصوصية بيانات العميل.
   - عرض حالة الطلب والخطوة القادمة التلقائية (`nextAction`).
4. **General Enquiries Route (استفسارات الزوار):**
   - مسار مخصص للزوار غير الجاهزين للطلب (`POST /api/v1/enquiries`) لاستقبال أسئلتهم وعروض الأسعار مع لوحة تحكم للأدمن.
5. **WhatsApp Direct Link Generator:**
   - توليد رابط شات مباشر على رقم يوزرسيف الرسمي (`01116891025`) برسالة مهيكلة تلقائياً برقم الطلب وحالته ورابط المتابعة.
6. **Direct Order Discussion (المحادثة المرتبطة بالطلب):**
   - صندوق محادثة وملاحظات خاص بكل طلب لحفظ التواصل بين صاحب العمل والعميل.
7. **Private Request & File Protection (حماية الخصوصية):**
   - العميل لا يرى إلا طلباته فقط (403 لأي محاولة وصول لطلب عميل آخر).
   - لوحة تحكم صاحب العمل محمية بصلاحيات الأدمن فقط.

---

### 🚀 تشغيل المشروع محلياً (Quick Start)

#### 1. المتطلبات:
- Node.js (v18+)
- اتصال بـ MongoDB (تم إعداد رابط MongoDB Atlas جاهز في `.env`)

#### 2. التثبيت والتشغيل:
```bash
# الانتقال لمجلد الباك إند
cd backend

# ملء البيانات الأولية (حسابات الإدارة، الخدمات الرسمية، سابقة الأعمال، طلب تجريبي، استفسار تجريبي)
npm run seed

# تشغيل السيرفر في وضع التطوير
npm run dev
```

السيرفر سيعمل على: `http://localhost:5000`
فحص الحالة (Health Check): `http://localhost:5000/api/v1/health`

---

### 👤 الحسابات الافتراضية (Default Accounts)

| الدور (Role) | البريد الإلكتروني | كلمة المرور | الصلاحيات |
|:---|:---|:---|:---|
| **صاحب العمل (Admin)** | `admin@userseif.com` | `Admin123!` | لوحة التحكم، قبول ورفض الطلبات، إدارة المحتوى، متابعة الاستفسارات |
| **عميل تجريبي (Customer)** | `customer@test.com` | `Test123!` | إرسال الطلبات، متابعة طلباتي، المحادثة |

---

### 🧪 اختبارات التحكيم الرسمية (Automated Competition Tests)
لإثبات استيفاء معايير التحكيم الأربعة الواردة في صفحة 09 من بريف المسابقة والميزات الإضافية، قم بتشغيل:

```bash
npm test
```

النتيجة:
```text
PASS tests/competition.test.js
  IEEE Brand & Build Competition Comprehensive Quality & Criteria Tests
    √ Criterion 1: A complete request reaches admin dashboard with all specifications intact
    √ Criterion 2: Inconsistent size breakdown vs total quantity is caught
    √ Criterion 2: Missing print position for clothing is caught
    √ Criterion 2: Missing phone model for phone-cases is caught
    √ Criterion 3: Approval decision appears correctly for customer with quotation & notes & nextAction
    √ Criterion 3: Rejection decision appears correctly for customer with rejection reason
    √ Criterion 4: Customer B cannot view Customer A private request (403 Forbidden)
    √ Criterion 4: Unauthenticated guest cannot view private request (401 Unauthorized)
    √ Criterion 4: Admin has legitimate access to inspect any request
    √ Criterion 4: Guest Tracking endpoint verifies Phone matching to protect private request
    √ Enquiries: Visitor can submit enquiry without ordering, and admin can review
    √ Mockup: Templates endpoint provides product canvas dimensions and printable areas

Test Suites: 1 passed, 1 total (12 passed, 12 total)
```

---

### 📡 ملف Postman Collection للفرونت إند
تم إعداد وتجهيز ملف Postman Collection محدث وجاهز تماماً للاستيراد:
- المسار: `backend/postman_collection.json`
- يحتوي على جميع الـ Endpoints مرتبة في مجلدات مع أمثلة وسكربتات حفظ الـ Tokens والـ IDs تلقائياً.

---

### 📂 تقسيمة المجلدات (Folder Structure)
```
backend/
├── controllers/          # منطق التحكم ومعالجة الـ APIs
│   ├── auth.controller.js
│   ├── service.controller.js
│   ├── portfolio.controller.js
│   ├── request.controller.js
│   ├── admin.controller.js
│   ├── message.controller.js
│   ├── setting.controller.js
│   └── enquiry.controller.js
├── models/               # نماذج Mongoose لقاعدة البيانات
│   ├── user.model.js
│   ├── service.model.js
│   ├── portfolio.model.js
│   ├── request.model.js
│   ├── message.model.js
│   ├── setting.model.js
│   └── enquiry.model.js
├── routes/               # تعريف مسارات الـ API
│   ├── auth.routes.js
│   ├── service.routes.js
│   ├── portfolio.routes.js
│   ├── request.routes.js
│   ├── admin.routes.js
│   ├── message.routes.js
│   ├── setting.routes.js
│   ├── upload.routes.js
│   └── enquiry.routes.js
├── middlewares/          # التحقق والمصادقة وإدارة الأخطاء
│   ├── auth.middleware.js
│   ├── authorize.middleware.js
│   ├── upload.middleware.js
│   ├── validate.middleware.js
│   ├── loginLimiter.middleware.js
│   └── error.handler.js
├── utils/                # الأدوات المساعدة وفحص الجاهزية والواتساب
│   ├── AppError.js
│   ├── asyncWrapper.js
│   ├── apiResponse.js
│   ├── logger.js
│   ├── validateObjectId.js
│   ├── readiness.js      # محرك فحص جاهزية الطلب
│   ├── whatsapp.js       # مولد روابط الواتساب المباشرة
│   └── validations.js    # Zod Schemas
├── seed/
│   └── seed.js           # سكربت ملء البيانات الأولية
├── tests/
│   └── competition.test.js # اختبارات إثبات معايير التحكيم الـ 12
├── uploads/              # تخزين ملفات وتصاميم العملاء محلياً
├── postman_collection.json
├── package.json
├── app.js
└── server.js
```
