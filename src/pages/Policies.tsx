import React from 'react';
import { ShieldCheck, FileText, AlertTriangle, RefreshCw, Lock, Sparkles } from '../components/ui/icons';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export const Policies: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 space-y-12">
      {/* Header */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
        <Badge variant="demo" className="text-xs">
          الشروط والأحكام (مسودة للمراجعة والاعتماد)
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          سياسات العمل والشروط والأحكام
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          تنظم هذه البنود العلاقة بين وكالة «يوزرسيف» والعميل لضمان الشفافية وحماية حقوق الطرفين في كافة عمليات التصميم والطباعة.
        </p>
      </section>

      {/* Warning Box for Confirmation */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-base font-bold">تنبيه هام يتطلب اعتماد العميل (Needs Confirmation)</h2>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            جميع النصوص والسياسات المذكورة في هذه الصفحة تمثل مسودة أولية قياسية (Placeholder Draft). يتعين على إدارة العميل القانونية والمالية مراجعتها واعتماد نسب العربون، سياسات الإرجاع، وفترات الشحن الرسمية قبل تفعيل النظام الإنتاجي.
          </p>
        </div>
      </section>

      {/* Main Policies Accordions/Cards */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
        {/* Policy 1: Design & Approval */}
        <Card className="border-slate-200 shadow-xs">
          <CardContent className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. سياسة التصميم واعتماد النماذج الأولية</h3>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
              <p>
                • تشمل خدمات الهوية والتصميم عدداً محدداً من جولات التعديل (3 جولات مجانية) بناءً على المواصفات المكتوبة مسبقاً في معالج الطلب.
              </p>
              <p>
                • يتم إرسال نموذج رقمي تجريبي (Digital Proof) للموافقة المكتوبة قبل إرسال أي ملفات إلى خطوط الطباعة.
              </p>
              <p>
                • يعد اعتماد العميل النهائي للبروفة إقراراً منه بصحة النصوص والأرقام والتهجئة، وتخلي الوكالة مسؤوليتها عن أية أخطاء لغوية اعتمدها العميل.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Policy 2: Printing & Color Standards */}
        <Card className="border-slate-200 shadow-xs">
          <CardContent className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. معايير الطباعة ومطابقة الألوان (CMYK)</h3>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
              <p>
                • نظراً لاختلاف نظام ألوان الشاشات الرقمية (RGB) عن نظام أحبار الطباعة (CMYK)، قد يحدث تفاوت طفيف في درجة اللون لا يتعدى 5% إلى 8%، وهو أمر طبيعي متعارف عليه في صناعة الطباعة.
              </p>
              <p>
                • يمكن للعميل طلب عينة طباعية ورقية فعلية (Hard Proof) للكميات الكبيرة للتأكد من مطابقة الألوان قبل بدء الطباعة الشاملة.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Policy 3: Cancellation & Refund */}
        <Card className="border-slate-200 shadow-xs">
          <CardContent className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. سياسة الإلغاء والاسترجاع</h3>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
              <p>
                • يمكن إلغاء الطلب واسترداد قيمته بالكامل طالما أن حالة الطلب لا تزال «قيد المراجعة» ولم تبدأ مرحلة التنفيذ.
              </p>
              <p>
                • في حال انتقال الطلب إلى حالة «قيد التنفيذ»، لا يمكن استرداد تكاليف الخامات والورق التي تم قصها أو تجهيزها خصيصاً للطلب.
              </p>
              <p>
                • إذا وجد عيب مصنعي واضح صادر من طرفنا في الطباعة أو التغليف، نلتزم بإعادة طباعة الطلب مجاناً على وجه السرعة.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Policy 4: Privacy & Data Retention */}
        <Card className="border-slate-200 shadow-xs">
          <CardContent className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">4. خصوصية البيانات وحماية الملكية الفكرية</h3>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
              <p>
                • نلتزم بالحفاظ على سرية ملفات ومخططات العملاء، ولا نشاركها مع أي طرف ثالث غير معني بعملية الإنتاج والتوصيل.
              </p>
              <p>
                • تعود كافة حقوق الملكية الفكرية للتصاميم المعتمدة والمدفوعة بالكامل إلى العميل بشكل نهائي.
              </p>
              <p>
                • في بيئة العرض التجريبية الحالية (Demo Mode)، يتم تخزين بيانات الطلبات في متصفح المستخدم المحلي فقط (LocalStorage) ولا يتم رفعها لأي سيرفر خارجي.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
