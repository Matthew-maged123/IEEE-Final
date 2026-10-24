import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  FileText,
  AlertCircle,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Phone,
  Mail,
  User,
  MessageCircle,
  Shirt,
  Smartphone,
  Tag,
  Truck,
  Plus,
  Package,
  X,
  UploadCloud
} from '../components/ui/icons';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input, Textarea, Label } from '../components/ui/input';
import { Modal } from '../components/ui/modal';
import { BrandLogo } from '../components/BrandLogo';
import {
  getCurrentAdmin,
  logoutAdmin,
  getRequests,
  updateRequestStatus,
  resetDemoData
} from '../lib/mock-api';
import { ServiceRequest, RequestStatus } from '../lib/types';
import { formatDateAr, getStatusDetails, formatFileSize, generateWhatsAppLink } from '../lib/utils';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const admin = getCurrentAdmin();
  // ─── Tab state ────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'requests' | 'products'>('requests');

  // ─── Products management types & state ───────────────────────────────────
  type ProductVariantSize = { size: string; inStock: boolean };
  type ProductVariant = {
    colorName: string;
    colorHex: string;
    images: string[];
    sizes: ProductVariantSize[];
  };
  type DemoService = {
    id: string;
    title: string;
    category: string;
    description: string;
    basePrice: number;
    isActive: boolean;
    variants: ProductVariant[];
  };

  const CLOTHING_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
  const CATEGORY_OPTIONS = [
    { value: 'clothing', label: 'ملابس (Clothing)' },
    { value: 'caps', label: 'كابات (Caps)' },
    { value: 'stickers', label: 'ستيكر (Stickers)' },
    { value: 'mugs', label: 'مجات (Mugs)' },
    { value: 'gifts', label: 'هدايا (Gifts)' },
    { value: 'phone-cases', label: 'كفرات موبايل (Phone Cases)' },
    { value: 'custom', label: 'مخصص (Custom)' },
  ];
  const emptyVariant = (): ProductVariant => ({
    colorName: '',
    colorHex: '#000000',
    images: [],
    sizes: CLOTHING_SIZES.map((s) => ({ size: s, inStock: true })),
  });

  const [services, setServices] = useState<DemoService[]>([
    {
      id: '1', title: 'تيشيرت وهودي مخصص', category: 'clothing',
      description: 'طباعة على الملابس بتقنية DTF عالية الجودة', basePrice: 350, isActive: true,
      variants: [
        { colorName: 'أسود', colorHex: '#000000', images: ['/products/tshirt-black-front.png', '/products/tshirt-black-back.png'], sizes: CLOTHING_SIZES.map((s) => ({ size: s, inStock: s !== 'XXL' })) },
        { colorName: 'أبيض', colorHex: '#FFFFFF', images: ['/products/tshirt-white-front.png', '/products/tshirt-white-back.png'], sizes: CLOTHING_SIZES.map((s) => ({ size: s, inStock: s !== 'XXL' })) },
        { colorName: 'رمادي', colorHex: '#9CA3AF', images: ['/products/tshirt-grey-front.png', '/products/tshirt-grey-back.png'], sizes: CLOTHING_SIZES.map((s) => ({ size: s, inStock: true })) },
      ],
    },
    {
      id: '2', title: 'كاب شبابي مطبوع', category: 'caps',
      description: 'طباعة أو تطريز على الكابات والقبعات', basePrice: 200, isActive: true,
      variants: [
        { colorName: 'أسود', colorHex: '#000000', images: ['/products/cap-black-front.png', '/products/cap-black-side.png'], sizes: [{ size: 'ONE SIZE', inStock: true }] },
        { colorName: 'كحلي', colorHex: '#1b2a4a', images: ['/products/cap-navy-front.png'], sizes: [{ size: 'ONE SIZE', inStock: true }] },
        { colorName: 'أبيض', colorHex: '#FFFFFF', images: ['/products/cap-white-front.png'], sizes: [{ size: 'ONE SIZE', inStock: true }] },
      ],
    },
    {
      id: '3', title: 'مج سيراميك مطبوع', category: 'mugs',
      description: 'طباعة على المجات السيراميك والسحرية', basePrice: 120, isActive: true,
      variants: [
        { colorName: 'أبيض', colorHex: '#FFFFFF', images: ['/products/mug-white-0.png'], sizes: [{ size: 'ONE SIZE', inStock: true }] },
        { colorName: 'أسود', colorHex: '#000000', images: ['/products/mug-black.png'], sizes: [{ size: 'ONE SIZE', inStock: true }] },
      ],
    },
  ]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<DemoService, 'id'>>({
    title: '', category: 'clothing', description: '', basePrice: 0, isActive: true,
    variants: [emptyVariant()],
  });

  const handleSaveProduct = () => {
    if (!newProduct.title.trim() || !newProduct.description.trim()) {
      alert('يرجى ملء عنوان ووصف المنتج');
      return;
    }
    setServices((prev) => [...prev, { ...newProduct, id: Date.now().toString() }]);
    setIsProductModalOpen(false);
    setNewProduct({ title: '', category: 'clothing', description: '', basePrice: 0, isActive: true, variants: [emptyVariant()] });
  };
  const getCategoryLabel = (cat: string) => CATEGORY_OPTIONS.find((c) => c.value === cat)?.label ?? cat;

  const handleVariantImageUpload = (vi: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert(`الملف "${file.name}" ليس صورة صالحة`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setNewProduct((prev) => ({
            ...prev,
            variants: prev.variants.map((v, i) =>
              i === vi ? { ...v, images: [...v.images.filter(Boolean), result] } : v
            ),
          }));
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleRemoveVariantImage = (vi: number, imgIdx: number) => {
    setNewProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) =>
        i === vi ? { ...v, images: v.images.filter((_, j) => j !== imgIdx) } : v
      ),
    }));
  };

  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | RequestStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected request for details modal / actions
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states inside modal
  const [editingNotes, setEditingNotes] = useState('');
  const [editingNextStep, setEditingNextStep] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Check auth
  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
    }
  }, [admin, navigate]);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const data = await getRequests();
      setRequests(data);
    } catch {
      alert('خطأ في تحميل بيانات الطلبات.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      loadRequests();
    }
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const handleResetData = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة ضبط البيانات التجريبية (Demo Data)؟')) {
      resetDemoData();
      loadRequests();
      if (isModalOpen) setIsModalOpen(false);
    }
  };

  const openDetails = (req: ServiceRequest) => {
    setSelectedRequest(req);
    setEditingNotes(req.adminNotes || '');
    setEditingNextStep(req.nextStepText || '');
    setRejectionReason(req.rejectionReason || '');
    setActionSuccessMsg('');
    setIsModalOpen(true);
  };

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

      // Update list immediately on screen
      setRequests((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      setSelectedRequest(updated);
      setActionSuccessMsg(`تم تحديث حالة الطلب إلى "${getStatusDetails(newStatus).label}" بنجاح!`);
    } catch {
      alert('حدث خطأ أثناء تحديث الحالة.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotesOnly = async () => {
    if (!selectedRequest) return;
    setIsUpdating(true);
    try {
      const updated = await updateRequestStatus(
        selectedRequest.id,
        selectedRequest.status,
        editingNotes.trim(),
        selectedRequest.rejectionReason,
        editingNextStep.trim()
      );
      setRequests((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      setSelectedRequest(updated);
      setActionSuccessMsg('تم حفظ الملاحظات وتوجيهات الخطوة التالية بنجاح!');
    } catch {
      alert('حدث خطأ أثناء حفظ التحديثات.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    const matchesFilter = activeFilter === 'all' || r.status === activeFilter;
    const matchesSearch =
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.phone && r.phone.includes(searchQuery));
    return matchesFilter && matchesSearch;
  });

  // Count stats
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

  if (!admin) return null;

  return (
    <div className="py-8 sm:py-12 space-y-8 bg-transparent min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-white rounded-2xl border border-slate-200 p-1.5 shadow-xs w-fit">
          <button
            onClick={() => setActiveTab('requests')}
            className={activeTab === 'requests' ? 'px-4 py-2 rounded-xl text-sm font-bold bg-[#012C2B] text-white shadow-sm' : 'px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100'}>
            📋 الطلبات
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={activeTab === 'products' ? 'px-4 py-2 rounded-xl text-sm font-bold bg-[#012C2B] text-white shadow-sm' : 'px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100'}>
            🛍️ إدارة المنتجات
          </button>
        </div>

        {activeTab === 'requests' && (<>
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <BrandLogo variant="square-icon" className="w-12 h-12 rounded-xl shrink-0 shadow-sm" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">لوحة تحكم يوزرسيف (Demo Dashboard)</h1>
                <Badge variant="demo" className="text-[10px] bg-[#065E5A]/10 text-[#065E5A] border-[#065E5A]/30">
                  مدير النظام (Demo)
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                مرحباً بك، <strong className="text-slate-800">{admin.name}</strong> • فحص واعتماد طلبات الطباعة وتحديث الحالات الحية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetData}
              className="text-xs gap-1.5 text-slate-600 hover:text-rose-600 border-slate-300"
              title="إعادة تعيين البيانات للوضع الافتراضي"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط البيانات</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs gap-1.5 text-rose-600 hover:bg-rose-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج</span>
            </Button>
          </div>
        </div>

        {/* Quick KPI Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {[
            { id: 'all', label: 'الكل', count: stats.total, color: 'text-slate-900', border: 'border-slate-300' },
            { id: 'submitted', label: 'تم التقديم', count: stats.submitted, color: 'text-slate-700', border: 'border-slate-300' },
            { id: 'under-review', label: 'قيد المراجعة', count: stats.underReview, color: 'text-amber-700', border: 'border-amber-300' },
            { id: 'approved', label: 'معتمد', count: stats.approved, color: 'text-teal-700', border: 'border-teal-300' },
            { id: 'in-progress', label: 'قيد الطباعة', count: stats.inProgress, color: 'text-[#065E5A]', border: 'border-[#065E5A]' },
            { id: 'ready', label: 'جاهز للتسليم', count: stats.ready, color: 'text-emerald-700', border: 'border-emerald-300' },
            { id: 'rejected', label: 'مرفوض', count: stats.rejected, color: 'text-rose-700', border: 'border-rose-300' },
          ].map((kpi) => (
            <div
              key={kpi.id}
              onClick={() => setActiveFilter(kpi.id as any)}
              className={`p-3 rounded-xl border bg-white cursor-pointer transition-all text-center ${
                activeFilter === kpi.id
                  ? 'border-[#065E5A] ring-2 ring-[#065E5A]/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-[11px] text-slate-500 font-semibold block truncate">{kpi.label}</span>
              <p className={`text-xl font-black mt-0.5 ${kpi.color}`}>{kpi.count}</p>
            </div>
          ))}
        </div>

        {/* Requests Management Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3 rtl:rotate-90 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث برقم الطلب أو العميل أو الهاتف..."
                className="w-full h-10 rounded-lg border border-slate-200 ps-9 pe-3 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065E5A] bg-slate-50/50"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {(
                [
                  { id: 'all', label: 'الكل' },
                  { id: 'submitted', label: 'جديد' },
                  { id: 'under-review', label: 'مراجعة' },
                  { id: 'approved', label: 'معتمد' },
                  { id: 'in-progress', label: 'تنفيذ' },
                  { id: 'ready', label: 'جاهز' },
                  { id: 'rejected', label: 'مرفوض' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-[#012C2B] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center text-xs text-slate-500">جاري تحميل الطلبات...</div>
            ) : filteredRequests.length === 0 ? (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <FileText className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-sm">لا توجد طلبات مطابقة لهذا البحث أو الفلتر.</p>
              </div>
            ) : (
              <table className="w-full text-start border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                    <th className="py-3 px-4 text-start">رقم الطلب</th>
                    <th className="py-3 px-4 text-start">العميل</th>
                    <th className="py-3 px-4 text-start">الخدمة</th>
                    <th className="py-3 px-4 text-start">الكمية</th>
                    <th className="py-3 px-4 text-start">طريقة الاستلام</th>
                    <th className="py-3 px-4 text-start">الحالة</th>
                    <th className="py-3 px-4 text-start">تاريخ الإرسال</th>
                    <th className="py-3 px-4 text-center">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredRequests.map((req) => {
                    const statusDetail = getStatusDetails(req.status);
                    return (
                      <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#065E5A]">
                          {req.id}
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{req.customerName}</p>
                          <p className="text-[11px] text-slate-400 font-mono" dir="ltr">{req.phone}</p>
                        </td>
                        <td className="py-3 px-4 text-slate-700 max-w-[170px] truncate">
                          {req.serviceTitle}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {req.quantity} قطعة
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {req.receiptPreference === 'aswan-pickup' ? 'مقر أسوان' : 'شحن'}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold border text-[11px] ${statusDetail.badgeClass}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${statusDetail.dotClass}`} />
                            {statusDetail.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                          {formatDateAr(req.createdAt)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs gap-1 border-slate-300"
                              onClick={() => openDetails(req)}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>مراجعة</span>
                            </Button>

                            <Link to={`/track?id=${req.id}`} target="_blank">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-slate-400 hover:text-[#065E5A]"
                                title="معاينة في شاشة التتبع العامة"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </Card>
        </>)}

        {/* ── Products Management Tab ─────────────────────────────────── */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-slate-900">إدارة المنتجات والخدمات</h2>
                <p className="text-xs text-slate-500 mt-0.5">إضافة وتعديل المنتجات مع ألوانها وصورها ومقاساتها</p>
              </div>
              <Button
                onClick={() => { setNewProduct({ title: '', category: 'clothing', description: '', basePrice: 0, isActive: true, variants: [emptyVariant()] }); setIsProductModalOpen(true); }}
                className="bg-[#065E5A] hover:bg-[#012C2B] text-white text-sm gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة منتج جديد
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((svc) => (
                <div key={svc.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="flex gap-1.5 p-3 bg-slate-50 border-b border-slate-100 items-center">
                    <Package className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="flex gap-1 flex-wrap flex-1">
                      {svc.variants.slice(0, 6).map((v, i) => (
                        <div key={i} title={v.colorName} className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: v.colorHex }} />
                      ))}
                      {svc.variants.length > 6 && <span className="text-[10px] text-slate-400 self-center">+{svc.variants.length - 6}</span>}
                    </div>
                    <span className={svc.isActive ? 'text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 bg-emerald-50 text-emerald-700 border border-emerald-200' : 'text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 bg-slate-100 text-slate-400'}>
                      {svc.isActive ? 'نشط' : 'مخفي'}
                    </span>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="font-bold text-slate-900 text-sm">{svc.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{svc.description}</p>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-400">{getCategoryLabel(svc.category)}</span>
                      <span className="font-bold text-[#065E5A]">{svc.basePrice} جنيه</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{svc.variants.length} لون • {svc.variants.reduce((acc, v) => acc + v.sizes.filter((s) => s.inStock).length, 0)} مقاس متاح</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Add Product Modal ─────────────────────────────────────────────── */}
      {isProductModalOpen && (
        <Modal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} title="إضافة منتج / خدمة جديدة" description="أضف بيانات المنتج مع ألوانه وصوره ومقاساته" className="max-w-2xl bg-white">
          <div className="space-y-5 pt-1 max-h-[70vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1">
                <Label required>عنوان المنتج</Label>
                <Input value={newProduct.title} onChange={(e) => setNewProduct((p) => ({ ...p, title: e.target.value }))} placeholder="مثال: تيشيرت أوفرسايز قطن 100%" />
              </div>
              <div className="space-y-1">
                <Label required>الفئة</Label>
                <select value={newProduct.category} onChange={(e) => setNewProduct((p) => ({ ...p, category: e.target.value }))} className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065E5A]">
                  {CATEGORY_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <Label>السعر المبدئي (جنيه)</Label>
                <Input type="number" min={0} value={newProduct.basePrice} onChange={(e) => setNewProduct((p) => ({ ...p, basePrice: Number(e.target.value) }))} placeholder="0" />
              </div>
              <div className="col-span-2 space-y-1">
                <Label required>وصف الخدمة</Label>
                <Textarea rows={2} value={newProduct.description} onChange={(e) => setNewProduct((p) => ({ ...p, description: e.target.value }))} placeholder="وصف مختصر..." />
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <input type="checkbox" id="isActiveCheck" checked={newProduct.isActive} onChange={(e) => setNewProduct((p) => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 accent-[#065E5A]" />
                <label htmlFor="isActiveCheck" className="text-xs font-semibold text-slate-700">المنتج نشط (ظاهر للعملاء)</label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">الألوان والمتغيرات</span>
                <button type="button" onClick={() => setNewProduct((p) => ({ ...p, variants: [...p.variants, emptyVariant()] }))} className="text-xs text-[#065E5A] font-bold hover:underline">+ إضافة لون</button>
              </div>
              {newProduct.variants.map((variant, vi) => (
                <div key={vi} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">اللون {vi + 1}</span>
                    {newProduct.variants.length > 1 && (
                      <button type="button" onClick={() => setNewProduct((p) => ({ ...p, variants: p.variants.filter((_, i) => i !== vi) }))} className="text-xs text-rose-500 hover:underline">حذف</button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label>اسم اللون</Label>
                      <Input value={variant.colorName} onChange={(e) => setNewProduct((p) => ({ ...p, variants: p.variants.map((v, i) => i === vi ? { ...v, colorName: e.target.value } : v) }))} placeholder="أسود، أبيض، كحلي..." />
                    </div>
                    <div className="space-y-1">
                      <Label>كود اللون</Label>
                      <div className="flex gap-2 items-center">
                        <input type="color" value={variant.colorHex} onChange={(e) => setNewProduct((p) => ({ ...p, variants: p.variants.map((v, i) => i === vi ? { ...v, colorHex: e.target.value } : v) }))} className="w-11 h-11 rounded-lg border border-slate-300 cursor-pointer p-0.5" />
                        <span className="text-xs font-mono text-slate-500">{variant.colorHex}</span>
                      </div>
                    </div>
                  </div>
                  {/* Images Upload from Device */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>صور المنتج لهذا اللون ({variant.images.length})</Label>
                      <span className="text-[11px] text-slate-400">ارفع الصور من جهازك مباشرة (JPG, PNG)</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      {variant.images.map((img, imgIdx) => (
                        <div key={imgIdx} className="relative group w-20 h-20 rounded-xl overflow-hidden border-2 border-slate-200 bg-white shadow-xs shrink-0">
                          <img src={img} alt={`صورة ${imgIdx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveVariantImage(vi, imgIdx)}
                            title="حذف الصورة"
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-90 hover:opacity-100 shadow-sm transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}

                      <label
                        htmlFor={`upload-variant-${vi}`}
                        className="w-20 h-20 rounded-xl border-2 border-dashed border-[#065E5A]/40 hover:border-[#065E5A] bg-[#065E5A]/5 hover:bg-[#065E5A]/10 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all shrink-0 text-[#065E5A]"
                      >
                        <UploadCloud className="w-5 h-5" />
                        <span className="text-[10px] font-bold">رفع صورة</span>
                        <input
                          type="file"
                          id={`upload-variant-${vi}`}
                          accept="image/*"
                          multiple
                          onChange={(e) => handleVariantImageUpload(vi, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>المقاسات (اضغط لتفعيل/تعطيل)</Label>
                    <div className="flex flex-wrap gap-2">
                      {variant.sizes.map((sz, si) => (
                        <button key={sz.size} type="button" onClick={() => setNewProduct((p) => ({ ...p, variants: p.variants.map((v, i) => i === vi ? { ...v, sizes: v.sizes.map((s, j) => j === si ? { ...s, inStock: !s.inStock } : s) } : v) }))} className={sz.inStock ? 'px-3 py-1.5 rounded-lg border text-xs font-bold border-[#065E5A] bg-[#065E5A]/10 text-[#065E5A]' : 'px-3 py-1.5 rounded-lg border text-xs font-bold border-slate-200 bg-white text-slate-400 line-through'}>
                          {sz.size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <Button variant="outline" size="sm" onClick={() => setIsProductModalOpen(false)} className="text-xs">إلغاء</Button>
              <Button size="sm" onClick={handleSaveProduct} className="bg-[#065E5A] hover:bg-[#012C2B] text-white text-xs">حفظ المنتج</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ACTION & DETAILS MODAL */}
      {selectedRequest && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`إدارة وفحص الطلب (${selectedRequest.id})`}
          description={selectedRequest.serviceTitle}
          className="max-w-2xl bg-white"
        >
          <div className="space-y-5 pt-1">
            {/* Success notification */}
            {actionSuccessMsg && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{actionSuccessMsg}</span>
              </div>
            )}

            {/* Current status display + Live Track link */}
            <div className="p-3.5 rounded-xl bg-[#EFEFEA] border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">الحالة الحالية:</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  {getStatusDetails(selectedRequest.status).label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/20${selectedRequest.phone.replace(/^0+/, '')}?text=${encodeURIComponent(
                    `مرحباً ${selectedRequest.customerName}، معك فريق يوزرسيف بخصوص طلبك التجريبي رقم [${selectedRequest.id}].`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:underline font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>مراسلة واتساب العميل</span>
                </a>
                <Link
                  to={`/track?id=${selectedRequest.id}`}
                  target="_blank"
                  className="text-xs text-[#065E5A] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>صفحة التتبع</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Client & Specs details */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400">العميل:</span>
                <p className="font-bold text-slate-900">{selectedRequest.customerName}</p>
              </div>
              <div>
                <span className="text-slate-400">الهاتف والبريد:</span>
                <p className="font-mono text-slate-800" dir="ltr">{selectedRequest.phone}</p>
                <p className="font-mono text-slate-500" dir="ltr">{selectedRequest.email}</p>
              </div>
              <div>
                <span className="text-slate-400">الكمية والميزانية:</span>
                <p className="font-semibold text-slate-900">
                  {selectedRequest.quantity} قطعة • {selectedRequest.budget || 'غير محدد'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">تاريخ الاستلام المرغوب:</span>
                <p className="font-mono font-semibold text-slate-900">
                  {selectedRequest.desiredDate || 'غير محدد'} ({selectedRequest.receiptPreference === 'aswan-pickup' ? 'استلام مقر أسوان' : 'شحن'})
                </p>
              </div>
            </div>

            {/* Clothing sizes check if applicable */}
            {selectedRequest.sizeBreakdown && (
              <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-700 block">تفصيل المقاسات واللون:</span>
                <p className="font-mono text-[#065E5A] font-bold">
                  {selectedRequest.clothingColor ? `اللون: ${selectedRequest.clothingColor} | ` : ''}
                  S: {selectedRequest.sizeBreakdown.s} • M: {selectedRequest.sizeBreakdown.m} • L: {selectedRequest.sizeBreakdown.l} • XL: {selectedRequest.sizeBreakdown.xl} • XXL: {selectedRequest.sizeBreakdown.xxl}
                </p>
              </div>
            )}

            {/* Project brief */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-700">مواصفات المشروع المقدمة:</span>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800 leading-relaxed max-h-24 overflow-y-auto">
                {selectedRequest.projectBrief}
              </div>
            </div>

            {/* Attachments preview */}
            {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700">المرفقات ({selectedRequest.attachments.length}):</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedRequest.attachments.map((att) => (
                    <div
                      key={att.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                    >
                      <FileText className="w-4 h-4 text-[#065E5A] shrink-0" />
                      <span className="truncate flex-1 font-mono">{att.name}</span>
                      <span className="text-slate-400 text-[10px] shrink-0">{formatFileSize(att.size)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Step Editor (Mandated by Section 7 & Page 10) */}
            <div className="space-y-1">
              <Label>توجيه الخطوة التالية للعميل (Next Step)</Label>
              <Input
                value={editingNextStep}
                onChange={(e) => setEditingNextStep(e.target.value)}
                placeholder="مثال: الاستلام غداً الساعة 5 مساءً من مقر يوزرسيف بأسوان..."
              />
            </div>

            {/* Admin Notes */}
            <div className="space-y-1">
              <Label>ملاحظات معمل أسوان (تظهر في صفحة التتبع)</Label>
              <Textarea
                rows={2}
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                placeholder="اكتب التحديثات الفنية أو تقدم الطباعة..."
              />
              <div className="flex justify-end pt-1">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleSaveNotesOnly}
                  disabled={isUpdating}
                  className="text-xs"
                >
                  حفظ الملاحظات فقط
                </Button>
              </div>
            </div>

            {/* Rejection reason */}
            <div className="space-y-1">
              <Label>سبب الرفض (إلزامي في حال الرفض)</Label>
              <Input
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="مثال: الملف المرفق منخفض الجودة / عدم توفر المقاس المطلوب..."
              />
            </div>

            {/* Lifecycle Status Action Buttons */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">تحديث حالة دورة حياة الطلب:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* 1. Review */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isUpdating || selectedRequest.status === 'under-review'}
                  onClick={() => handleStatusChange('under-review')}
                  className="text-xs border-amber-300 text-amber-800 hover:bg-amber-50"
                >
                  قيد المراجعة
                </Button>

                {/* 2. Approve */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isUpdating || selectedRequest.status === 'approved'}
                  onClick={() => handleStatusChange('approved')}
                  className="text-xs border-teal-300 text-teal-800 hover:bg-teal-50"
                >
                  اعتماد الطلب
                </Button>

                {/* 3. In Progress */}
                <Button
                  type="button"
                  size="sm"
                  disabled={isUpdating || selectedRequest.status === 'in-progress'}
                  onClick={() => handleStatusChange('in-progress')}
                  className="bg-[#065E5A] hover:bg-[#012C2B] text-white text-xs"
                >
                  بدء الطباعة
                </Button>

                {/* 4. Ready */}
                <Button
                  type="button"
                  size="sm"
                  disabled={isUpdating || selectedRequest.status === 'ready'}
                  onClick={() => handleStatusChange('ready')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                >
                  جاهز للتسليم
                </Button>
              </div>

              {/* Complete & Reject */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  type="button"
                  size="sm"
                  disabled={isUpdating || selectedRequest.status === 'completed'}
                  onClick={() => handleStatusChange('completed')}
                  className="bg-green-700 hover:bg-green-800 text-white text-xs"
                >
                  تم التسليم (مكتمل)
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={isUpdating || selectedRequest.status === 'rejected'}
                  onClick={() => {
                    if (!rejectionReason.trim()) {
                      alert('يرجى كتابة سبب الرفض أولاً في الحقل المخصص.');
                      return;
                    }
                    handleStatusChange('rejected');
                  }}
                  className="text-xs"
                >
                  رفض الطلب
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
