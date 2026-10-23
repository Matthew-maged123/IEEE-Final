import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  HelpCircle,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Sparkles
} from './ui/icons';
import { BrandLogo } from './BrandLogo';
import { YUZERSEF_WHATSAPP, generateWhatsAppLink } from '../lib/utils';

export const Navbar: React.FC = () => {
  // Set to true to re-enable the top utility bar anytime
  const SHOW_TOP_BAR = false;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'تيشرتات وهوديز', path: '/request?service=clothing-hoodies' },
    { label: 'كابات ومطرزات', path: '/request?service=caps-embroidery' },
    { label: 'مجات وهدايا', path: '/request?service=mugs-promotional-gifts' },
    { label: 'معرض الأعمال', path: '/portfolio' },
    { label: 'الخدمات', path: '/services' },
    { label: 'من نحن', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path.includes('?')) {
      const [basePath, search] = path.split('?');
      return location.pathname === basePath && location.search === `?${search}`;
    }
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  // Lock body scroll when side drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent transition-all pointer-events-none">
      {/* ─────────────────────────────────────────────────────────────
          1. Top Utility Bar (Dark Charcoal/Emerald - As in Reference)
          (Currently hidden. Set SHOW_TOP_BAR = true above to show it again)
      ───────────────────────────────────────────────────────────── */}
      {SHOW_TOP_BAR && (
        <div className="bg-[#052925] text-white text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 border-b border-emerald-900/40 pointer-events-auto">
          <div className="container mx-auto flex items-center justify-between">
            {/* Right items in RTL: Phone number & Direct WhatsApp chat */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href={`tel:${YUZERSEF_WHATSAPP}`}
                className="flex items-center gap-1.5 text-emerald-100 hover:text-[#E3A92F] transition-colors"
                title="اتصل بنا مباشرة"
              >
                <Phone className="w-3.5 h-3.5 text-[#E3A92F]" />
                <span className="font-mono dir-ltr">{YUZERSEF_WHATSAPP}</span>
              </a>

              <a
                href={generateWhatsAppLink(undefined, 'مرحباً، أود الاستفسار عن خدمات يوزرسيف للطباعة والتطريز.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-100 hover:text-[#E3A92F] transition-colors"
                title="تواصل معنا عبر واتساب"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>تواصل معنا (واتساب)</span>
              </a>
            </div>

            {/* Left items in RTL: Help Center & Track Order */}
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                to="/policies"
                className="hidden sm:flex items-center gap-1.5 text-emerald-100 hover:text-[#E3A92F] transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>مركز المساعدة والسياسات</span>
              </Link>

              <Link
                to="/track"
                className="flex items-center gap-1.5 text-[#E3A92F] hover:text-[#f4c663] transition-colors font-semibold"
              >
                <span>تتبع طلبك</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. Floating White Pill Navbar (Capsule Container - Height reduced by 5px)
      ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-3 sm:px-6 py-1.5 sm:py-2">
        <div className="bg-white rounded-full shadow-lg border border-slate-200/90 px-3.5 sm:px-6 h-[59px] sm:h-[67px] flex items-center justify-between relative transition-all pointer-events-auto">
          
          {/* Right (Start in RTL): Logo kept on the right as it is */}
          <Link
            to="/"
            className="flex items-center h-full py-1 ps-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065E5A] rounded-full shrink-0"
            aria-label="الصفحة الرئيسية - يوزرسيف"
          >
            <BrandLogo
              variant="green-on-paper"
              className="h-full max-h-[45px] sm:max-h-[53px] w-auto group-hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Middle: Desktop Navigation Category Links */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-full text-[13px] sm:text-sm font-extrabold transition-all duration-200 ${
                    active
                      ? 'text-[#0B5F55] bg-emerald-50 font-black shadow-2xs'
                      : 'text-slate-900 hover:text-[#0B5F55] hover:bg-slate-100'
                  }`}
                >
                  <span className="font-extrabold">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Left (End in RTL): Pill CTA Button + User Icon + Bag Icon + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prominent Vibrant Capsule Button ("Create Your Shirt / صمم واطلب الآن") */}
            <Link to="/request">
              <button className="bg-[#E3A92F] hover:bg-[#d89c25] text-[#073B35] font-black text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5" />
                <span>صمّم واطلب الآن</span>
              </button>
            </Link>

            {/* User Icon (Account / Admin Panel) */}
            <Link
              to="/admin/login"
              title="لوحة تحكم المشرف / الحساب"
              className="p-2 sm:p-2.5 text-slate-700 hover:text-[#0B5F55] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label="تسجيل الدخول / لوحة الإدارة"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            {/* Shopping Bag / Order Tracking Icon */}
            <Link
              to="/track"
              title="سلة وتتبع الطلبات"
              className="p-2 sm:p-2.5 text-slate-700 hover:text-[#0B5F55] hover:bg-slate-100 rounded-full transition-colors relative cursor-pointer"
              aria-label="تتبع الطلب"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 end-1 w-2 h-2 rounded-full bg-[#E3A92F] ring-2 ring-white" />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-full text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065E5A]"
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. Mobile Horizontal Side Drawer (Slides in from the Left via Portal)
      ───────────────────────────────────────────────────────────── */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Drawer Panel: Positioned on Left Screen Edge */}
          <div
            className="fixed top-0 bottom-0 left-0 w-[300px] sm:w-[340px] max-w-[85vw] h-full bg-[#FAF7F2] shadow-2xl z-[9999] flex flex-col justify-between border-r border-[#d9d2c3] animate-slide-in-left overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="القائمة الرئيسية"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#e2dbce] bg-white shrink-0">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <BrandLogo variant="green-on-paper" className="h-9 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -m-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="إغلاق القائمة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content / Nav Links */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              <div className="text-[11px] font-bold text-[#0B5F55] tracking-wider">
                أقسام المتجر
              </div>
              <nav className="flex flex-col space-y-1.5">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        active
                          ? 'bg-[#0B5F55] text-white font-bold shadow-xs'
                          : 'text-slate-700 hover:bg-[#eae4d7] hover:text-[#0B5F55]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-4 h-4 -rotate-90 rtl:rotate-90 opacity-60" />
                    </Link>
                  );
                })}
              </nav>

              {/* Primary CTA Button */}
              <div className="pt-2">
                <Link
                  to="/request"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <button className="w-full bg-[#E3A92F] hover:bg-[#d89c25] text-[#073B35] font-black text-sm py-3 rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>صمّم واطلب الآن</span>
                  </button>
                </Link>
              </div>

              {/* Quick Shortcuts */}
              <div className="pt-3 border-t border-[#e2dbce] space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500 mb-2">
                  روابط سريعة
                </div>
                <Link
                  to="/track"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#eae4d7] transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-[#0B5F55]" />
                  <span>تتبع حالة طلبك</span>
                </Link>

                <Link
                  to="/policies"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#eae4d7] transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-[#0B5F55]" />
                  <span>مركز المساعدة والسياسات</span>
                </Link>

                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#eae4d7] transition-colors"
                >
                  <User className="w-4 h-4 text-[#0B5F55]" />
                  <span>لوحة تحكم المشرف</span>
                </Link>
              </div>
            </div>

            {/* Drawer Footer: Direct Contact Info */}
            <div className="p-4 border-t border-[#e2dbce] bg-white space-y-2 text-xs shrink-0">
              <a
                href={generateWhatsAppLink(undefined, 'مرحباً، أود الاستفسار عن خدمات يوزرسيف للطباعة والتطريز.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>تواصل عبر واتساب</span>
              </a>
              <a
                href={`tel:${YUZERSEF_WHATSAPP}`}
                className="flex items-center justify-center gap-2 w-full py-1.5 text-slate-600 hover:text-slate-900 font-mono text-[11px] dir-ltr"
              >
                <Phone className="w-3.5 h-3.5 text-[#E3A92F]" />
                <span>{YUZERSEF_WHATSAPP}</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
