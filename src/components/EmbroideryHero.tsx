import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Cpu, Activity } from 'lucide-react';
import { Badge } from './ui/badge';

type EmbroideryPhase = 0 | 1 | 2 | 3;

interface NeedlePoint {
  x: number;
  y: number;
}

export const EmbroideryHero: React.FC = () => {
  const [phase, setPhase] = useState<EmbroideryPhase>(1);
  const [stitchCount, setStitchCount] = useState<number>(1280);
  const [needleIndex, setNeedleIndex] = useState<number>(0);

  // Key coordinate waypoints tracing the calligraphy and crest of UserSafe (in percent)
  const waypoints: NeedlePoint[] = [
    { x: 38, y: 46 },
    { x: 44, y: 38 },
    { x: 52, y: 36 },
    { x: 62, y: 42 },
    { x: 58, y: 54 },
    { x: 48, y: 58 },
    { x: 40, y: 62 },
    { x: 34, y: 52 },
    { x: 50, y: 48 },
  ];

  // 1. Continuous Loop Cycle (Total 18s: Phase 0 -> 1 -> 2 -> 3 -> repeat)
  useEffect(() => {
    let currentSeconds = 0;
    const interval = setInterval(() => {
      currentSeconds = (currentSeconds + 0.5) % 18;

      if (currentSeconds < 3.5) {
        setPhase(0); // Vector Blueprint
      } else if (currentSeconds < 10) {
        setPhase(1); // Active Mechanical Stitching & Piercing
      } else if (currentSeconds < 14) {
        setPhase(2); // 3D Metallic Satin Fill
      } else {
        setPhase(3); // Finished Luxury Emblem
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // 2. Needle Movement & Stitch Counter Tick (Active during Phase 1 & 2)
  useEffect(() => {
    if (phase === 0) {
      setStitchCount(0);
      return;
    }

    if (phase === 3) {
      setStitchCount(4280);
      return;
    }

    // Dynamic stitch counting & needle repositioning
    const needleTimer = setInterval(() => {
      setNeedleIndex((prev) => (prev + 1) % waypoints.length);
      setStitchCount((prev) => Math.min(4280, prev + Math.floor(Math.random() * 45 + 30)));
    }, 450);

    return () => clearInterval(needleTimer);
  }, [phase, waypoints.length]);

  const currentNeedle = waypoints[needleIndex];

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 bg-gradient-to-b from-[#073B35] via-[#0B5F55] to-[#073B35] text-white">
      {/* Background Texture & Ambient Glow */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #E3A92F 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-1/4 -start-20 w-96 h-96 bg-[#E3A92F]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -end-20 w-96 h-96 bg-[#001716]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Right Column: Hero Content & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3A92F]/20 border border-[#E3A92F]/40 text-[#E3A92F] text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>UserSafe • يوزرسيف للطباعة والتطريز في أسوان</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black leading-[1.25] tracking-tight text-white font-display">
              نحوّل الفكرة إلى واقع{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#E3A92F] via-[#F6F1E7] to-[#E3A92F]">
                مطرز ومطبوع بعناية
              </span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/85 leading-relaxed max-w-xl mx-auto lg:mx-0">
              منصة متخصصة تجمع بين دقة التطريز الميكانيكي وأحدث تقنيات الطباعة في أسوان. ننفذ تصاميمك المخصصة على الملابس، الكابات، والمجات بأرفع مقاييس الجودة والتشطيب.
            </p>

            {/* Value Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-emerald-600/40 text-emerald-100/90 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-start">
                <p className="text-xs font-bold text-[#E3A92F]">تطريز ميتاليك 3D</p>
                <p className="text-[11px] text-emerald-200/70 mt-0.5">غرز بارزة متراصة تدوم</p>
              </div>
              <div className="text-center lg:text-start border-s border-emerald-600/40 ps-3">
                <p className="text-xs font-bold text-[#E3A92F]">دقة ميكانيكية</p>
                <p className="text-[11px] text-emerald-200/70 mt-0.5">محاكاة مسار الغرز رقمياً</p>
              </div>
              <div className="text-center lg:text-start border-s border-emerald-600/40 ps-3">
                <p className="text-xs font-bold text-[#E3A92F]">تشطيب استثنائي</p>
                <p className="text-[11px] text-emerald-200/70 mt-0.5">حرفية متقنة تليق بك</p>
              </div>
            </div>
          </div>

          {/* Left Column: Continuous Live Mechanical Embroidery Canvas */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-[480px] rounded-3xl bg-[#073B35]/95 border-2 border-[#0B5F55] shadow-2xl p-6 sm:p-7 flex flex-col items-center justify-between overflow-hidden backdrop-blur-md">
              
              {/* Header inside canvas: Live Telemetry */}
              <div className="w-full flex items-center justify-between text-xs text-emerald-200/90 mb-3 z-30">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E3A92F] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E3A92F]"></span>
                  </span>
                  <span className="font-mono text-[11px] font-bold text-[#E3A92F] tracking-wide">
                    {phase === 0 && 'تجهيز مسار المخطط'}
                    {phase === 1 && 'ماكينة التطريز: غرز الخيوط الذهبية'}
                    {phase === 2 && 'حشو التطريز الميتاليكي'}
                    {phase === 3 && 'البادج المطرّز الملكي المكتمل'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px] bg-[#052925] px-2.5 py-1 rounded-full border border-emerald-700/50 text-emerald-300">
                  <Activity className="w-3 h-3 text-[#E3A92F] animate-pulse" />
                  <span>{stitchCount.toLocaleString('en-US')} غرزة</span>
                </div>
              </div>

              {/* Live Stage Progress Indicator (Automated / Running Continuously) */}
              <div className="w-full grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-[#052925] border border-emerald-800/60 mb-3 text-[10px] z-30 text-center font-bold">
                <div className={`py-1 rounded-lg transition-all ${phase === 0 ? 'bg-white text-slate-900 shadow-sm' : 'text-emerald-400/60'}`}>
                  1. المخطط
                </div>
                <div className={`py-1 rounded-lg transition-all ${phase === 1 ? 'bg-[#E3A92F] text-[#073B35] shadow-sm' : 'text-emerald-400/60'}`}>
                  2. ثقب وغرز
                </div>
                <div className={`py-1 rounded-lg transition-all ${phase === 2 ? 'bg-[#0B5F55] text-white shadow-sm' : 'text-emerald-400/60'}`}>
                  3. حشو بارز
                </div>
                <div className={`py-1 rounded-lg transition-all ${phase === 3 ? 'bg-gradient-to-r from-[#E3A92F] to-[#f4c663] text-[#073B35] shadow-sm' : 'text-emerald-400/60'}`}>
                  4. اكتمل
                </div>
              </div>

              {/* Center Presentation: Continuous Embroidery Canvas */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-1 flex items-center justify-center select-none">
                
                {/* 1. Base Blueprint Sketch (Phase 0) */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                    phase === 0 ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95 pointer-events-none'
                  }`}
                >
                  <img
                    src="/brand/badge-sketch.png"
                    alt="بادج المخطط الأولي"
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                  <div className="absolute inset-0 bg-[#073B35]/20 rounded-full pointer-events-none" />
                </div>

                {/* 2 & 3. Active Embroidery Phase: Fabric + Dynamic Piercing Needle + Thread Trail */}
                {(phase === 1 || phase === 2) && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    {/* Underlying fabric badge with increasing opacity of embroidered relief */}
                    <div className="relative w-full h-full">
                      <img
                        src="/brand/badge-sketch.png"
                        alt="بدء عملية التطريز"
                        className="w-full h-full object-contain filter contrast-105 drop-shadow-xl opacity-60"
                      />
                      
                      {/* Semi-filled embroidered preview blending in */}
                      <img
                        src="/brand/badge-embroidered.png"
                        alt="تدرج التطريز"
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                          phase === 2 ? 'opacity-85' : 'opacity-35'
                        }`}
                      />
                    </div>

                    {/* SVG Canvas for Trailing Threads, Stitch Paths, and Piercing Impact Rings */}
                    <svg className="absolute inset-0 w-full h-full z-20" viewBox="0 0 100 100" fill="none">
                      {/* Trail of Golden Thread from top feed to needle */}
                      <path
                        d={`M 50 2 Q ${currentNeedle.x} ${currentNeedle.y - 12} ${currentNeedle.x} ${currentNeedle.y}`}
                        stroke="#E3A92F"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeDasharray="2 0.5"
                        className="filter drop-shadow-[0_0_2px_#E3A92F]"
                      />

                      {/* Previous Stitches Trail */}
                      <path
                        d="M 38 46 L 44 38 L 52 36 L 62 42 L 58 54 L 48 58"
                        stroke="#F6D58E"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="1.5 0.8"
                        className="opacity-90 filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                      />

                      {/* Fabric Puncture Point (Dark Hole Dent) where needle pierces */}
                      <ellipse
                        cx={currentNeedle.x}
                        cy={currentNeedle.y}
                        rx="1.2"
                        ry="0.8"
                        fill="#011817"
                        stroke="#E3A92F"
                        strokeWidth="0.4"
                      />

                      {/* Fabric Puncture Ripple Wave expanding on needle strike */}
                      <circle
                        key={`ripple-${needleIndex}`}
                        cx={currentNeedle.x}
                        cy={currentNeedle.y}
                        r="3.5"
                        stroke="#E3A92F"
                        strokeWidth="0.8"
                        fill="none"
                        style={{
                          animation: 'fabric-ripple 0.5s ease-out forwards',
                          transformOrigin: `${currentNeedle.x}% ${currentNeedle.y}%`,
                        }}
                      />
                    </svg>

                    {/* The Mechanical Piercing Needle (Rapid in-and-out puncture motion) */}
                    <div
                      className="absolute z-30 transition-all duration-300 ease-out"
                      style={{
                        left: `${currentNeedle.x}%`,
                        top: `${currentNeedle.y}%`,
                        transform: 'translate(-10%, -90%)',
                      }}
                    >
                      {/* Inner needle vibrating up and down into the fabric */}
                      <div style={{ animation: 'needle-pierce 0.22s ease-in-out infinite' }}>
                        <svg
                          width="36"
                          height="72"
                          viewBox="0 0 24 50"
                          fill="none"
                          className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]"
                        >
                          <defs>
                            <linearGradient id="needleShine" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#94a3b8" />
                              <stop offset="40%" stopColor="#f8fafc" />
                              <stop offset="70%" stopColor="#cbd5e1" />
                              <stop offset="100%" stopColor="#64748b" />
                            </linearGradient>
                            <linearGradient id="needleTip" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#cbd5e1" />
                              <stop offset="100%" stopColor="#ffffff" />
                            </linearGradient>
                          </defs>

                          {/* Machine Needle Bar / Clamp */}
                          <rect x="8" y="0" width="8" height="12" rx="1.5" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                          <circle cx="12" cy="6" r="1.5" fill="#E3A92F" />

                          {/* Steel Needle Shank */}
                          <rect x="10" y="12" width="4" height="22" fill="url(#needleShine)" />

                          {/* Tapered Piercing Needle Tip */}
                          <polygon points="10,34 14,34 12,48" fill="url(#needleTip)" />

                          {/* Needle Eyelet (with golden thread threading through it) */}
                          <ellipse cx="12" cy="40" rx="1" ry="2.2" fill="#073B35" stroke="#475569" strokeWidth="0.4" />
                          
                          {/* Golden Thread through the eyelet */}
                          <line x1="8" y1="36" x2="16" y2="44" stroke="#E3A92F" strokeWidth="1.5" strokeLinecap="round" />
                          <circle cx="12" cy="40" r="1.2" fill="#E3A92F" className="animate-ping" />
                        </svg>
                      </div>
                    </div>

                    {/* Dynamic thread fibers & golden sparks */}
                    <div
                      className="absolute z-25 pointer-events-none"
                      style={{
                        left: `${currentNeedle.x}%`,
                        top: `${currentNeedle.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <Sparkles className="w-5 h-5 text-[#E3A92F] animate-spin opacity-80" />
                    </div>
                  </div>
                )}

                {/* 4. Phase 3: The Finished Luxury Embroidered Badge (Pristine Metallic Gleam) */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                    phase === 3 ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
                    <img
                      src="/brand/badge-embroidered.png"
                      alt="بادج يوزرسيف مطرز فاخر أسود في دهبي"
                      className="w-full h-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)] filter brightness-105"
                    />

                    {/* Diagonal Light-Sweep Shimmer Reflection across the finished metallic threads */}
                    <div
                      className="absolute inset-0 pointer-events-none w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{
                        animation: 'light-sweep 2.4s ease-in-out infinite',
                      }}
                    />

                    {/* Ambient Gold Aura */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-[#E3A92F]/20 to-transparent mix-blend-overlay pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Status Bar inside Canvas */}
              <div className="w-full bg-[#052925]/90 rounded-xl p-2.5 text-center text-xs border border-emerald-500/20 mt-3 z-30">
                {phase === 0 && (
                  <span className="text-emerald-100 flex items-center justify-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#E3A92F]" />
                    تجهيز المخطط الهندسي ومعايرة إحداثيات ماكينة التطريز...
                  </span>
                )}
                {phase === 1 && (
                  <span className="text-[#E3A92F] font-semibold flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E3A92F] animate-ping" />
                    حركة الإبرة الميكانيكية: ثقب القماش وغرز خيوط الحرير الذهبية بدقة...
                  </span>
                )}
                {phase === 2 && (
                  <span className="text-emerald-200 font-semibold flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E3A92F] animate-spin" />
                    تكثيف الحشو الميتاليكي وإبراز التموجات ثلاثية الأبعاد (3D)...
                  </span>
                )}
                {phase === 3 && (
                  <span className="text-[#E3A92F] font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E3A92F]" />
                    بادج يوزرسيف الملكي المكتمل بخيوط ميتاليك بارزة وقماش تويل فاخر
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
