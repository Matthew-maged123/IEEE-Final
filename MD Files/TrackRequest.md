# وثيقة الصفحة الشاملة: تتبع مسار وحالة الطلب (Live Order Tracking)

---

## 1. بطاقة تعريف الصفحة (Page Overview Card)

| البند | البيان التفصيلي |
| :--- | :--- |
| **اسم الصفحة** | تتبع مسار وحالة الطلب (Live Demo Order Tracking) |
| **المسار (Route)** | `/track` (يدعم معاملات الـ URL المباشرة `?id=YZ-xxxx`) |
| **مسار الملف المصدري** | `src/pages/TrackRequest.tsx` |
| **المكون البرمجي الأساسي** | `export const TrackRequest: React.FC` |
| **مستوى الصلاحية (Access Level)** | عام (Public) - متاح لكافة العملاء للاستعلام برقم الطلب |
| **الميزة الوظيفية الحصرية** | خط سير الإنتاج ذو الخمس مراحل والتوجيه المباشر للخطوة التالية (`nextStepText`) |

---

## 2. الغرض الوظيفي وسياق الأعمال (Business Purpose & Transparency)

تعتبر صفحة تتبع الطلبات من الركائز الأساسية التي تعزز ثقة العميل في معمل يوزرسيف بأسوان؛ حيث توفر شفافية كاملة تبدد قلق العميل بشأن موعد استلام الطلبية أو موقف الطباعة.

### الأهداف الأساسية للصفحة:
1. **الاستعلام الفوري والذاتي (Self-Service Order Lookup):** يستطيع العميل إدخال كود طلبه (مثل `YZ-0001`) في أي وقت من هاتفه لمعرفة الموقف التنفيذي دون الحاجة لإجراء مكالمات هاتفية متكررة.
2. **استعراض خط الإنتاج التفاعلي (5-Stage Visual Progress Bar):** تمثيل بصري واضح للمرحلة الحالية التي يمر بها الطلب داخل خطوط إنتاج المعمل.
3. **عرض توجيهات الخطوة التالية (`Next Step`):** قراءة الإرشادات المباشرة التي كتبها المشرف (مثل: *"تم الانتهاء من الطباعة، يرجى التوجه لمقر أسوان للاستلام بعد الساعة 5 مساءً"*).
4. **الشفافية في حالات الرفض والاعتذار (Rejection Reason Handling):** في حال تعذر قبول الطلب بسبب عدم وضوح الشعار أو نفاد المقاس، يتم عرض سبب الرفض المسجل مع زر مباشر لمناقشة البدائل عبر الواتساب.
5. **جسر الربط التجريبي لاختبار النظام (Demo Admin Bridge):** توفير كروت جاهزة للاختبار بنقرة واحدة وروابط سريعة لتجربة تحديث الحالة من لوحة تحكم المشرف.

---

## 3. الهيكل المعماري وشجرة المكونات (Component Architecture)

```
TrackRequest (src/pages/TrackRequest.tsx)
 ├── Section 1: Header & Search Form
 │    ├── Demo Badge ("التتبع المباشر للطلبات - Live Demo Tracking")
 │    ├── Title & Subtitle ("تتبع مسار وحالة طلبك")
 │    ├── Search Input & Button Form (بحث برقم الطلب مع تحويل الحروف لكبيرة تلقائياً)
 │    └── Quick Demo Chips (أزرار جاهزة للتجربة: YZ-0001, YZ-0002, YZ-0003, YZ-0004)
 │
 ├── Section 2: Feedback & Loading States
 │    ├── Error Alert Box (تنبيه عند عدم العثور على الطلب)
 │    └── Animated Spinner (أثناء استرجاع السجلات من LocalStorage)
 │
 └── Section 3: Order Details & Live Tracking Card (عند العثور على الطلب):
      ├── Header Info Strip:
      │    ├── Order ID (YZ-xxxx) & Service Title
      │    ├── Dynamic Status Badge with Pulsing Dot
      │    └── "تحديث الحالة" Button (Live Refresh)
      │
      ├── WhatsApp Direct Action Box (مراسلة فني المعمل برقم الطلب المعبأ مسبقاً)
      │
      ├── Production Pipeline Progress:
      │    ├── IF Status != 'rejected': 5-Stage Stepper (تم التقديم -> المراجعة الفنية -> الاعتماد -> قيد الطباعة -> جاهز للاستلام)
      │    └── IF Status == 'rejected': Rejection Alert Box + Admin Rejection Reason
      │
      ├── Status Explanation & Admin Next Step Directive (الخطوة التالية المحددة من الإدارة)
      │
      ├── Lab Admin Notes (ملاحظات وتحديثات معمل أسوان)
      │
      ├── Registered Specifications Breakdown (ملخص المواصفات المسجلة):
      │    ├── Customer Name, Quantity, Receipt Method, Desired Delivery Date
      │    ├── Clothing Sizes & Colors Breakdown (S, M, L, XL, XXL)
      │    ├── Phone Model (if applicable)
      │    ├── Project Brief Box (نص رغبة العميل)
      │    └── Attachments List (مع أسماء الملفات وأحجامها المنسقة)
      │
      └── Quick Admin Test Bridge (دعوة لتجربة تحديث حالة الطلب من لوحة المشرف)
```

---

## 4. حالة المكون وإدارة البحث (State & Query Parameter Logic)

```typescript
const [searchParams, setSearchParams] = useSearchParams();
const [queryId, setQueryId] = useState(searchParams.get('id') || '');
const [request, setRequest] = useState<ServiceRequest | null>(null);
const [loading, setLoading] = useState(false);
const [searched, setSearched] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
```

### البحث الآلي عند فتح الرابط (Deep Linking):
```typescript
useEffect(() => {
  const idParam = searchParams.get('id');
  if (idParam) {
    setQueryId(idParam);
    fetchRequest(idParam);
  }
}, [searchParams]);
```
- إذا وصل العميل إلى الصفحة عبر رابط مباشر (مثل: `/track?id=YZ-0002`)، يقوم المكون باستخراج المعرف تلقائياً وتنفيذ البحث دون انتظار ضغط العميل على زر البحث.

---

## 5. الحالات السبعة لدورة حياة الطلب (The 7 Lifecycle Statuses)

تتم ترجمة وتلوين حالات الطلب بواسطة دالة `getStatusDetails(status)` في `src/lib/utils.ts`:

| الحالة البرمجية (`status`) | المسمى العربي | رقم الخطوة (`stepIndex`) | المظهر اللوني | الوصف المعروض للعميل |
| :--- | :--- | :--- | :--- | :--- |
| `submitted` | تم التقديم | 1 | رمادي مزرق | تم استلام طلبك بنجاح وهو بانتظار بدء المراجعة الفنية من مشرف المعمل. |
| `under-review` | قيد المراجعة | 2 | كهرماني (Amber) | يجري فحص أبعاد التصميم وجودة الألوان ومطابقة المقاسات المطلوبة. |
| `approved` | معتمد | 3 | تركواز (Teal) | تم اعتماد ملفاتك ومواصفاتك الفنية وتجهيز القوالب لخطوط الطباعة. |
| `in-progress` | قيد الطباعة | 4 | زيتي ملكي (`#065E5A`) | يجري الآن قص القماش أو طباعة ونقل الأحبار وتطريز القطع في المعمل. |
| `ready` | جاهز للاستلام | 5 | زمردي (Emerald) | اكتملت عملية الإنتاج والفحص النهائي، طلبك جاهز للاستلام أو تم تسليمه للشحن. |
| `completed` | مكتمل | 5 | أخضر داكن | تم تسليم الطلبية للعميل وإغلاق ملف الطلب بنجاح. |
| `rejected` | مرفوض | 0 | وردي أحمر (Rose) | تعذر قبول الطلب بناءً على الملاحظات وأسباب الرفض المسجلة. |

---

## 6. تفصيل خط سير الإنتاج (5-Stage Visual Stepper)

عندما يكون الطلب مقبولاً، يظهر شريط من 5 بطاقات أفقية:
1. **تم التقديم:** مكتملة دائماً عند إنشاء الطلب.
2. **المراجعة الفنية:** تفيد بمراجعة دقة التصميم وتطابق أبعاد الشعار.
3. **الاعتماد:** جاهزية خامات الملابس أو الاستيكرات لبدء التشغيل.
4. **قيد الطباعة:** تشغيل ماكينات DTF أو التطريز الكمبيوتري.
5. **جاهز للاستلام:** تعبئة وتغليف الطلب وجاهزيته في مقر يوزرسيف بأسوان.

- **التنسيق البصري للخطوة الحالية:** تتم إحاطتها بحلقة تمييز مضيئة `ring-2 ring-[#065E5A]/20 bg-[#065E5A]/10 border-[#065E5A]`، بينما تظهر الخطوات المكتملة بأيقونة صح خضراء `CheckCircle2`.

---

## 7. توجيه الخطوة التالية وملاحظات المعمل (Next Step & Admin Notes)

- **حقل توجيه الخطوة التالية (`request.nextStepText`):**
  يوفر إرشادات حاسمة مباشرة، مثل:
  > *"يرجى الحضور لمقر يوزرسيف بأسوان (شارع السوق) غداً ما بين الساعة 4 إلى 9 مساءً مع إبراز رقم الطلب YZ-0001."*
- **ملاحظات معمل أسوان (`request.adminNotes`):**
  تحديثات تشغيلية حية من الفني، مثل:
  > *"تم الانتهاء من طباعة الصدر وتطريز الأرقام، وجاري تثبيت الألوان بالحرارة."*

---

## 8. التكامل مع واتساب معمل أسوان (WhatsApp Pre-Filled Support Link)

```typescript
<a
  href={generateWhatsAppLink(
    request.id,
    `أنا العميل ${request.customerName}، وأستفسر عن موعد الاستلام وتفاصيل الطلب.`
  )}
  target="_blank"
  rel="noopener noreferrer"
>
```
يقوم الزر بفتح محادثة واتساب موجهة ومباشرة لرقم إدارة يوزرسيف المعتمد `01116891025`، مع تمرير رقم الطلب تلقائياً لتسهيل الرد الفوري.

---

## 9. الاعتماديات والارتباطات (Cross-Page Links)

| الملف | نوع العلاقة | الوصف |
| :--- | :--- | :--- |
| `mock-api.ts` | Data Layer | استدعاء `getRequestById(id)` لجلب السجل |
| `utils.ts` | Formatting Helpers | دوال `getStatusDetails` و `formatDateAr` و `formatFileSize` |
| `AdminLogin.tsx` | Admin Bridge | رابط تجريبي يتيح للزائر تسجيل الدخول وتغيير حالة الطلب لاختبار التزامن |
| `RequestWizard.tsx` | Parent Flow | تنقل شاشة النجاح في معالج الطلب العميل إلى هذه الصفحة تلقائياً |
