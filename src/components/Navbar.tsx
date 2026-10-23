import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'الرئيسية', path: '/' },
    { label: 'من نحن', path: '/about' },
    { label: 'الخدمات', path: '/services' },
    { label: 'معرض الأعمال', path: '/portfolio' },
    { label: 'تواصل معنا', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-[#EFEFEA]/95 backdrop-blur-md transition-all shadow-xs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between relative">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065E5A] rounded-xl p-1"
          aria-label="الصفحة الرئيسية - يوزرسيف"
        >
          <BrandLogo
            variant="green-on-paper"
            className="h-10 sm:h-12 w-auto group-hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'text-white bg-[#0B5F55] shadow-sm font-bold'
                    : 'text-slate-700 hover:text-[#0B5F55] hover:bg-slate-200/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Empty placeholder on desktop to balance spacing; Mobile hamburger on mobile */}
        <div className="flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065E5A]"
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-[#EFEFEA] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-[#0B5F55] text-white'
                      : 'text-slate-700 hover:bg-slate-200/50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronDown className="w-4 h-4 -rotate-90 rtl:rotate-90 opacity-60" />
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
