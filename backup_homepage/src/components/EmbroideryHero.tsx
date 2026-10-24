import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Flower } from './ui/icons';

type ProductOption = 'tshirt' | 'totebag' | 'hoodie';
type ShapeOption = 'words' | 'shapes' | 'flower';
type ColorOption = 'white' | 'black' | 'green';

export const EmbroideryHero: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductOption>('tshirt');
  const [selectedShape, setSelectedShape] = useState<ShapeOption>('words');
  const [selectedColor, setSelectedColor] = useState<ColorOption>('white');

  const productsList = [
    {
      id: 'tshirt' as ProductOption,
      num: '01',
      title: 'تيشيرت عادي',
      serviceQuery: 'clothing-hoodies',
    },
    {
      id: 'totebag' as ProductOption,
      num: '02',
      title: 'شنطة توت باج بسوستة',
      serviceQuery: 'stickers-labels',
    },
    {
      id: 'hoodie' as ProductOption,
      num: '03',
      title: 'هودي ميلتون أوفر سايز',
      serviceQuery: 'clothing-hoodies',
    },
  ];

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex flex-col justify-center pt-2 pb-3 sm:pt-4 sm:pb-4 lg:pt-5 lg:pb-5 bg-transparent text-[#073B35] select-none border-b border-[#d9d2c3]/70">
      <div className="absolute top-1/4 -start-24 w-96 h-96 bg-[#0B5F55]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -end-24 w-96 h-96 bg-[#E3A92F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 flex flex-col justify-between my-auto">
        
        {/* ─────────────────────────────────────────────────────────────
            1. Top Header Area (Grand Headline & Egyptian Brand Kicker)
        ───────────────────────────────────────────────────────────── */}
        <div className="text-center max-w-5xl xl:max-w-6xl mx-auto space-y-2 mb-3 sm:mb-5 lg:mb-6">
          {/* Eyebrow Kicker Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B5F55]/10 dark:bg-[#6A994E]/10 border border-[#0B5F55]/20 dark:border-[#6A994E]/30 text-[#0B5F55] dark:text-[#6A994E] text-xs sm:text-sm font-black tracking-wide shadow-2xs">
            <span>أفكارك. مطبوعة في أسوان.</span>
          </div>

          {/* Main Headline (Strictly One Line) */}
          <div className="flex items-center justify-center pt-1 w-full overflow-hidden">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-[#073B35] dark:text-[#F6F1E7] font-display flex flex-nowrap whitespace-nowrap items-center justify-center gap-2 sm:gap-3 leading-tight text-center">
              {/* Official Youzersef Feather Logo (Right) */}
              <img
                src="/feather-logo-green.png"
                alt="شعار يوزرسيف"
                className="h-[28px] sm:h-[44px] md:h-[54px] lg:h-[64px] xl:h-[74px] w-auto object-contain inline-block shrink-0 drop-shadow-xs -me-1 sm:-me-2"
              />
              <span className="text-[#073B35] dark:text-[#F6F1E7]">خليك مختلف،</span>
              <span className="text-[#0B5F55] dark:text-[#6A994E]">خليك يوزرسيف.</span>
              {/* Official Youzersef Feather Logo (Left) */}
              <img
                src="/feather-logo-green2.png"
                alt="شعار يوزرسيف"
                className="h-[28px] sm:h-[44px] md:h-[54px] lg:h-[64px] xl:h-[74px] w-auto object-contain inline-block shrink-0 drop-shadow-xs -ms-1 sm:-ms-2"
              />
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-[#4d6560] dark:text-[#9CB5AF] font-bold max-w-2xl mx-auto leading-relaxed">
            رسمة بتحبها، كلمة بتعبّر عنك. حوّل فكرتك لحاجة تستخدمها كل يوم.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. Interactive Studio Stage (Expanded Scale to Fill the View)
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center w-full">
          
          {/* ═══════════════════════════════════════════════════════════
              LEFT COLUMN: Design Controls (جرّب شكل يعجبك)
          ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col items-center lg:items-start order-2 lg:order-1 space-y-6">
            {/* Tool Category Label & 3 Option Buttons */}
            <div className="w-full max-w-sm xl:max-w-md">
              <span className="block text-sm sm:text-base font-black text-[#073B35] dark:text-[#F6F1E7] mb-3 text-center lg:text-start">
                جرّب شكل يعجبك
              </span>
              
              <div className="grid grid-cols-3 gap-3 w-full">
                {/* 1. Words / Logo Button */}
                <button
                  onClick={() => setSelectedShape('words')}
                  className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl border-[2.5px] border-[#073B35] transition-all cursor-pointer ${
                    selectedShape === 'words' ? 'bg-[#0B5F55] text-white shadow-[3px_3px_0px_#073B35] dark:shadow-[3px_3px_0px_#6A994E] -translate-y-0.5'
                      : 'bg-white dark:bg-[#0c2b26] text-[#073B35] dark:text-[#F6F1E7] border-[#073B35] dark:border-[#6A994E]/40 shadow-[3px_3px_0px_#073B35] dark:shadow-[3px_3px_0px_#6A994E] hover:bg-[#F6F1E7] dark:hover:bg-[#113831]'
                  }`}
                  title="طباعة شعار يوزرسيف الرسمي"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7V4h16v3M9 20h6M12 4v16" />
                  </svg>
                  <span className="text-xs sm:text-sm font-black">الشعار</span>
                </button>

                {/* 2. Shapes Button */}
                <button
                  onClick={() => setSelectedShape('shapes')}
                  className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl border-[2.5px] border-[#073B35] transition-all cursor-pointer ${
                    selectedShape === 'shapes' ? 'bg-[#0B5F55] text-white shadow-[3px_3px_0px_#073B35] dark:shadow-[3px_3px_0px_#6A994E] -translate-y-0.5'
                      : 'bg-white dark:bg-[#0c2b26] text-[#073B35] dark:text-[#F6F1E7] border-[#073B35] dark:border-[#6A994E]/40 shadow-[3px_3px_0px_#073B35] dark:shadow-[3px_3px_0px_#6A994E] hover:bg-[#F6F1E7] dark:hover:bg-[#113831]'
                  }`}
                  title="تصميم أشكال هندسية"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l6 10H6z" />
                    <rect x="3" y="15" width="6" height="6" rx="1" />
                    <circle cx="18" cy="18" r="3" />
                  </svg>
                  <span className="text-xs sm:text-sm font-black">أشكال</span>
                </button>

                {/* 3. Flower / Pattern Button */}
                <button
                  onClick={() => setSelectedShape('flower')}
                  className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl border-[2.5px] border-[#073B35] transition-all cursor-pointer ${
                    selectedShape === 'flower' ? 'bg-[#0B5F55] text-white shadow-[3px_3px_0px_#073B35] dark:shadow-[3px_3px_0px_#6A994E] -translate-y-0.5'
                      : 'bg-white dark:bg-[#0c2b26] text-[#073B35] dark:text-[#F6F1E7] border-[#073B35] dark:border-[#6A994E]/40 shadow-[3px_3px_0px_#073B35] dark:shadow-[3px_3px_0px_#6A994E] hover:bg-[#F6F1E7] dark:hover:bg-[#113831]'
                  }`}
                  title="تصميم رسمة ووردة"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
                    <path d="M12 22a4 4 0 0 0 4-4v-1a4 4 0 0 0-8 0v1a4 4 0 0 0 4 4z" />
                    <path d="M2 12a4 4 0 0 0 4 4h1a4 4 0 0 0 0-8H6a4 4 0 0 0-4 4z" />
                    <path d="M22 12a4 4 0 0 0-4-4h-1a4 4 0 0 0 0 8h1a4 4 0 0 0 4-4z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-black">وردة</span>
                </button>
              </div>
            </div>

            {/* Color Swatch Picker */}
            <div className="w-full max-w-sm xl:max-w-md">
              <span className="block text-sm sm:text-base font-black text-[#073B35] dark:text-[#F6F1E7] mb-2.5 text-center lg:text-start">
                اختار لونك
              </span>
              <div className="flex items-center gap-3.5 justify-center lg:justify-start">
                {/* White Swatch (Most Right in RTL) */}
                <button
                  onClick={() => setSelectedColor('white')}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border-[2.5px] border-[#073B35] transition-all cursor-pointer ${
                    selectedColor === 'white'
                      ? 'ring-3 ring-offset-2 ring-offset-[#F6F1E7] ring-[#0B5F55] scale-110 shadow-md'
                      : 'hover:scale-105 shadow-xs'
                  }`}
                  style={{ backgroundColor: '#ffffff' }}
                  aria-label="اللون الأبيض"
                />
                
                {/* Black Swatch (Middle in RTL) */}
                <button
                  onClick={() => setSelectedColor('black')}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black border-[2.5px] border-[#073B35] transition-all cursor-pointer ${
                    selectedColor === 'black'
                      ? 'ring-3 ring-offset-2 ring-offset-[#F6F1E7] ring-[#0B5F55] scale-110 shadow-md'
                      : 'hover:scale-105 shadow-xs'
                  }`}
                  style={{ backgroundColor: '#000000' }}
                  aria-label="اللون الأسود"
                />

                {/* Brand Green Swatch (Left in RTL) */}
                <button
                  onClick={() => setSelectedColor('green')}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0B5F55] border-[2.5px] border-[#073B35] transition-all cursor-pointer ${
                    selectedColor === 'green'
                      ? 'ring-3 ring-offset-2 ring-offset-[#F6F1E7] ring-[#E3A92F] scale-110 shadow-md'
                      : 'hover:scale-105 shadow-xs'
                  }`}
                  style={{ backgroundColor: '#0B5F55' }}
                  aria-label="أخضر يوزرسيف"
                />
              </div>
            </div>

            {/* Big Action Button (خلّيه بتصميمك) in Grand Scale */}
            <div className="w-full max-w-sm xl:max-w-md pt-2">
              <Link to={`/request?service=${selectedProduct === 'totebag' ? 'stickers-labels' : 'clothing-hoodies'}`} className="block w-full">
                <button className="w-full bg-[#E3A92F] hover:bg-[#d89c25] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#073B35] dark:active:shadow-[2px_2px_0px_#6A994E] text-[#073B35] font-black text-base sm:text-lg lg:text-xl py-4 sm:py-4.5 px-8 rounded-2xl border-[2.5px] border-[#073B35] shadow-[5px_5px_0px_#073B35] dark:shadow-[5px_5px_0px_#6A994E] transition-all cursor-pointer flex items-center justify-center gap-3">
                  <span>خلّيه بتصميمك</span>
                  <svg className="w-5 h-5 rtl:rotate-90 text-[#073B35]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              CENTER STAGE: Expanded Product Canvas & Huge Orbit Ring
          ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative order-1 lg:order-2 min-h-[320px] sm:min-h-[400px] lg:min-h-[440px] xl:min-h-[470px] -translate-y-4 sm:-translate-y-6 lg:-translate-y-8">
            {/* Grand Orbit Ring filling the central area */}
            <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] xl:w-[530px] xl:h-[530px] rounded-full border-2 border-[#0B5F55]/15 dark:border-[#6A994E]/20 pointer-events-none" />

            {/* Product Mockup Container (Greatly Scaled Up) */}
            <div className="relative w-72 sm:w-[380px] lg:w-[430px] xl:w-[480px] h-[320px] sm:h-[390px] lg:h-[430px] xl:h-[460px] flex items-center justify-center transition-all duration-300">
              
              {/* Product 1: T-Shirt (Large Display) */}
              {selectedProduct === 'tshirt' && (
                <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                  <img
                    src={
                      selectedColor === 'white'
                        ? '/products/tshirt-white-front-trans.png'
                        : selectedColor === 'green'
                        ? '/products/tshirt-green-front.png'
                        : '/products/tshirt-black-front-trans.png'
                    }
                    alt="تيشيرت مخصص"
                    className="w-full h-full object-contain filter drop-shadow-[0_16px_32px_rgba(7,59,53,0.15)]"
                  />

                  {/* Dynamic Chest Print Area */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8 sm:pb-12">
                    {/* Official Brand Logo from /public/logo */}
                    {selectedShape === 'words' && (
                      <div className="flex items-center justify-center select-none w-36 sm:w-44 lg:w-48">
                        <img
                          src={selectedColor === 'white' ? '/logo/logo-green.png' : '/logo/logo-white.png'}
                          alt="لوجو يوزرسيف الرسمي"
                          className="w-full h-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                        />
                      </div>
                    )}

                    {/* Shapes Graphic (Geometric Bauhaus Composition) */}
                    {selectedShape === 'shapes' && (
                      <div className="flex flex-col items-center justify-center gap-2 p-3 select-none">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#E3A92F]" />
                          <div className="w-8 h-8 bg-[#0B5F55] rotate-45" />
                        </div>
                        <div className="w-20 h-5 bg-[#073B35] rounded-xs mt-1" />
                        <span className="text-xs sm:text-sm font-black text-[#073B35] font-mono tracking-widest mt-1">
                          YUZERSEF
                        </span>
                      </div>
                    )}

                    {/* Flower Graphic */}
                    {selectedShape === 'flower' && (
                      <div className="flex flex-col items-center justify-center select-none">
                        <svg className={`w-16 h-16 sm:w-20 sm:h-20 ${selectedColor === 'white' ? 'text-[#0B5F55]' : 'text-[#E3A92F]'} animate-pulse`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
                          <path d="M12 22a4 4 0 0 0 4-4v-1a4 4 0 0 0-8 0v1a4 4 0 0 0 4 4z" />
                          <path d="M2 12a4 4 0 0 0 4 4h1a4 4 0 0 0 0-8H6a4 4 0 0 0-4 4z" />
                          <path d="M22 12a4 4 0 0 0-4-4h-1a4 4 0 0 0 0 8h1a4 4 0 0 0 4-4z" />
                        </svg>
                        <span className="text-xs sm:text-sm font-black text-[#E3A92F] mt-2 tracking-widest">
                          FLOWER ART
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Product 2: Tote Bag (Large Display) */}
              {selectedProduct === 'totebag' && (
                <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="relative w-full h-full flex items-center justify-center scale-110 sm:scale-125">
                    <img
                      src="/products/Tote_Bag_Mockup.png"
                      alt="شنطة توت باج مخصصة"
                      className={`w-full h-full object-contain filter drop-shadow-[0_16px_32px_rgba(7,59,53,0.15)] transition-all duration-300 ${
                        selectedColor === 'black'
                          ? 'brightness-[0.25] contrast-[1.15]'
                          : selectedColor === 'green'
                          ? 'brightness-[0.55] sepia-[0.8] hue-rotate-[105deg] saturate-[2.8] contrast-[1.1]'
                          : ''
                      }`}
                    />

                    {/* Dynamic Tote Bag Print Area (Precisely aligned to bag canvas body) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="translate-y-[17%] sm:translate-y-[18%] flex items-center justify-center">
                        {selectedShape === 'words' && (
                          <div className="flex items-center justify-center select-none w-24 sm:w-28 lg:w-32">
                            <img
                              src={selectedColor === 'white' ? '/logo/logo-green.png' : '/logo/logo-white.png'}
                              alt="لوجو يوزرسيف"
                              className="w-full h-auto object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
                            />
                          </div>
                        )}
                        {selectedShape === 'shapes' && (
                          <div className="flex flex-col items-center justify-center gap-1.5 p-2 select-none scale-90 sm:scale-100">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-[#E3A92F]" />
                              <div className="w-5 h-5 bg-[#0B5F55] rotate-45" />
                            </div>
                            <div className="w-14 h-3.5 bg-[#073B35] rounded-xs mt-0.5" />
                            <span className={`text-[10px] sm:text-xs font-black font-mono tracking-widest mt-0.5 ${
                              selectedColor === 'white' ? 'text-[#073B35]' : 'text-white'
                            }`}>
                              YUZERSEF
                            </span>
                          </div>
                        )}
                        {selectedShape === 'flower' && (
                          <div className="flex flex-col items-center justify-center select-none scale-90 sm:scale-100">
                            <svg className={`w-12 h-12 sm:w-14 sm:h-14 ${selectedColor === 'white' ? 'text-[#0B5F55]' : 'text-[#E3A92F]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="3" />
                              <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
                              <path d="M12 22a4 4 0 0 0 4-4v-1a4 4 0 0 0-8 0v1a4 4 0 0 0 4 4z" />
                              <path d="M2 12a4 4 0 0 0 4 4h1a4 4 0 0 0 0-8H6a4 4 0 0 0-4 4z" />
                              <path d="M22 12a4 4 0 0 0-4-4h-1a4 4 0 0 0 0 8h1a4 4 0 0 0 4-4z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Product 3: Hoodie (Large Display) */}
              {selectedProduct === 'hoodie' && (
                <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                  <img
                    src={
                      selectedColor === 'white'
                        ? '/products/hoodie-white-front-trans.png'
                        : selectedColor === 'green'
                        ? '/products/hoodie-green-front.png'
                        : '/products/hoodie-black-front-trans.png'
                    }
                    alt="هودي مخصص"
                    className="w-full h-full object-contain filter drop-shadow-[0_16px_32px_rgba(7,59,53,0.15)]"
                  />

                  {/* Hoodie Chest Print */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-6 sm:pb-8">
                    {selectedShape === 'words' && (
                      <div className="flex items-center justify-center select-none w-32 sm:w-40 lg:w-44">
                        <img
                          src={selectedColor === 'white' ? '/logo/logo-green.png' : '/logo/logo-white.png'}
                          alt="لوجو يوزرسيف"
                          className="w-full h-auto object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
                        />
                      </div>
                    )}
                    {selectedShape === 'shapes' && (
                      <div className="w-12 h-12 rounded-full bg-[#E3A92F] flex items-center justify-center text-[#073B35] font-black text-xl shadow-xs">
                        <svg className="w-6 h-6 fill-current text-[#073B35]" viewBox="0 0 24 24">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </div>
                    )}
                    {selectedShape === 'flower' && (
                      <svg className="w-12 h-12 text-[#E3A92F] drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
                        <path d="M12 22a4 4 0 0 0 4-4v-1a4 4 0 0 0-8 0v1a4 4 0 0 0 4 4z" />
                        <path d="M2 12a4 4 0 0 0 4 4h1a4 4 0 0 0 0-8H6a4 4 0 0 0-4 4z" />
                        <path d="M22 12a4 4 0 0 0-4-4h-1a4 4 0 0 0 0 8h1a4 4 0 0 0 4-4z" />
                      </svg>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT COLUMN: Product Selector Cards (اختار منتجك)
          ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col items-center lg:items-end order-3 space-y-4">
            <div className="w-full max-w-sm xl:max-w-md">
              <span className="block text-sm sm:text-base font-black text-[#073B35] dark:text-[#F6F1E7] mb-3 text-center lg:text-end">
                اختار منتجك
              </span>

              {/* 3 Stacked Cards (Expanded & Bold) */}
              <div className="flex flex-col space-y-3.5">
                {productsList.map((prod) => {
                  const isSelected = selectedProduct === prod.id;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedProduct(prod.id)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border-[2.5px] border-[#073B35] flex items-center justify-between text-start transition-all cursor-pointer ${
                        isSelected ? 'bg-[#E3A92F] text-[#073B35] shadow-[5px_5px_0px_#073B35] dark:shadow-[5px_5px_0px_#6A994E] -translate-x-1.5 -translate-y-1'
                          : 'bg-white dark:bg-[#0c2b26] text-[#073B35] dark:text-[#F6F1E7] border-[#073B35] dark:border-[#6A994E]/40 shadow-[3px_3px_0px_#073B35] dark:shadow-[3px_3px_0px_#6A994E] hover:shadow-[5px_5px_0px_#073B35] dark:hover:shadow-[5px_5px_0px_#6A994E] hover:bg-[#faf7f0] dark:hover:bg-[#113831] hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Arrow Icon in deep green */}
                      <svg className="w-5 h-5 text-[#073B35] shrink-0 rtl:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>

                      {/* Number & Name in Bold Scale */}
                      <div className="flex items-center gap-2.5 font-black text-sm sm:text-base lg:text-lg">
                        <span>{prod.title}</span>
                        <span className="text-xs sm:text-sm font-mono opacity-70">{prod.num}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. Bottom Centered Caption
        ───────────────────────────────────────────────────────────── */}
        <div className="text-center pt-2 sm:pt-3 lg:pt-4">
          <p className="text-xs sm:text-sm text-[#4d6560] font-black tracking-wide">
            مثال توضيحي - ابدأ تصميمك من الصفر في الاستوديو
          </p>
        </div>

      </div>
    </section>
  );
};
