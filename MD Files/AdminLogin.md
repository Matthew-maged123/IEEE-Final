# وثيقة الصفحة الشاملة: تسجيل دخول لوحة الإدارة (Admin Login)

---

## 1. بطاقة تعريف الصفحة (Page Overview Card)

| البند | البيان التفصيلي |
| :--- | :--- |
| **اسم الصفحة** | بوابة دخول لوحة المشرفين والمديرين (Admin Authentication Portal) |
| **المسار (Route)** | `/admin/login` |
| **مسار الملف المصدري** | `src/pages/AdminLogin.tsx` |
| **المكون البرمجي الأساسي** | `export const AdminLogin: React.FC` |
| **مستوى الصلاحية (Access Level)** | شبه مقيد (Restricted Entry Gate) - بوابة التحقق الأمني |
| **الميزة التجريبية المدمجة** | زر التعبئة التلقائية للبيانات بنقرة واحدة (1-Click Auto Fill Demo) |

---

## 2. الغرض الوظيفي وسياق الأعمال (Business Purpose & Security Architecture)

تمثل صفحة تسجيل الدخول البوابة الأمنية الفاصلة بين الواجهة العامة المتاحة للزوار والعملاء، وبين لوحة التحكم والإدارة الداخلية المخصصة لمشرفي معمل يوزرسيف بأسوان.

### الأهداف الأساسية للصفحة:
1. **حماية العمليات التشغيلية (Restricting Operations Access):** منع التعديل غير المصرح به على حالات الطلبات، أسباب الرفض، أو مواعيد التسليم.
2. **تيسير تجربة الفحص والتقييم للعميل والمراجعين (Seamless Demo Testing):** توفير صندوق بيانات جاهزة مع زر تعبئة تلقائية لتجربة الدخول دون الحاجة لحفظ أو كتابة كلمات مرور معقدة أثناء مراجعة النظام.
3. **التحقق وتخزين جلسة المشرف (Session & Token Management):** التحقق من صحة بيانات الاعتماد عبر دالة `loginAdmin` وتخزين رمز الدخول المشفر في الذاكرة المحلية للجلسة.
4. **التوجيه التلقائي للوحة القيادة (Automated Redirection):** تحويل المستخدم فور نجاح التحقق إلى مسار `/admin`.

---

## 3. الهيكل المعماري وشجرة المكونات (Component Architecture)

```
AdminLogin (src/pages/AdminLogin.tsx)
 ├── Logo & Header Section:
 │    ├── BrandLogo (variant="green-on-paper", h-16 w-auto)
 │    ├── Demo Badge ("لوحة الإدارة التجريبية - Hardcoded Demo Auth")
 │    ├── Headline ("تسجيل دخول المشرف")
 │    └── Subtitle (متابعة الطلبات وتحديث الحالات الحية)
 │
 ├── Demo Credentials Quick-Fill Card (صندوق البيانات الجاهزة):
 │    ├── KeyRound Icon & Title ("بيانات الدخول التجريبية الجاهزة")
 │    ├── 1-Click Auto Fill Button ("تعبئة تلقائية بنقرة واحدة")
 │    └── Credentials Display (المستخدم: admin | كلمة المرور: demo123)
 │
 ├── Main Authentication Card (نموذج الدخول):
 │    ├── Dynamic Error Alert Banner (عند الخطأ مع AlertCircle)
 │    └── Login Form:
 │         ├── Username Input (اسم المستخدم - dir="ltr", font-mono)
 │         ├── Password Input (كلمة المرور - type="password", dir="ltr", font-mono)
 │         └── Submit Action Button (دخول لوحة التحكم مع أيقونة Lock ومؤشر التحميل)
 │
 └── Return Navigation Link (العودة للصفحة الرئيسية للموقع -> /)
```

---

## 4. حالة المكون وإدارة التحقق الأمني (State Management & Auth Flow)

```typescript
const navigate = useNavigate();

// مدخلات النموذج
const [username, setUsername] = useState<string>('');
const [password, setPassword] = useState<string>('');

// حالات التحكم التفاعلية
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string>('');
```

### 4.1. ميزة التعبئة التلقائية الفورية (`handleFillDemo`):
```typescript
const handleFillDemo = () => {
  setUsername(DEMO_ADMIN_CREDENTIALS.username);
  setPassword(DEMO_ADMIN_CREDENTIALS.password);
  setError('');
};
```
تقوم هذه الدالة بجلب البيانات المخزنة في الثابت `DEMO_ADMIN_CREDENTIALS` في `src/lib/mock-data.ts`:
- **اسم المستخدم:** `admin`
- **كلمة المرور:** `demo123`

### 4.2. دورة معالجة تسجيل الدخول (`handleLogin`):
```typescript
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!username.trim() || !password.trim()) {
    setError('يرجى ملء اسم المستخدم وكلمة المرور');
    return;
  }

  setLoading(true);
  setError('');
  try {
    await loginAdmin(username, password);
    navigate('/admin');
  } catch (err: any) {
    setError(err?.message || 'بيانات الدخول غير صحيحة');
  } finally {
    setLoading(false);
  }
};
```

---

## 5. محرك التوثيق في الـ Mock API (`mock-api.ts`)

خلف الكواليس، تستقبل دالة `loginAdmin` المدخلات وتقارنها:
```typescript
export async function loginAdmin(username: string, password: string): Promise<AdminUser> {
  await delay(400); // محاكاة تأخير الشبكة الواقعي
  if (
    username.trim().toLowerCase() === DEMO_ADMIN_CREDENTIALS.username.toLowerCase() &&
    password === DEMO_ADMIN_CREDENTIALS.password
  ) {
    const admin: AdminUser = {
      username: 'admin',
      name: 'مشرف معمل أسوان',
      role: 'admin',
      token: 'demo-token-' + Date.now(),
    };
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admin));
    return admin;
  }
  throw new Error('بيانات الدخول غير صحيحة. يرجى تجربة admin / demo123');
}
```
عند النجاح، يتم توليد توكن مصادقة فريد وحفظه في `LocalStorage` تحت المفتاح `yuzersef_demo_admin_auth`، مما يمنح المكونات الأخرى إمكانية التحقق من وجود جلسة دخول نشطة.

---

## 6. التصميم البصري واستجابة الشاشات (UI/UX Styling)

- **الحاوية المركزية:** `py-12 sm:py-20 flex items-center justify-center bg-transparent min-h-[80vh]` مع تحديد أقصى عرض بـ `max-w-md` لتركيز بصر المستخدم على بطاقة الدخول.
- **زر التعبئة السريعة:** مصمم بطراز الرترو العصري `bg-[#E3A92F] hover:bg-[#d89c25] text-[#073B35] font-black border-2 border-[#073B35] shadow-[2px_2px_0px_#073B35]` مع حركة ضغط لطيفة `active:translate-x-0.5`.
- **حقول الإدخال:** استخدام خطوط المونو `font-mono text-start` واتجاه لاتيني `dir="ltr"` لتفادي أي ارتباك أثناء كتابة كلمات المرور والرموز.

---

## 7. معالجة حالات الأخطاء (Edge Cases & Fallbacks)

1. **الحقول الفارغة:** التحقق المسبق قبل إرسال الطلب وإظهار رسالة فورية تمنع هدر دورات المعالجة.
2. **بيانات خاطئة:** التقاط رسالة الخطأ من محرك الـ API وعرضها في صندوق تنبيه وردي أحمر أنيق `p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800`.
3. **العودة السريعة:** توفير رابط دائم في أسفل الصفحة يتيح للزائر العودة للصفحة الرئيسية دون الشعور بأنه محاصر داخل بوابة الإدارة.

---

## 8. الاعتماديات والارتباطات (Cross-Page Links)

| الملف | نوع العلاقة | الوصف |
| :--- | :--- | :--- |
| `AdminDashboard.tsx` | Target Route | الوجهة التلقائية فور نجاح الدخول (`/admin`) |
| `mock-api.ts` | Auth Service | توفير دالتي `loginAdmin` و `getCurrentAdmin` |
| `mock-data.ts` | Credentials | استيراد بيانات الدخول الثابتة `DEMO_ADMIN_CREDENTIALS` |
| `BrandLogo.tsx` | Identity | رسم شعار يوزرسيف في رأس الصفحة |
