# وثيقة الصفحة الشاملة: لوحة تحكم إدارة المعمل وخط الإنتاج (Admin Dashboard)

---

## 1. بطاقة تعريف الصفحة (Page Overview Card)

| البند | البيان التفصيلي |
| :--- | :--- |
| **اسم الصفحة** | لوحة تحكم إدارة المعمل ومتابعة خطوط الإنتاج (Admin Operations Dashboard) |
| **المسار (Route)** | `/admin` |
| **مسار الملف المصدري** | `src/pages/AdminDashboard.tsx` |
| **المكون البرمجي الأساسي** | `export const AdminDashboard: React.FC` |
| **مستوى الصلاحية (Access Level)** | محمي ومقيد (Protected Route) - يتطلب تسجيل دخول مسؤول بنجاح |
| **المكونات الفرعية الجوهرية** | نافذة الإجراءات الشاملة (Action & Review Modal)، محرك إحصائيات الـ KPIs |

---

## 2. الغرض الوظيفي وسياق الأعمال (Business Purpose & Production Control)

تعتبر لوحة التحكم غرفة العمليات المركزية لإدارة وكالة «يوزرسيف»؛ حيث تمنح المشرفين وفنيي الطباعة في معمل أسوان سيطرة كاملة ولحظية على كافة الطلبات الواردة من الموقع، ومراجعة مواصفات المقاسات، واعتماد الملفات، وتحديث الحالات الحية التي يراها العميل في صفحة التتبع.

### الأهداف الأساسية للوحة التحكم:
1. **الرؤية البانورامية للعمليات (Operational High-Level Visibility):** توفير 7 مؤشرات أداء رئيسية (KPIs) تعرض أعداد الطلبات في كل مرحلة إنتاجية.
2. **فحص ومراجعة المواصفات بدقة متناهية:** مراجعة تفاصيل الملابس وتوزيع مقاساتها (S, M, L, XL, XXL) وألوانها وموديلات الهواتف ومرفقات التصميم.
3. **التحكم في دورة حياة الطلب (Lifecycle Transitions):** نقل الطلب بنقرة زر واحدة عبر 6 حالات رسمية من التقديم حتى التسليم أو الرفض.
4. **توجيه العميل بالخطوة التالية (`Next Step Directives`):** كتابة تعليمات واضحة تظهر للعميل فوراً في صفحة تتبع طلبه (مثل مواعيد الاستلام أو تفاصيل التوصيل).
5. **التواصل اللحظي مع العملاء:** توفير زر مراسلة واتساب مباشر ومعد مسبقاً لرقم العميل المسجل بالطلب.
6. **إعادة ضبط بيانات النظام (Demo Reset):** إتاحة زر آمن لإعادة تعيين البيانات للوضع الافتراضي في أي وقت لاختبار المنظومة من جديد.

---

## 3. الهيكل المعماري وشجرة المكونات (Component Architecture)

```
AdminDashboard (src/pages/AdminDashboard.tsx)
 ├── Top Control & Navigation Bar:
 │    ├── Brand Logo Icon (square-icon) & System Title ("لوحة تحكم يوزرسيف - Demo Dashboard")
 │    ├── Admin Welcome Tag ("مرحباً بك، مشرف معمل أسوان")
 │    ├── Action Button: Reset Demo Data (إعادة ضبط البيانات مع RotateCcw)
 │    └── Action Button: Logout (تسجيل الخروج مع LogOut)
 │
 ├── Quick KPI Stat Cards (7 بطاقات إحصائية تفاعلية):
 │    ├── Total Orders (الكل)
 │    ├── Submitted (تم التقديم)
 │    ├── Under Review (قيد المراجعة)
 │    ├── Approved (معتمد)
 │    ├── In Progress (قيد الطباعة)
 │    ├── Ready for Pickup (جاهز للتسليم)
 │    └── Rejected (مرفوض)
 │
 ├── Orders Management Table Card:
 │    ├── Search Input (بحث لحظي برقم الطلب، اسم العميل، الخدمة، أو الهاتف)
 │    ├── Status Filter Tabs (الكل، جديد، مراجعة، معتمد، تنفيذ، جاهز، مرفوض)
 │    └── Dynamic Orders Table:
 │         ├── Columns: رقم الطلب | العميل | الخدمة | الكمية | طريقة الاستلام | الحالة | تاريخ الإرسال | الإجراء
 │         ├── Rows with Formatted Badges & Dates (formatDateAr)
 │         └── Actions: زر مراجعة (Eye Icon) + زر معاينة في شاشة التتبع العامة (ExternalLink)
 │
 └── Action & Details Modal (نافذة المراجعة واتخاذ القرارات):
      ├── Current Status Display + WhatsApp Client Chat Link + Public Track Link
      ├── Client Specs Grid (الاسم، الهاتف، البريد، الكمية، الميزانية، طريقة وتاريخ الاستلام)
      ├── Size Breakdown Highlight (توزيع المقاسات والألوان للأقمشة)
      ├── Project Brief & Attachments Viewer (قراءة رغبة العميل وتنزيل الملفات)
      ├── Next Step Input Directive (حقل الخطوة التالية الموجهة للعميل)
      ├── Lab Admin Notes Textarea (حقل ملاحظات وتحديثات المعمل)
      ├── Rejection Reason Input (حقل سبب الرفض الإلزامي)
      └── 6 Lifecycle Status Action Buttons:
           ├── قيد المراجعة (Under Review)
           ├── اعتماد الطلب (Approve)
           ├── بدء الطباعة (In Progress)
           ├── جاهز للتسليم (Ready)
           ├── تم التسليم - مكتمل (Completed)
           └── رفض الطلب (Reject with Reason Check)
```

---

## 4. نظام حماية المسار والتحقق من الجلسة (Route Protection & Session Guard)

تضمن اللوحة ألا يدخل إليها أي مستخدم دون وجود جلسة تسجيل دخول صالحة:

```typescript
const navigate = useNavigate();
const admin = getCurrentAdmin();

useEffect(() => {
  if (!admin) {
    navigate('/admin/login');
  }
}, [admin, navigate]);
```
- دالة `getCurrentAdmin()` تقرأ رمز المصادقة من `LocalStorage`.
- في حال عدم وجود جلسة نشطة، يتم توجيه المتصفح فوراً وبشكل غير مرئي إلى `/admin/login`.

---

## 5. حالة المكون وإدارة العمليات (State Management & Reactive Table Engine)

```typescript
// قائمة الطلبات المجلوبة من الـ LocalStorage API
const [requests, setRequests] = useState<ServiceRequest[]>([]);
const [loading, setLoading] = useState<boolean>(true);

// التصفية والبحث
const [activeFilter, setActiveFilter] = useState<'all' | RequestStatus>('all');
const [searchQuery, setSearchQuery] = useState<string>('');

// إدارة نافذة التعديل المنبثقة
const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

// حقول نموذج المراجعة داخل النافذة
const [editingNotes, setEditingNotes] = useState<string>('');
const [editingNextStep, setEditingNextStep] = useState<string>('');
const [rejectionReason, setRejectionReason] = useState<string>('');
const [actionSuccessMsg, setActionSuccessMsg] = useState<string>('');
const [isUpdating, setIsUpdating] = useState<boolean>(false);
```

### خوارزمية البحث والفلترة المزدوجة (Combined Search & Filter):
```typescript
const filteredRequests = requests.filter((r) => {
  const matchesFilter = activeFilter === 'all' || r.status === activeFilter;
  const matchesSearch =
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.phone && r.phone.includes(searchQuery));
  return matchesFilter && matchesSearch;
});
```

---

## 6. بطاقات الـ KPIs الإحصائية اللحظية (The 7 Real-time Stat Cards)

تحسب الصفحة الإحصائيات تلقائياً من واقع البيانات المجلوبة:

```typescript
const stats = {
  total: requests.length,
  submitted: requests.filter((r) => r.status === 'submitted').length,
  underReview: requests.filter((r) => r.status === 'under-review').length,
  approved: requests.filter((r) => r.status === 'approved').length,
  inProgress: requests.filter((r) => r.status === 'in-progress').length,
  ready: requests.filter((r) => r.status === 'ready').length,
  completed: requests.filter((r) => r.status === 'completed').length,
  rejected: requests.filter((r) => r.status === 'rejected').length,
};
```
- كل بطاقة تعمل أيضاً كزر تصفية سريع؛ فعند النقر على بطاقة *"قيد الطباعة"*، يتحول جدول العرض تلقائياً لعرض طلبات الطباعة فقط!

---

## 7. نافذة الإجراءات والمراجعة الفنية (Action & Review Modal)

عند النقر على زر *"مراجعة"* أمام أي طلب في الجدول، تفتح النافذة المنبثقة مع تزويدها بكافة مدخلات الطلب:

### 7.1. التواصل المباشر مع العميل عبر الواتساب:
```typescript
<a
  href={`https://wa.me/20${selectedRequest.phone.replace(/^0+/, '')}?text=${encodeURIComponent(
    `مرحباً ${selectedRequest.customerName}، معك فريق يوزرسيف بخصوص طلبك التجريبي رقم [${selectedRequest.id}].`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
>
```
يقوم هذا الزر بفتح محادثة واتساب موجهة للعميل تتضمن كود طلبه واسمه الشخصي لتسهيل التنسيق الفني.

### 7.2. تحديث الحالة وتوجيه الخطوة التالية (`handleStatusChange`):
```typescript
const handleStatusChange = async (newStatus: RequestStatus) => {
  if (!selectedRequest) return;
  setIsUpdating(true);
  try {
    const updated = await updateRequestStatus(
      selectedRequest.id,
      newStatus,
      editingNotes.trim(),
      newStatus === 'rejected' ? rejectionReason.trim() : undefined,
      editingNextStep.trim() || undefined
    );

    // تحديث السجل فورياً على الشاشة
    setRequests((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setSelectedRequest(updated);
    setActionSuccessMsg(`تم تحديث حالة الطلب إلى "${getStatusDetails(newStatus).label}" بنجاح!`);
  } catch {
    alert('حدث خطأ أثناء تحديث الحالة.');
  } finally {
    setIsUpdating(false);
  }
};
```

### 7.3. حظر الرفض بدون سبب:
عند الضغط على زر *"رفض الطلب"*، يتم التحقق الصارم من وجود نص في حقل `rejectionReason`؛ وإذا كان فارغاً يُمنع التنفيذ ويُطالب المشرف بتوضيح السبب لحفظ حق العميل وتوجيهه.

---

## 8. ميزة إعادة ضبط البيانات التجريبية (Demo Data Reset)

```typescript
const handleResetData = () => {
  if (window.confirm('هل أنت متأكد من رغبتك في إعادة ضبط البيانات التجريبية (Demo Data)؟')) {
    resetDemoData();
    loadRequests();
    if (isModalOpen) setIsModalOpen(false);
  }
};
```
- تتيح هذه الدالة استعادة السجلات النموذجية الافتراضية الأربعة (`YZ-0001` إلى `YZ-0004`) مع تنظيف أي طلبات تجريبية مكررة أنشأها المستخدم أثناء التقييم.

---

## 9. الاعتماديات والارتباطات (Cross-Page Links)

| الملف | نوع العلاقة | الوصف |
| :--- | :--- | :--- |
| `mock-api.ts` | Data Layer | استدعاء `getRequests()`, `updateRequestStatus()`, `resetDemoData()` |
| `TrackRequest.tsx` | External Link | فتح الرابط العام للطلب للتأكد من انعكاس التحديثات كما يراها العميل |
| `AdminLogin.tsx` | Session End | الوجهة عند تسجيل الخروج (`logoutAdmin`) |
| `types.ts` | Type Safety | استيراد أنواع `ServiceRequest` و `RequestStatus` |
