import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight } from './ui/icons';
import { Badge } from './ui/badge';

export const BeforeAfterShowcase: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isSideBySide, setIsSideBySide] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const handleDrag = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPos(percentage);
  }, []);

  const onMouseDown = () => {
    isDraggingRef.current = true;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      handleDrag(e.clientX);
    }
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleDrag(e.touches[0].clientX);
  };

  return (
    <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 bg-[#F6F1E7] border-b border-[#d9d2c3]/60 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black text-[#073B35] tracking-tight font-display">
            من فكرة أولية بسيطة إلى منتج مطبوع ومطرّز
          </h2>
          <p className="text-sm sm:text-base text-[#4d6560] leading-relaxed">
            لا تشغل بالك بجودة الرسمة المبدئية؛ نحن في «يوزرسيف» نستلم فكرتك ولو كانت خطوطاً مرسومة بالقلم الرصاص، ونحولها إلى فيكتور متقن وتطريز أو طباعة احترافية عالية الدقة.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setIsSideBySide(!isSideBySide)}
              className="inline-flex items-center gap-2 text-xs text-[#073B35] hover:bg-[#F6F1E7] font-bold bg-white border-2 border-[#073B35] shadow-[3px_3px_0px_#073B35] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#073B35] rounded-xl px-4 py-2 transition-all cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#073B35]" />
              <span>{isSideBySide ? 'التبديل إلى شريط السحب التفاعلي' : 'عرض جنباً إلى جنب (مقارنة ثابتة)'}</span>
            </button>
          </div>
        </div>

        {/* Presentation Area */}
        <div className="max-w-4xl mx-auto">
          {isSideBySide ? (
            /* Static Side-by-Side Comparison */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before Box */}
              <div className="bg-white rounded-3xl p-5 border-2 border-amber-300 shadow-sm relative overflow-hidden flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-3">
                  <Badge className="bg-amber-100 text-amber-900 border-none font-bold text-xs">
                    (Before) الفكرة المبدئية / سكتش يدوي
                  </Badge>
                  <span className="text-[11px] text-slate-500 font-mono">مسودة الفكرة</span>
                </div>
                
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-inner border border-slate-200">
                  <img
                    src="/showcase/sketch-before.jpg"
                    alt="سكتش ومخطط أولي"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-xs text-slate-600 mt-3 text-center font-medium">
                  رسمة يدوية سريعة أو مسودة أولية يرسلها العميل
                </p>
              </div>

              {/* After Box */}
              <div className="bg-[#073B35] text-white rounded-3xl p-5 border-2 border-[#0B5F55] shadow-lg relative overflow-hidden flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-3">
                  <Badge className="bg-[#E3A92F] text-[#073B35] border-none font-black text-xs">
                    (After) المنتج النهائي المطرّز والمصقول
                  </Badge>
                  <span className="text-[11px] text-emerald-200 font-mono">جاهز للتسليم</span>
                </div>
                
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#052925] shadow-inner border border-emerald-600/40">
                  <img
                    src="/showcase/embroidered-hoodie-after.jpg"
                    alt="المنتج النهائي مطرز"
                    className="w-full h-full object-cover filter brightness-105"
                  />
                </div>

                <p className="text-xs text-emerald-100/90 mt-3 text-center font-medium">
                  هودي فاخر مطرز بخيوط ميتاليك بارزة ثلاثية الأبعاد وتشطيب استثنائي
                </p>
              </div>
            </div>
          ) : (
            /* Interactive Split-Screen Slider */
            <div 
              ref={containerRef}
              className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[520px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#0B5F55]/60 select-none cursor-ew-resize touch-none"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchMove={onTouchMove}
            >
              {/* LAYER 1 (BASE / RIGHT): After - The Real Embroidered Luxury Product */}
              <div className="absolute inset-0 bg-[#073B35]">
                <img
                  src="/showcase/embroidered-hoodie-after.jpg"
                  alt="بعد: المنتج النهائي المصقول"
                  className="w-full h-full object-cover filter brightness-105"
                />

                <div className="absolute top-4 end-4 z-10">
                  <Badge className="bg-[#E3A92F] text-[#073B35] font-black text-xs shadow-md border-none px-3 py-1">
                    بعد: هودي مطرز فاخر (After)
                  </Badge>
                </div>
              </div>

              {/* LAYER 2 (TOP / LEFT): Before - The Real Sketch / Blueprint (Clipped by slider position) */}
              <div 
                className="absolute inset-0"
                style={{
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                }}
              >
                <img
                  src="/showcase/sketch-before.jpg"
                  alt="قبل: السكتش المبدئي"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 start-4 z-10">
                  <Badge className="bg-slate-900/90 text-white font-bold text-xs shadow-md border border-slate-700 px-3 py-1 backdrop-blur-xs">
                    قبل: السكتش اليدوي المبدئي (Before)
                  </Badge>
                </div>
              </div>

              {/* Dividing Slider Line & Handle Button */}
              <div 
                className="absolute inset-y-0 w-1 bg-gradient-to-b from-[#E3A92F] via-white to-[#E3A92F] shadow-[0_0_12px_rgba(227,169,47,0.8)] pointer-events-none z-30"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#E3A92F] text-[#073B35] border-2 border-white shadow-xl flex items-center justify-center font-bold text-xs">
                  <ArrowLeftRight className="w-5 h-5 text-[#073B35]" />
                </div>
              </div>
            </div>
          )}

          {/* User helper tip */}
          <div className="mt-4 text-center">
            <span className="text-xs text-slate-500 font-medium inline-flex items-center gap-1.5 justify-center">
              <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
              <span>اسحب المقبض في المنتصف يميناً ويساراً لمشاهدة التحول الكامل من السكتش إلى المنتج الواقعي</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
