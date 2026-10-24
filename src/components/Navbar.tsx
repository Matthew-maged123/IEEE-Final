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
  Sparkles,
  Sun,
  Moon,
  LogOut,
  ShieldCheck
} from './ui/icons';
import { BrandLogo } from './BrandLogo';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { YUZERSEF_WHATSAPP, generateWhatsAppLink } from '../lib/utils';

export const Navbar: React.FC = () => {
  // Set to true to re-enable the top utility bar anytime
  const SHOW_TOP_BAR = false;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  // Close menus on route change
  useEffect(() => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    {
      label: 'تيشرتات وهوديز',
      path: '/request?service=clothing-hoodies',
      responsiveClass: 'hidden min-[600px]:inline-flex',
    },
    {
      label: 'كابات ومطرزات',
      path: '/request?service=caps-embroidery',
      responsiveClass: 'hidden min-[750px]:inline-flex',
    },
    {
      label: 'مجات وهدايا',
      path: '/request?service=mugs-promotional-gifts',
      responsiveClass: 'hidden min-[900px]:inline-flex',
    },
    {
      label: 'معرض الأعمال',
      path: '/portfolio',
      responsiveClass: 'hidden min-[1050px]:inline-flex',
    },
    {
      label: 'الخدمات',
      path: '/services',
      responsiveClass: 'hidden min-[1200px]:inline-flex',
    },
    {
      label: 'من نحن',
      path: '/about',
      responsiveClass: 'hidden min-[1350px]:inline-flex',
    },
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
          2. Floating White Pill Navbar (Gradual responsive button collapse)
      ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-3 sm:px-6 pt-3 sm:pt-4 pb-3 sm:pb-4">
        <div
          data-navbar-capsule
          className="bg-white rounded-full shadow-lg border border-slate-200/90 px-3 sm:px-5 h-[59px] sm:h-[67px] flex items-center justify-between relative transition-all pointer-events-auto"
        >
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

          {/* Middle: Navigation Category Links (Gradually hides buttons one by one as window narrows) */}
          <nav className="flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 shrink-0">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${link.responsiveClass} px-2.5 sm:px-3 py-1.5 rounded-full text-[13px] sm:text-sm font-black whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'text-[#0B5F55] bg-emerald-50 font-black shadow-2xs'
                      : 'text-slate-900 font-extrabold hover:text-[#0B5F55] hover:bg-slate-100'
                  }`}
                >
                  <span className="font-black tracking-tight">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Left (End in RTL): Pill CTA Button + User Icon + Theme Icon + Bag Icon + Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Prominent Vibrant Capsule Button ("Create Your Shirt / صمم واطلب الآن") */}
            <Link to="/request">
              <button className="bg-[#E3A92F] hover:bg-[#d89c25] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#073B35] text-[#073B35] font-black text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl border-2 border-[#073B35] shadow-[3px_3px_0px_#073B35] transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5" />
                <span>صمّم واطلب الآن</span>
              </button>
            </Link>

            {/* User Icon & Account Dropdown */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border border-emerald-300 bg-emerald-50 text-[#073B35] hover:bg-emerald-100 transition-all cursor-pointer text-xs font-black"
                  title={`حسابي (${user.name})`}
                  aria-expanded={userMenuOpen}
                >
                  <div className="w-6 h-6 rounded-full bg-[#073B35] text-white flex items-center justify-center text-[10px] font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className={`w-3 h-3 text-[#073B35] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute end-0 mt-2 w-64 bg-white rounded-2xl border-2 border-[#073B35] shadow-[4px_4px_0px_#073B35] z-50 p-3 space-y-2 text-right">
                      <div className="p-2 bg-[#FAF8F5] rounded-xl border border-slate-200">
                        <div className="font-black text-sm text-[#012C2B] truncate">{user.name}</div>
                        <div className="text-[11px] text-slate-500 truncate" dir="ltr">{user.email}</div>
                        <div className="mt-1 flex items-center gap-1">
                          <span className="text-[10px] font-bold bg-[#E3A92F]/20 text-[#073B35] px-2 py-0.5 rounded-md border border-[#E3A92F]/40">
                            {user.role === 'admin' ? 'مشرف معتمد 🛡️' : 'عميل يوزرسيف 🌟'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs font-bold text-slate-700">
                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-amber-50 hover:text-[#073B35] transition-colors"
                          >
                            <ShieldCheck className="w-4 h-4 text-[#E3A92F]" />
                            <span>لوحة تحكم المشرف</span>
                          </Link>
                        )}
                        <Link
                          to="/track"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#FAF8F5] hover:text-[#0B5F55] transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4 text-[#0B5F55]" />
                          <span>تتبع حالة طلباتي</span>
                        </Link>
                        <Link
                          to="/request"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#FAF8F5] hover:text-[#0B5F55] transition-colors"
                        >
                          <Sparkles className="w-4 h-4 text-[#E3A92F]" />
                          <span>طلب تفصيل وتطريز جديد</span>
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 p-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>تسجيل الخروج</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                title="تسجيل الدخول / إنشاء حساب"
                className="p-2 sm:p-2.5 text-slate-700 hover:text-[#0B5F55] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                aria-label="تسجيل الدخول أو إنشاء حساب"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            )}

            {/* Dark / Light Mode Switcher Button */}
            <button
              type="button"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
              aria-label={theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
              className="p-2 sm:p-2.5 text-slate-700 hover:text-[#0B5F55] hover:bg-slate-100 rounded-full transition-all cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#E3A92F]" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

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

            {/* Mobile Menu Hamburger Button with Morph & Press Animation */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-[1350px]:hidden relative p-2 sm:p-2.5 rounded-full text-slate-700 hover:text-[#0B5F55] hover:bg-slate-100 active:scale-[0.88] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065E5A] cursor-pointer group flex items-center justify-center shrink-0"
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
              aria-expanded={mobileMenuOpen}
            >
              {/* Animated 3-line Hamburger into X */}
              <div
                className={`w-5 h-4 relative flex flex-col justify-between transition-transform duration-300 ease-in-out ${
                  mobileMenuOpen ? 'rotate-90' : 'rotate-0'
                }`}
              >
                {/* Top Bar */}
                <span
                  className={`h-[2px] w-full bg-current rounded-full transition-all duration-300 ease-in-out origin-center ${
                    mobileMenuOpen
                      ? 'translate-y-[7px] rotate-45 text-[#0B5F55] dark:text-[#E3A92F]'
                      : 'translate-y-0 rotate-0'
                  }`}
                />
                {/* Middle Bar */}
                <span
                  className={`h-[2px] w-full bg-current rounded-full transition-all duration-200 ease-in-out origin-center ${
                    mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                  }`}
                />
                {/* Bottom Bar */}
                <span
                  className={`h-[2px] w-full bg-current rounded-full transition-all duration-300 ease-in-out origin-center ${
                    mobileMenuOpen
                      ? '-translate-y-[7px] -rotate-45 text-[#0B5F55] dark:text-[#E3A92F]'
                      : 'translate-y-0 rotate-0'
                  }`}
                />
              </div>
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
                <BrandLogo
                  variant={theme === 'dark' ? 'white-on-deep' : 'green-on-paper'}
                  className="h-9 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -m-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-[#0B5F55] dark:hover:text-[#E3A92F] hover:bg-slate-100 dark:hover:bg-white/10 hover:rotate-90 active:scale-85 transition-all duration-200 cursor-pointer"
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
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
                        active
                          ? 'bg-[#0B5F55] text-white font-black shadow-xs'
                          : 'text-slate-900 font-extrabold hover:bg-[#eae4d7] hover:text-[#0B5F55]'
                      }`}
                    >
                      <span className="font-extrabold">{link.label}</span>
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
                  <button className="w-full bg-[#E3A92F] hover:bg-[#d89c25] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#073B35] text-[#073B35] font-black text-sm py-3 rounded-xl border-2 border-[#073B35] shadow-[4px_4px_0px_#073B35] transition-all cursor-pointer flex items-center justify-center gap-2">
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

                {/* Authentication Links in Drawer */}
                {isAuthenticated && user ? (
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#073B35] text-white flex items-center justify-center text-xs font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#012C2B]">{user.name}</div>
                          <div className="text-[10px] text-slate-500">{user.email}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-[#E3A92F] text-[#073B35] px-1.5 py-0.5 rounded">
                        {user.role === 'admin' ? 'مشرف' : 'عميل'}
                      </span>
                    </div>

                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-[#073B35] hover:bg-emerald-100 transition-colors"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#E3A92F]" />
                        <span>لوحة تحكم المشرف</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/auth?mode=signin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-[#073B35] bg-amber-50 hover:bg-amber-100 transition-colors"
                    >
                      <User className="w-4 h-4 text-[#0B5F55]" />
                      <span>تسجيل الدخول / حساب جديد</span>
                    </Link>

                    <Link
                      to="/admin/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#eae4d7] transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-500" />
                      <span>لوحة تحكم المشرف</span>
                    </Link>
                  </>
                )}

                {/* Dark / Light Mode Switcher in Drawer */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#eae4d7] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4 text-[#E3A92F]" />
                    ) : (
                      <Moon className="w-4 h-4 text-[#0B5F55]" />
                    )}
                    <span>{theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full font-bold">
                    {theme === 'dark' ? '☀️ فاتح' : '🌙 داكن'}
                  </span>
                </button>
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
