import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type ProductOption = 'tshirt' | 'totebag' | 'hoodie';
type ShapeOption = 'words' | 'shapes' | 'flower';
type ColorOption = 'white' | 'black';

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
    <section className="relative overflow-hidden min-h-[calc(100vh-105px)] flex flex-col justify-center py-10 sm:py-16 bg-[#e9e5ff] text-slate-900 select-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-between my-auto">
        
        {/* ─────────────────────────────────────────────────────────────
            1. Top Header Area (Exact typography from reference image 2)
        ───────────────────────────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-12">
          {/* Eyebrow / Kicker */}
          <p className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide">
            أفكارك. مطبوعة في مصر.
          </p>

          {/* Main Headline with Starburst / Asterisk */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 font-display flex items-center gap-2">
              {/* Starburst Asterisk Icon (matching image) */}
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 sm:w-11 sm:h-11 text-slate-950 fill-current inline-block transform -rotate-12"
                aria-hidden="true"
              >
                <path d="M12 0L13.8 7.5L20.5 4.1L16.2 10.3L23.5 12L16.2 13.7L20.5 19.9L13.8 16.5L12 24L10.2 16.5L3.5 19.9L7.8 13.7L0.5 12L7.8 10.3L3.5 4.1L10.2 7.5Z" />
              </svg>
              <span className="text-[#453fc4]">شبهك.</span>
              <span>خلّيها</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-lg mx-auto leading-relaxed pt-1">
            رسمة بتحبها، كلمة بتعبّر عنك. حوّل فكرتك لحاجة تستخدمها كل يوم.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. Interactive Studio Stage (3 Columns: Left Tools, Center Mockup, Right Products)
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto w-full">
          
          {/* ═══════════════════════════════════════════════════════════
              LEFT COLUMN: Interactive Design Controls (جرّب شكل يعجبك)
          ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start order-2 lg:order-1 space-y-5">
            {/* Tool Category Label */}
            <div className="w-full">
              <span className="block text-xs font-bold text-slate-900 mb-2.5 text-center lg:text-start">
                جرّب شكل يعجبك
              </span>
              
              {/* 3 Shape/Design Option Buttons */}
              <div className="grid grid-cols-3 gap-2.5 w-full max-w-xs mx-auto lg:mx-0">
                {/* 1. Words / Text Button */}
                <button
                  onClick={() => setSelectedShape('words')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 border-black transition-all cursor-pointer ${
                    selectedShape === 'words'
                      ? 'bg-[#453fc4] text-white shadow-[2px_2px_0px_#000] -translate-y-0.5'
                      : 'bg-white text-slate-800 shadow-[2px_2px_0px_#000] hover:bg-slate-50'
                  }`}
                  title="تصميم كلمات ونصوص"
                >
                  <svg className="w-5 h-5 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7V4h16v3M9 20h6M12 4v16" />
                  </svg>
                  <span className="text-[11px] font-bold">كلمات</span>
                </button>

                {/* 2. Shapes Button */}
                <button
                  onClick={() => setSelectedShape('shapes')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 border-black transition-all cursor-pointer ${
                    selectedShape === 'shapes'
                      ? 'bg-[#453fc4] text-white shadow-[2px_2px_0px_#000] -translate-y-0.5'
                      : 'bg-white text-slate-800 shadow-[2px_2px_0px_#000] hover:bg-slate-50'
                  }`}
                  title="تصميم أشكال هندسية"
                >
                  <svg className="w-5 h-5 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l6 10H6z" />
                    <rect x="3" y="15" width="6" height="6" rx="1" />
                    <circle cx="18" cy="18" r="3" />
                  </svg>
                  <span className="text-[11px] font-bold">أشكال</span>
                </button>

                {/* 3. Flower / Pattern Button */}
                <button
                  onClick={() => setSelectedShape('flower')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 border-black transition-all cursor-pointer ${
                    selectedShape === 'flower'
                      ? 'bg-[#453fc4] text-white shadow-[2px_2px_0px_#000] -translate-y-0.5'
                      : 'bg-white text-slate-800 shadow-[2px_2px_0px_#000] hover:bg-slate-50'
                  }`}
                  title="تصميم رسمة ووردة"
                >
                  <svg className="w-5 h-5 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
                    <path d="M12 22a4 4 0 0 0 4-4v-1a4 4 0 0 0-8 0v1a4 4 0 0 0 4 4z" />
                    <path d="M2 12a4 4 0 0 0 4 4h1a4 4 0 0 0 0-8H6a4 4 0 0 0-4 4z" />
                    <path d="M22 12a4 4 0 0 0-4-4h-1a4 4 0 0 0 0 8h1a4 4 0 0 0 4-4z" />
                  </svg>
                  <span className="text-[11px] font-bold">وردة</span>
                </button>
              </div>
            </div>

            {/* Color Swatch Picker */}
            <div className="w-full">
              <span className="block text-xs font-bold text-slate-900 mb-2 text-center lg:text-start">
                اختار لونك
              </span>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                {/* White Swatch */}
                <button
                  onClick={() => setSelectedColor('white')}
                  className={`w-7 h-7 rounded-full bg-white border-2 border-black transition-transform cursor-pointer ${
                    selectedColor === 'white'
                      ? 'ring-2 ring-offset-2 ring-[#453fc4] scale-110 shadow-xs'
                      : 'hover:scale-105'
                  }`}
                  aria-label="اللون الأبيض"
                />
                
                {/* Black Swatch */}
                <button
                  onClick={() => setSelectedColor('black')}
                  className={`w-7 h-7 rounded-full bg-[#111827] border-2 border-black transition-transform cursor-pointer ${
                    selectedColor === 'black'
                      ? 'ring-2 ring-offset-2 ring-[#453fc4] scale-110 shadow-xs'
                      : 'hover:scale-105'
                  }`}
                  aria-label="اللون الأسود"
                />
              </div>
            </div>

            {/* Big Action Button (خلّيه بتصميمك ↗) with Neo-Brutalist Shadow */}
            <div className="w-full pt-1">
              <Link to={`/request?service=${selectedProduct === 'totebag' ? 'stickers-labels' : 'clothing-hoodies'}`} className="block w-full max-w-xs mx-auto lg:mx-0">
                <button className="w-full bg-[#453fc4] hover:bg-[#3833a6] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000] text-white font-extrabold text-sm sm:text-base py-3 px-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] transition-all cursor-pointer flex items-center justify-center gap-2">
                  <span>خلّيه بتصميمك</span>
                  <svg className="w-4 h-4 rtl:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              CENTER STAGE: Product Canvas with Circular Orbit Ring
          ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex items-center justify-center relative order-1 lg:order-2 min-h-[300px] sm:min-h-[380px]">
            {/* Subtle Circular Orbit Ring from reference */}
            <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border border-[#d6ceff] pointer-events-none" />

            {/* Product Mockup Container */}
            <div className="relative w-72 sm:w-80 h-72 sm:h-80 flex items-center justify-center transition-all duration-300">
              
              {/* Product 1: T-Shirt */}
              {selectedProduct === 'tshirt' && (
                <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                  <img
                    src={
                      selectedColor === 'white'
                        ? '/showcase/hero-tshirt-trans.png'
                        : '/products/tshirt-black-front-trans.png'
                    }
                    alt="تيشيرت مخصص"
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(69,63,196,0.12)]"
                  />

                  {/* Dynamic Chest Print Area */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-4">
                    {/* Words Graphic (MAKE IT yours.) */}
                    {selectedShape === 'words' && (
                      <div className="flex flex-col items-center justify-center font-black select-none tracking-tight">
                        <span className={`text-xl sm:text-2xl tracking-wider leading-none font-sans font-black ${selectedColor === 'white' ? 'text-[#453fc4]' : 'text-[#8c85ff]'}`}>
                          MAKE
                        </span>
                        <span className={`text-xl sm:text-2xl tracking-wider leading-none font-sans font-black mt-1 ${selectedColor === 'white' ? 'text-[#453fc4]' : 'text-[#8c85ff]'}`}>
                          IT
                        </span>
                        <span className="text-xl sm:text-2xl tracking-tight leading-none text-[#e8503a] font-sans font-black lowercase mt-1">
                          yours.
                        </span>
                      </div>
                    )}

                    {/* Shapes Graphic (Geometric Composition) */}
                    {selectedShape === 'shapes' && (
                      <div className="flex flex-col items-center justify-center gap-1.5 p-2 select-none">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-[#e8503a]" />
                          <div className="w-5 h-5 bg-[#453fc4] rotate-45" />
                        </div>
                        <div className="w-12 h-3.5 bg-[#453fc4] rounded-xs" />
                        <span className="text-[10px] font-bold text-slate-800 font-mono tracking-widest">
                          YUZERSEF
                        </span>
                      </div>
                    )}

                    {/* Flower Graphic */}
                    {selectedShape === 'flower' && (
                      <div className="flex flex-col items-center justify-center select-none">
                        <svg className={`w-12 h-12 ${selectedColor === 'white' ? 'text-[#453fc4]' : 'text-[#e5f28a]'} animate-pulse`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
                          <path d="M12 22a4 4 0 0 0 4-4v-1a4 4 0 0 0-8 0v1a4 4 0 0 0 4 4z" />
                          <path d="M2 12a4 4 0 0 0 4 4h1a4 4 0 0 0 0-8H6a4 4 0 0 0-4 4z" />
                          <path d="M22 12a4 4 0 0 0-4-4h-1a4 4 0 0 0 0 8h1a4 4 0 0 0 4-4z" />
                        </svg>
                        <span className="text-[10px] font-black text-[#e8503a] mt-1 tracking-wider">
                          FLOWER ART
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Product 2: Tote Bag */}
              {selectedProduct === 'totebag' && (
                <div className="relative w-64 sm:w-72 h-64 sm:h-72 flex items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                  {/* Clean Canvas Tote Bag Illustration */}
                  <div className={`relative w-48 sm:w-56 h-56 sm:h-64 rounded-b-2xl border-2 border-black p-4 flex flex-col items-center justify-center shadow-[4px_4px_0px_#000] ${
                    selectedColor === 'white' ? 'bg-[#faf8f5]' : 'bg-[#18181b] text-white'
                  }`}>
                    {/* Tote Handles */}
                    <div className="absolute -top-12 inset-x-12 h-16 border-2 border-black rounded-t-full pointer-events-none" />
                    
                    {/* Tote Print */}
                    <div className="flex flex-col items-center justify-center pt-2">
                      {selectedShape === 'words' && (
                        <div className="text-center font-black leading-tight">
                          <span className="block text-lg font-black text-[#453fc4]">TOTE</span>
                          <span className="block text-sm font-bold text-[#e8503a]">BAG ART</span>
                        </div>
                      )}
                      {selectedShape === 'shapes' && (
                        <div className="w-10 h-10 rounded-full border-2 border-[#453fc4] flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#e8503a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 3l6 10H6z" />
                            <rect x="3" y="15" width="6" height="6" rx="1" />
                          </svg>
                        </div>
                      )}
                      {selectedShape === 'flower' && (
                        <svg className="w-10 h-10 text-[#453fc4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Product 3: Hoodie */}
              {selectedProduct === 'hoodie' && (
                <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                  <img
                    src={
                      selectedColor === 'white'
                        ? '/products/hoodie-white-front.png'
                        : '/products/hoodie-black-front-trans.png'
                    }
                    alt="هودي مخصص"
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(69,63,196,0.12)]"
                  />

                  {/* Hoodie Chest Print */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-2">
                    {selectedShape === 'words' && (
                      <div className="text-center font-black">
                        <span className={`block text-base sm:text-lg font-black leading-none ${selectedColor === 'white' ? 'text-[#453fc4]' : 'text-white'}`}>
                          MAKE IT
                        </span>
                        <span className="block text-base sm:text-lg text-[#e8503a] font-black leading-none mt-0.5">
                          yours.
                        </span>
                      </div>
                    )}
                    {selectedShape === 'shapes' && (
                      <div className="w-8 h-8 rounded-full bg-[#453fc4] flex items-center justify-center text-[#e5f28a]">
                        ★
                      </div>
                    )}
                    {selectedShape === 'flower' && (
                      <span className="text-2xl text-[#e8503a]">🌸</span>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT COLUMN: Product Selector Cards (اختار منتجك)
          ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end order-3 space-y-3">
            <div className="w-full max-w-xs">
              <span className="block text-xs font-bold text-slate-900 mb-2.5 text-center lg:text-end">
                اختار منتجك
              </span>

              {/* 3 Stacked Cards matching reference image 2 */}
              <div className="flex flex-col space-y-2.5">
                {productsList.map((prod) => {
                  const isSelected = selectedProduct === prod.id;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedProduct(prod.id)}
                      className={`w-full p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border-2 border-black flex items-center justify-between text-start transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#e5f28a] text-black shadow-[4px_4px_0px_#000] -translate-x-1 -translate-y-0.5'
                          : 'bg-white text-slate-900 shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Arrow Icon */}
                      <svg className="w-4 h-4 text-black shrink-0 rtl:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>

                      {/* Number & Name */}
                      <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
                        <span>{prod.title}</span>
                        <span className="text-[11px] font-mono opacity-60">{prod.num}</span>
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
        <div className="text-center pt-8 sm:pt-10">
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide">
            مثال توضيحي - ابدأ تصميمك من الصفر في الاستوديو
          </p>
        </div>

      </div>
    </section>
  );
};
