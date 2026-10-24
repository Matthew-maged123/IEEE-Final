# وثيقة الصفحة الشاملة: معالج تقديم الطلبات وفاحص الجاهزية الذكي (Request Wizard)

---

## 1. بطاقة تعريف الصفحة (Page Overview Card)

| البند | البيان التفصيلي |
| :--- | :--- |
| **اسم الصفحة** | معالج تقديم الطلبات وفاحص الجاهزية الذكي (Smart Request Wizard & Readiness Assistant) |
| **المسار (Route)** | `/request` (يدعم معاملات البحث `?service=:id` و `?ref=:referenceTitle`) |
| **مسار الملف المصدري** | `src/pages/RequestWizard.tsx` |
| **المكون البرمجي الأساسي** | `export const RequestWizard: React.FC` |
| **مستوى الصلاحية (Access Level)** | عام (Public) - متاح لكافة العملاء بدون الحاجة لتسجيل دخول مسبق |
| **الميزة الثورية الحصرية** | فاحص الجاهزية الذكي اللحظي (Live Request-Readiness Assistant) ومطابقة المقاسات الحسابية |

---

## 2. الغرض الوظيفي وسياق الأعمال (Business Purpose & Automation)

يمثل معالج الطلبات قلب المحرك التجاري لمنصة يوزرسيف؛ حيث يقوم بتحويل متطلبات العميل المعقدة (سواء كانت هوديز جامعية، كابات، استيكرات، أو جرابات هواتف) إلى أمر إنتاج إلكتروني منظم ومطابق للمواصفات الفنية قبل وصوله لمعمل أسوان.

### التحديات الواقعية التي يحلها المعالج:
1. **القضاء على أخطاء المقاسات (Zero Size-Mismatch Guarantee):** في طلبيات الملابس، كثيراً ما يطلب العميل كمية إجمالية (مثلاً 50 قطعة) ولكن مجموع تفصيل المقاسات (S, M, L, XL, XXL) يكون 48 أو 52. يقوم المعالج بفحص التطابق حسابياً لحظة بلحظة ويمنع الانتقال للخطوة التالية إلا بعد التطابق الدقيق!
2. **التحقق من جاهزية ملف التصميم (Artwork Validation):** يمنع تقديم طلبات مجهولة الملامح، ويلزم العميل إما برفع ملف الشعار أو تفعيل خيار *"أحتاج مساعدة مصممي يوزرسيف"*.
3. **التخصيص الديناميكي للواجهة حسب نوع الخدمة (Dynamic Fields per Category):** تتبدل الحقول تلقائياً؛ فإذا اختار العميل جرابات هواتف تظهر حقول موديل الجهاز والنص المخصص، وإذا اختار استيكرات تظهر حقول الأبعاد بالـ سم والشكل ونوع الفينيل.
4. **توليد كود التتبع الرسمي الفوري (Instant YZ-xxxx Order Generation):** إصدار رقم طلب فريد فور الإرسال، وربطه برابط واتساب مشفر ومباشر لمعمل أسوان.

---

## 3. الهيكل المعماري ومراحل المعالج الأربعة (Wizard Step Architecture)

```
RequestWizard (src/pages/RequestWizard.tsx)
 ├── Wizard Stepper Header (شريط التقدم البصري - 4 خطوات)
 │    ├── Step 1: الخدمة والمواصفات الفنية
 │    ├── Step 2: ملفات التصميم والمساعدة الفنية
 │    ├── Step 3: بيانات التواصل وموعد الاستلام
 │    └── Step 4: المراجعة الشاملة والاعتماد النهائي
 │
 ├── [DISTINCTIVE ENGINE] -> Live Request-Readiness Assistant (فاحص الجاهزية اللحظي)
 │    ├── Check 1: الخدمة والكمية الإجمالية
 │    ├── Check 2: فحص تطابق توزيع المقاسات (خاص بالملابس)
 │    ├── Check 3: تحديد موضع الطباعة والتطريز
 │    ├── Check 4: موديل الهاتف المحدد (خاص بالجرابات)
 │    └── Check 5: جاهزية ملف التصميم أو طلب المساعدة الفنية
 │
 ├── Dynamic Step Content Render:
 │    ├── STEP 1: Service & Specs Selection:
 │    │    ├── Service Selector Carousel / Dropdown
 │    │    ├── Project Brief Textarea (يُملأ تلقائياً عند القدوم من المعرض)
 │    │    ├── Quantity, Urgency (عادي / عاجل), and Budget Input
 │    │    └── Conditional Fields:
 │    │         ├── For Clothing: Color Swatches + Size Breakdown Counters + Print Placement
 │    │         ├── For Caps: Cap Colors + 3D Puff Embroidery Placement
 │    │         ├── For Phone Cases: Phone Model Input + Laser/UV Custom Name
 │    │         └── For Stickers: Width (cm) + Height (cm) + Shape + Indoor/Outdoor Vinyl
 │    │
 │    ├── STEP 2: Artwork & Uploads:
 │    │    ├── FileUploadPreview Component (يدعم الصور وملفات المتجهات Vector)
 │    │    ├── Live File Previews & File Size Formatter & Delete Trigger
 │    │    └── "أحتاج مساعدة في التصميم" Checkbox (Design Assistance Flag)
 │    │
 │    ├── STEP 3: Contact & Delivery:
 │    │    ├── Customer Name, Verified Phone/WhatsApp, Email
 │    │    ├── Desired Delivery Date (افتراضي: تاريخ اليوم + 5 أيام)
 │    │    └── Receipt Preference: استلام من مقر يوزرسيف بأسوان أو شحن وتوصيل
 │    │
 │    └── STEP 4: Final Review & Readiness Pass:
 │         ├── Comprehensive Specification Summary Grid
 │         ├── Real-time Readiness Badges Indicator
 │         └── Submission Action Button (with isSubmitting Spinner)
 │
 └── Post-Submission Success Screen (شاشة النجاح بعد إصدار الطلب):
      ├── Success Celebration Banner & Official Feather Logo
      ├── Official Tracking ID Card (YZ-xxxx) with 1-Click Copy Button
      ├── Direct WhatsApp Connect with Prefilled Message & Order ID
      ├── Full Itemized Specification Summary
      └── Direct Links: تتبع الطلب فوراً (/track?id=YZ-xxxx) والعودة للرئيسية
```

---

## 4. حالة المكون وإدارة النماذج (State Management & Reactive Forms)

تتضمن هذه الصفحة إدارة حالة واسعة النطاق تتجاوز 25 متغيراً تفاعلياً لضمان عدم فقدان أي بيانات أثناء التنقل بين الخطوات:

```typescript
// مؤشر الخطوة الحالية (من 1 إلى 4)
const [currentStep, setCurrentStep] = useState<number>(1);

// قائمة الخدمات والخدمة المحددة
const [services, setServices] = useState<Service[]>([]);
const [selectedServiceId, setSelectedServiceId] = useState<string>('');

// الحقول الأساسية
const [projectBrief, setProjectBrief] = useState<string>('');
const [quantity, setQuantity] = useState<number>(1);
const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');
const [budget, setBudget] = useState<string>('');

// الحقول الخاصة بالملابس
const [clothingColor, setClothingColor] = useState<string>('أسود');
const [sizes, setSizes] = useState<SizeBreakdown>({ s: 0, m: 1, l: 0, xl: 0, xxl: 0 });
const [printPlacement, setPrintPlacement] = useState<'chest' | 'back' | 'pocket' | 'sleeve' | 'both-sides'>('chest');

// الحقول الخاصة بالجرابات
const [phoneModel, setPhoneModel] = useState<string>('');
const [personalisationText, setPersonalisationText] = useState<string>('');

// الحقول الخاصة بالاستيكرات
const [stickerWidthCm, setStickerWidthCm] = useState<number>(5);
const [stickerHeightCm, setStickerHeightCm] = useState<number>(5);
const [stickerShape, setStickerShape] = useState<'rectangle' | 'circle' | 'custom-cut'>('circle');
const [stickerUsage, setStickerUsage] = useState<'indoor' | 'outdoor-waterproof'>('outdoor-waterproof');

// الملفات والتصميم
const [needsDesignHelp, setNeedsDesignHelp] = useState<boolean>(false);
const [attachments, setAttachments] = useState<FileAttachment[]>([]);

// بيانات الاستلام والاتصال
const [desiredDate, setDesiredDate] = useState<string>(...);
const [receiptPreference, setReceiptPreference] = useState<'aswan-pickup' | 'shipping-delivery'>('aswan-pickup');
const [customerName, setCustomerName] = useState<string>('');
const [phone, setPhone] = useState<string>('');
const [email, setEmail] = useState<string>('');

// كائن تتبع أخطاء التحقق
const [errors, setErrors] = useState<{ [key: string]: string }>({});

// حالة الطلب الناتج
const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
const [submittedRequest, setSubmittedRequest] = useState<ServiceRequest | null>(null);
const [copied, setCopied] = useState<boolean>(false);
```

---

## 5. محرك فاحص الجاهزية الذكي (Smart Readiness Assistant Algorithm)

يتم تشغيل هذا المحرك بواسطة خطاف `useMemo` ليعمل في أجزاء من الألف من الثانية عند كل ضغطة زر أو تعديل مقاس:

```typescript
const totalSizesEntered = useMemo(() => calculateTotalSizes(sizes), [sizes]);

const readinessChecks = useMemo(() => {
  const checks = [];

  // 1. فحص الخدمة والكمية الإجمالية
  const quantityValid = quantity > 0 && !!selectedServiceId;
  checks.push({
    id: 'product-quantity',
    title: 'الخدمة والكمية الإجمالية',
    passed: quantityValid,
    message: quantityValid ? `الكمية المحددة: ${quantity} قطعة` : 'يرجى تحديد كمية أكبر من صفر',
  });

  // 2. فحص تطابق المقاسات الإلزامي للملابس
  if (isClothing) {
    const match = totalSizesEntered === Number(quantity);
    const diff = Number(quantity) - totalSizesEntered;
    checks.push({
      id: 'size-breakdown',
      title: 'فحص تطابق توزيع المقاسات',
      passed: match,
      message: match
        ? `المجموع مطابق تماماً (${totalSizesEntered} من ${quantity})`
        : diff > 0
        ? `عدم تطابق: يتبقى توزيع ${diff} قطعة على المقاسات`
        : `عدم تطابق: المقاسات تزيد بمقدار ${Math.abs(diff)} قطعة عن الإجمالي!`,
    });
  }

  // 3. فحص موضع الطباعة
  if (isClothing || isCap) {
    const placed = !!printPlacement;
    checks.push({
      id: 'print-placement',
      title: 'تحديد موضع الطباعة',
      passed: placed,
      message: placed ? 'تم اختيار موضع الطباعة بنجاح' : 'اختر موضع الطباعة المطلوب للمتابعة',
    });
  }

  // 4. فحص موديل الهاتف
  if (isPhone) {
    const modelValid = phoneModel.trim().length > 1;
    checks.push({
      id: 'phone-model',
      title: 'موديل الهاتف',
      passed: modelValid,
      message: modelValid ? `الجهاز: ${phoneModel}` : 'يرجى كتابة موديل الهاتف بدقة (مثلاً: iPhone 15 Pro)',
    });
  }

  // 5. فحص جاهزية ملف التصميم أو طلب المساعدة
  const artworkReady = attachments.length > 0 || needsDesignHelp;
  checks.push({
    id: 'artwork',
    title: 'ملف التصميم والمساعدة الفنية',
    passed: artworkReady,
    message: attachments.length > 0
      ? `تم إرفاق ${attachments.length} ملفات جاهزة`
      : needsDesignHelp
      ? 'تم طلب مساعدة مصممي يوزرسيف في تجهيز التصميم'
      : 'يرجى إرفاق ملف الشعار/التصميم أو تفعيل خيار المساعدة التصميمية',
  });

  return checks;
}, [selectedServiceId, quantity, isClothing, isCap, isPhone, totalSizesEntered, printPlacement, phoneModel, attachments.length, needsDesignHelp]);
```

---

## 6. قواعد التحقق الموزعة على الخطوات (Step-by-Step Validation Rules)

قبل السماح بالانتقال بين الخطوات أو إرسال الطلب، تقوم دالة `validateStep(step)` بالتحقق الصارم:

### في الخطوة 1 (Step 1):
- التأكد من اختيار الخدمة (`selectedServiceId`).
- التأكد من كتابة وصف للطلب لا يقل عن 6 أحرف.
- في حالة الملابس: **حظر الانتقال** إذا كان مجموع المقاسات `totalSizesEntered !== Number(quantity)`.
- في حالة الجرابات: التحقق من إدخال موديل الموبايل.

### في الخطوة 2 (Step 2):
- **حظر الانتقال** إذا لم يرفع العميل أي ملف ولم يقم بوضع علامة الصح على *"أحتاج مساعدة في التصميم"*.

### في الخطوة 3 (Step 3):
- الاسم الكريم مطلوب ولا يمكن تركه فارغاً.
- رقم الهاتف إلزامي ويتم التحقق منه عبر التعبير القياسي `^(\+?[0-9\s-]{8,15})$`.
- البريد الإلكتروني إلزامي ويخضع لـ Regex فحص صيغة الإيميل.
- تاريخ الاستلام المرغوب محدد وإلزامي.

---

## 7. آلية حفظ الطلب وإنشاء المعرف الفريد (Submission & Storage Flow)

عند النقر على زر *"تأكيد وإرسال الطلب التجريبي"*:
1. يتم استدعاء دالة `createServiceRequest(payload)` في `mock-api.ts`.
2. يتم توليد معرف فريد متسلسل بالنمط الرسمي ليوزرسيف: `YZ-xxxx` (مثل `YZ-0005`).
3. يتم إدراج الطلب بحالة أولية تلقائية: `status: 'submitted'` (تم التقديم).
4. يتم حفظ الطلب محلياً في ذاكرة التخزين الدائمة للمتصفح (`LocalStorage: yuzersef_demo_requests`).
5. يتم عرض شاشة النجاح الفورية مع خيارات نسخ الكود، الانتقال للتتبع المباشر، أو فتح واتساب فني المعمل.

---

## 8. شاشة النجاح والتكامل مع واتساب معمل أسوان (Success Screen & WhatsApp Link)

```typescript
const waLink = generateWhatsAppLink(
  submittedRequest.id,
  `أنا ${submittedRequest.customerName}، وأود تأكيد وتنسيق الطلب المرفق.`
);
```
- الزر مبرمج لفتح تطبيق WhatsApp مباشرة سواء على الهاتف أو WhatsApp Web.
- الرسالة تتضمن رقم الطلب الرسمي ليتمكن موظف المعمل من البحث عنه في لوحة الإدارة فوراً.

---

## 9. الاعتماديات والارتباطات (Cross-Page Links)

| الملف | نوع العلاقة | الوصف |
| :--- | :--- | :--- |
| `FileUploadPreview.tsx` | UI Component | مكون رفع الملفات ومعاينتها وحذفها |
| `BrandLogo.tsx` | Visual Identity | إظهار ريشة وشعار يوزرسيف في شاشة النجاح |
| `mock-api.ts` | Data Layer | استدعاء `getServices()` و `createServiceRequest()` |
| `utils.ts` | Helpers | حساب مجموع المقاسات وتوليد روابط واتساب المشفرة |
| `TrackRequest.tsx` | Conversion Flow | شاشة تتبع الطلب التي ينتقل إليها العميل بعد النسخ |
| `AdminDashboard.tsx` | Admin Sync | يظهر الطلب الجديد فوراً في جدول لوحة تحكم المشرف |
