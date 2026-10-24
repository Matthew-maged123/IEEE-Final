# وثيقة الصفحة الشاملة: تفاصيل الخدمة واستوديو المعاينة (Service Details & Studio)

---

## 1. بطاقة تعريف الصفحة (Page Overview Card)

| البند | البيان التفصيلي |
| :--- | :--- |
| **اسم الصفحة** | صفحة تفاصيل الخدمة ومختبر المعاينة التفاعلي (Service Details & 3D Studio) |
| **المسار (Route)** | `/services/:id` (مسار ديناميكي يستقبل معرّف الخدمة) |
| **مسار الملف المصدري** | `src/pages/ServiceDetails.tsx` |
| **المكون البرمجي الأساسي** | `export const ServiceDetails: React.FC` |
| **المكونات الفرعية الجوهرية** | `ProductStudio.tsx` (استوديو تدوير المنتجات وتراكب الشعارات) |
| **مستوى الصلاحية (Access Level)** | عام (Public) - متاح للجميع |

---

## 2. الغرض الوظيفي وسياق الأعمال (Business Purpose & Experience)

تعتبر صفحة تفاصيل الخدمة نقطة الإقناع الفنية الأهم في موقع يوزرسيف؛ حيث تتجاوز تقديم مجرد نصوص تسويقية إلى توفير تجربة محاكاة تفاعلية شبه واقعية للمنتج.

### الأهداف الاستراتيجية للصفحة:
1. **استعراض المواصفات الفنية التفصيلية (Deep Technical Specifications):** إبراز كافة الخامات، نوع الأقمشة (جراماج القطن)، أحبار الطباعة (DTF / UV / Sublimation)، ومواصفات القص والتطريز.
2. **محاكاة المنتج عبر استوديو تفاعلي (`ProductStudio`):** تمكين العميل من تدوير المنتج بزوايا مختلفة (360° Turntable)، تجربة رفع شعاره أو تصميمه الخاص، ومعاينة شكله على التيشيرت أو المج أو الجراب قبل دفع أي مليم.
3. **وضوح مخرجات التسليم (Deliverables Transparency):** توضيح ما سيستلمه العميل بالضبط داخل الشحنة (مثل: كيس التغليف الفاخر، ملصقات التعليمات، عينات مجانية).
4. **تسهيل الشراء الفوري والتواصل المباشر:**
   - زر بدء المعالج: ينقل العميل فوراً إلى خطوة الطلب مع تحديد الخدمة الحالية.
   - زر واتساب المعمل: يفتح محادثة واتساب مشفرة ومسبقة التعبئة باسم الخدمة لاستشارة فني الطباعة في أسوان.

---

## 3. الهيكل المعماري وتوزيع الأعمدة (Two-Column Layout Architecture)

```
ServiceDetails (src/pages/ServiceDetails.tsx)
 ├── Breadcrumb Navigation (مسار التصفح: الرئيسية / الخدمات / اسم الخدمة)
 └── Two-Column Responsive Grid (تقسيم 8 أعمدة للمحتوى : 4 أعمدة للطلب):
      │
      ├── العمود الأيمن (Main Content Column - lg:col-span-8):
      │    ├── Header & Tags (شارات التجربة Demo وشارة الخدمة)
      │    ├── Title & Detailed Description (العنوان والوصف الفني المطول)
      │    ├── [INTERACTIVE STUDIO] -> ProductStudio (src/components/ProductStudio.tsx):
      │    │    ├── Turntable Product Viewer (المعاينة متعددة الزوايا)
      │    │    ├── Angle Stepper & 360 Rotation Controls
      │    │    ├── Artwork / Logo Upload Box (رفع الشعار ومعاينته على المنتج)
      │    │    └── Placement & Scale Controls (التحكم بموضع الشعار وحجمه)
      │    ├── Technical Specifications Grid (المواصفات الفنية المعتمدة مع CheckCircle2)
      │    ├── Deliverables & Package Contents (مخرجات التسليم مع PackageCheck)
      │    └── Quality Assurance Card (المعاينة واعتماد النماذج التجريبية مع ShieldCheck)
      │
      └── العمود الأيسر (Sticky Sidebar Card - lg:col-span-4):
           ├── Card Container (شريط لاصق عند التمرير sticky top-28)
           ├── Price Estimation Tag (التسعير الأولي المقترح + تنبيه الكميات)
           ├── Turnaround Time & Delivery Methods (متوسط مدة التنفيذ + مقر أسوان/الشحن)
           ├── Primary CTA Button -> /request?service=:id ("بدء طلب هذه الخدمة الآن")
           └── Direct WhatsApp Button (استفسار سريع برابط مهيأ مسبقاً لرقم يوزرسيف الرسمي)
```

---

## 4. حالة المكون وإدارة البيانات (State Management & Dynamic Routing)

تستخدم الصفحة خطاف `useParams` لاستخراج معرف الخدمة المطلوب من عنوان الـ URL:

```typescript
const { id } = useParams<{ id: string }>();
const navigate = useNavigate();
const [service, setService] = useState<Service | null>(null);
const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
  if (id) {
    getServiceById(id).then((res) => {
      setService(res);
      setLoading(false);
    });
  }
}, [id]);
```

### معالجة حالات التحميل والخطأ (Fallback States):
1. **أثناء جلب البيانات (`loading === true`):** يتم عرض مؤشر دوران مركزي أنيق بلون الهوية `animate-spin border-4 border-[#065E5A]` مع نص إرشادي لطيف.
2. **الخدمة غير موجودة (`!service`):** عند إدخال معرف خدمة غير صحيح أو غير مفعل في الـ URL، تعرض الصفحة رسالة واضحة: *"عذراً، الخدمة غير موجودة"* مع زر للعودة لكامل الكتالوج `/services`.

---

## 5. استوديو المنتجات التفاعلي المدمج (`ProductStudio`)

يمثل مكون `ProductStudio` أحد أهم الإضافات البرمجية التي تمنح الموقع طابع المنصات العالمية؛ حيث يوفر:
- **نظام التدوير الميكانيكي (Turntable Angles):** إمكانية استعراض المنتج من عدة زوايا (الواجهة الأمامية، الجانب الأيمن، الخلفية، والجانب الأيسر) بالاعتماد على خوارزميات `products-data.ts`.
- **محاكي طباعة الشعار (Real-time Logo Overlay):**
  - زر لرفع ملف الشعار للعميل بصيغة PNG أو JPG.
  - تطبيق الشعار تلقائياً فوق المنتج بزاوية انحناء متوافقة مع القماش أو السيراميك.
  - إمكانية ضبط وتعديل مقاس وموضع الطباعة (على الصدر، على الجيب، أو على الظهر).
- **ألوان المنتج (Product Colorways):** إمكانية تجربة درجات ألوان الأقمشة المتوفرة (أبيض، أسود، زيتي، كحلي، بيج) في نفس اللحظة.

---

## 6. تفصيل أقسام المحتوى الفني (Content Sections Breakdown)

### 6.1. المواصفات الفنية المعتمدة (Approved Technical Features)
تُعرض في شبكة ثنائية `grid grid-cols-1 sm:grid-cols-2 gap-3` تضم كافة التفاصيل مثل:
- نوع القطن (100% قطن مصري ممشط عالي الكثافة 320-380 جم/م²).
- نوع أحبار الطباعة (أحبار مائية صديقة للبيئة خالية من المواد الضارة OEKO-TEX).
- معالجة الألوان ضد الغسيل والتشقق (تثبيت حراري بدرجة 165 مئوية).

### 6.2. مخرجات التسليم ومحتوى الطلبية (Deliverables)
شبكة من البطاقات المرتبة تعرض محتويات الطرد عند الاستلام:
- القطع المطبوعة مكوية ومغلفة فردياً في أكياس بوليمر فاخرة بسحاب.
- كارت إرشادات العناية والغسيل (Washing & Care Instructions).
- بطاقة ضمان الجودة واعتماد فني المعمل.

### 6.3. بطاقة ضمان الجودة والمعاينة الرقمية (QA Assurance Banner)
تؤكد للعميل أنه قبل الشروع في خطوط الطباعة الفعلية، سيتم تزويده ببروفة رقمية (Digital Proof) للاعتماد النهائي عبر حسابه أو عبر الواتساب.

---

## 7. بطاقة الشراء الجانبية اللاصقة (Sticky Purchase Sidebar)

تبقى البطاقة ثابتة في متناول عين العميل عند التمرير لأسفل الصفحة بفضل كلاس `sticky top-28`:
- **عرض السعر المبدئي:** بخط كبير جذاب `text-2xl font-black text-[#012C2B]` يرافقه تنبيه بأن السعر يتناقص مع زيادة الكميات المطلوبة.
- **التوجيه التلقائي لمعالج الطلبات:**
  ```typescript
  onClick={() => navigate(`/request?service=${service.id}`)}
  ```
  ينقل العميل فوراً لمعالج الطلب متجاوزاً خطوة اختيار الخدمة.
- **تكامل واتساب المباشر (`generateWhatsAppLink`):**
  يقوم بتهيئة رابط مشفر يتضمن رسالة استفسار دقيقة:
  `https://wa.me/201116891025?text=أود الاستفسار عن خدمة: [اسم الخدمة]`
  مما يوفر على العميل عناء كتابة الاستفسار يدوياً.

---

## 8. الاعتماديات والارتباطات (Dependencies & Integrations)

| الملف المرتبط | المسار | دوره في هذه الصفحة |
| :--- | :--- | :--- |
| `ProductStudio.tsx` | `src/components/ProductStudio.tsx` | المحاكي التفاعلي المدمج للمنتجات |
| `mock-api.ts` | `src/lib/mock-api.ts` | توفير دالة `getServiceById(id)` لجلب التفاصيل |
| `utils.ts` | `src/lib/utils.ts` | توفير دوال `generateWhatsAppLink` و `YUZERSEF_WHATSAPP` |
| `RequestWizard.tsx` | `src/pages/RequestWizard.tsx` | الصفحة الهدف لزر الشراء والتقديم |
| `Services.tsx` | `src/pages/Services.tsx` | الرابط المرجعي في شريط المسار (Breadcrumbs) |
