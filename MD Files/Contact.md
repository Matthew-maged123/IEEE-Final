# وثيقة الصفحة الشاملة: اتصل بنا والاستشارات المباشرة (Contact & Direct Inquiry)

---

## 1. بطاقة تعريف الصفحة (Page Overview Card)

| البند | البيان التفصيلي |
| :--- | :--- |
| **اسم الصفحة** | اتصل بنا وقنوات التواصل المباشر (Contact Us & Direct Consultation) |
| **المسار (Route)** | `/contact` |
| **مسار الملف المصدري** | `src/pages/Contact.tsx` |
| **المكون البرمجي الأساسي** | `export const Contact: React.FC` |
| **مستوى الصلاحية (Access Level)** | عام (Public) - متاح للجميع |
| **القنوات المعتمدة** | استمارة مراسلة فورية + قناة واتساب رسمية (`01116891025`) |

---

## 2. الغرض الوظيفي وسياق الأعمال (Business Purpose & Communication)

تمثل صفحة "اتصل بنا" المحطة الأساسية لاستقبال استفسارات كبار العملاء (B2B)، طلبات عروض الأسعار للكميات الضخمة من الجامعات والشركات، وتقديم الاستشارات الفنية المجانية لمن يحتاجون لتوجيه في إعداد ملفات التصميم والطباعة.

### الأهداف الأساسية للصفحة:
1. **توفير قنوات اتصال متعددة (Multi-Channel Access):** إتاحة المراسلة الفورية عبر الموقع، الاتصال المباشر، أو المحادثة التفاعلية عبر الواتساب.
2. **استقبال استفسارات المشاريع المخصصة (Custom Project Quotes):** إتاحة نموذج استفسار مفصل يتضمن موضوع الرسالة ورقم الجوال والبريد الإلكتروني للرد الرسمي.
3. **التوثيق المحلي للرسائل (Demo Message Persistence):** حفظ الرسائل المرسلة محلياً في ذاكرة التخزين (`LocalStorage`) لاستعراضها واختبار دورة التواصل البرمجية.
4. **توضيح النطاق الجغرافي وساعات العمل في أسوان:** تأكيد تواجد مقر الوكالة في محافظة أسوان وتحديد أيام العمل الرسمية (من السبت إلى الخميس).
5. **تنبيه الشفافية للبيانات التمهيدية:** توضيح أن العناوين وأرقام الهواتف هي عناصر نائبة (Placeholders) تتطلب مطابقة العميل قبل الإطلاق الرسمي.

---

## 3. الهيكل المعماري وشجرة المكونات (Component Architecture)

```
Contact (src/pages/Contact.tsx)
 ├── Section 1: Header Banner (الترويسة التعريفية)
 │    ├── Demo Badge ("قنوات التواصل - بيانات نموذجية Demo")
 │    ├── Main Title ("تواصل معنا واستشر خبراءنا")
 │    └── Subtitle Description (دعوة استقبال الاستفسارات وعروض الأسعار)
 │
 └── Section 2: Two-Column Responsive Layout (شبكة عمودين 5 : 7):
      │
      ├── العمود الأيمن (Left Column - lg:col-span-5): معلومات المقر والتواصل
      │    ├── Card Container (خلفية كحلية بترولية فاخرة #012C2B مع نصوص بيضاء)
      │    ├── Headquarters Details:
      │    │    ├── Map Location: أسوان، جمهورية مصر العربية (أيقونة MapPin ذهبية)
      │    │    ├── WhatsApp & Phone: 01116891025 (رابط مباشر مع أيقونة Phone)
      │    │    ├── Official Email: contact@usersafe.demo (أيقونة Mail)
      │    │    └── Working Hours: السبت - الخميس (أيقونة Clock)
      │    └── Client Confirmation Box (تنبيه مواءمة بيانات العميل مع ShieldAlert)
      │
      └── العمود الأيسر (Right Column - lg:col-span-7): استمارة المراسلة المباشرة
           ├── Card Container (خلفية بيضاء نظيفة مع ظلال ناعمة shadow-md)
           ├── Form Header ("أرسل لنا رسالة مباشرة")
           ├── Success Feedback Alert (إشعار نجاح إرسال الرسالة مع CheckCircle2)
           └── Interactive Inquiry Form:
                ├── Name Input (الاسم الكريم - إلزامي)
                ├── Two-Column Grid: Phone (رقم الجوال) & Email (البريد الإلكتروني)
                ├── Subject Input (موضوع الرسالة)
                ├── Message Textarea (نص الرسالة والاستفسار - حد أدنى 10 أحرف)
                └── Submit Action Button (مع أيقونة Send ومؤشر التحميل Loading)
```

---

## 4. حالة المكون وإدارة النماذج (State Management & Form Handling)

```typescript
// حقول النموذج
const [name, setName] = useState<string>('');
const [phone, setPhone] = useState<string>('');
const [email, setEmail] = useState<string>('');
const [subject, setSubject] = useState<string>('');
const [message, setMessage] = useState<string>('');

// حالات التحكم في الواجهة
const [loading, setLoading] = useState<boolean>(false);
const [success, setSuccess] = useState<boolean>(false);
const [errors, setErrors] = useState<{ [key: string]: string }>({});
```

### محرك التحقق البرمجي الصارم (Client-Side Validation):
```typescript
const validate = () => {
  const err: { [key: string]: string } = {};
  if (!name.trim()) err.name = 'الاسم مطلوب';
  if (!phone.trim()) err.phone = 'رقم الجوال مطلوب';
  if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) err.email = 'بريد إلكتروني صحيح مطلوب';
  if (!subject.trim()) err.subject = 'موضوع الرسالة مطلوب';
  if (!message.trim() || message.trim().length < 10) {
    err.message = 'يرجى كتابة رسالتك بوضوح (10 أحرف على الأقل)';
  }
  setErrors(err);
  return Object.keys(err).length === 0;
};
```

---

## 5. معالجة الإرسال والتخزين المحلي (Submission Flow & Storage)

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);
  try {
    await submitContactMessage({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });
    setSuccess(true);
    setName('');
    setPhone('');
    setEmail('');
    setSubject('');
    setMessage('');
    setErrors({});
  } catch {
    alert('حدث خطأ أثناء إرسال الرسالة.');
  } finally {
    setLoading(false);
  }
};
```
- تستدعي الدالة `submitContactMessage()` الموجودة في `src/lib/mock-api.ts`.
- يتم إنشاء معرف فريد للرسالة `MSG-xxxx` وتخزينها في مصفوفة الرسائل في `LocalStorage: yuzersef_demo_messages`.
- يتم مسح حقول الإدخال تلقائياً، وإظهار شريط النجاح الأخضر الترحيبي.

---

## 6. تفصيل قنوات الاتصال الرسمية المعروضة (Communication Channels)

| القناة | التفاصيل المعروضة | الرابط الفعلي التفاعلي |
| :--- | :--- | :--- |
| **المقر والمدينة** | أسوان، جمهورية مصر العربية | قيد تأكيد العنوان التفصيلي للمعمل مع العميل |
| **الواتساب المباشر** | `01116891025` (قناة النشر الرسمية) | `https://wa.me/201116891025` |
| **البريد الإلكتروني** | `contact@usersafe.demo` | `mailto:contact@usersafe.demo` |
| **ساعات الدوام** | السبت - الخميس (9:00 ص - 10:00 م) | قيد المطابقة النهائية مع المواعيد التشغيلية |

---

## 7. التصميم البصري واستجابة الشاشات (Styling & Responsive Tokens)

- **كارت معلومات الاتصال:** يرتدي ثوب الهوية الملكي بلون `#012C2B` وحدود `#065E5A/40` مع أيقونات ذهبية بارزة `#E3A92F`.
- **حقول الإدخال:** الحقول الخاصة بالأرقام والبريد الإلكتروني مضبوطة بـ `dir="ltr"` و `text-start font-mono` لضمان ظهور الأرقام وعلامات `@` بالشكل اللاتيني السليم دون أي تشوه في واجهات RTL العربية.
- **التجاوب:**
  - على الشاشات الكبيرة (`lg`): تتجاور بطاقة معلومات المقر واستمارة الرسائل في نسق 5 : 7.
  - على الهواتف الذكية (`sm`): تترتب البطاقات رأسياً لسهولة التمرير وتعبئة البيانات بإصبع الإبهام.

---

## 8. الاعتماديات والارتباطات (Cross-Page Links)

| الملف | نوع العلاقة | الوصف |
| :--- | :--- | :--- |
| `mock-api.ts` | Data Layer | استدعاء دالة `submitContactMessage()` لحفظ الاستفسار |
| `types.ts` | Data Contract | استيراد واجهة `ContactMessage` |
| `Navbar.tsx` | Header Navigation | بند "تواصل معنا" المباشر في شريط الترويسة الرئيسي |
| `Home.tsx` | Redirection Link | كارت "خدمة المساعدة والتصميم الفني" في الرئيسية يوجه إلى هنا |
