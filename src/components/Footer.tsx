import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#012C2B] text-emerald-100/90 pt-16 pb-12 border-t border-[#065E5A]/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#065E5A]/40">
          {/* Col 1: Brand - Using white-on-deep on dark green background #012C2B, NO imitating text next to it */}
          <div className="space-y-4">
            <Link to="/" className="inline-block" aria-label="يوزرسيف">
              <BrandLogo
                variant="white-on-deep"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-emerald-100/70 leading-relaxed pt-1">
              وكالة تصميم وطباعة متكاملة تجمع بين الفكر الإبداعي والتقنيات الطباعية الحديثة لتحويل أفكارك إلى هوية ملموسة وواقعية.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#065E5A]/40 border border-[#065E5A] text-xs text-[#E3A92F]">
                <span>مشروع مسابقة Brand & Build × IEEE Aswan Student Branch</span>
              </div>

              {/* Direct Brand Package & Brief PDF Downloads for Judges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-brand-guide'))}
                  className="px-2.5 py-1 rounded-md bg-[#E3A92F] hover:bg-[#d89c25] text-[#073B35] font-black text-[11px] transition-all cursor-pointer inline-flex items-center gap-1 shadow-xs"
                >
                  <span>حقيبة الهوية والتحكيم 🏆</span>
                </button>

                <a
                  href="/briefs/Brand-and-Build-Client-Brief-English_0e6dce5b.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-emerald-100 text-[11px] font-bold transition-all border border-white/15"
                >
                  بريف المسابقة (PDF)
                </a>

                <a
                  href="/briefs/Yuzersef-Project-Documentation_e75af4b9.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-emerald-100 text-[11px] font-bold transition-all border border-white/15"
                >
                  ملف التوثيق (PDF)
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Fast Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base">روابط سريعة</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#065E5A]"></span>
                  من نحن ورؤيتنا
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#065E5A]"></span>
                  خدمات الطباعة والتصميم
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#065E5A]"></span>
                  معرض المشاريع السابقة
                </Link>
              </li>
              <li>
                <Link to="/request" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#065E5A]"></span>
                  معالج تقديم طلب جديد
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#065E5A]"></span>
                  تتبع حالة الطلب بالرقم
                </Link>
              </li>
              <li>
                <Link to="/policies" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#065E5A]"></span>
                  السياسات والشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base">معلومات التواصل المعتمدة</h4>
            <ul className="space-y-3 text-sm text-emerald-100/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E3A92F] mt-1 shrink-0" />
                <span>أسوان، جمهورية مصر العربية (قيد تأكيد العنوان الدقيق مع العميل)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E3A92F] shrink-0" />
                <a
                  href={`https://wa.me/201116891025`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#E3A92F] transition-colors font-mono"
                  dir="ltr"
                >
                  01116891025 (واتساب رسمي)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E3A92F] shrink-0" />
                <span className="text-white font-mono">contact@usersafe.demo (قيد التأكيد)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#E3A92F] shrink-0" />
                <span>السبت - الخميس (ساعات العمل الرسمية قيد التأكيد)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Demo Admin & Avatar */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <BrandLogo variant="square-icon" className="w-7 h-7 rounded-lg shrink-0 shadow-sm" />
              <h4 className="text-white font-bold text-base">بوابة المشرف التجريبي</h4>
            </div>
            <p className="text-xs text-emerald-100/70 leading-relaxed">
              يمكنك تجربة دور المسؤول لاعتماد أو رفض الطلبات ومتابعة التحديث المباشر للحالة.
            </p>
            <div className="p-3 rounded-lg bg-[#065E5A]/40 border border-[#065E5A] text-xs space-y-1 font-mono">
              <div className="text-emerald-200">المستخدم: <span className="text-white font-bold">admin</span></div>
              <div className="text-emerald-200">كلمة المرور: <span className="text-white font-bold">demo123</span></div>
            </div>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-[#5ee7cf] hover:text-white font-medium"
            >
              الانتقال لبوابة المسؤول التجريبية
              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-[-90deg]" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/60">
          <p>© {new Date().getFullYear()} وكالة يوزرسيف للحلول الإبداعية والطباعة. جميع الحقوق محفوظة (نسخة تجريبية Frontend).</p>
          <div className="flex items-center gap-4">
            <Link to="/policies" className="hover:text-white transition-colors">
              سياسة الخصوصية
            </Link>
            <span>•</span>
            <Link to="/policies" className="hover:text-white transition-colors">
              شروط الخدمة والاسترجاع
            </Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-white transition-colors">
              بوابة المشرف
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
