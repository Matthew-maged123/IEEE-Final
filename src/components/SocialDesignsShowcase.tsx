import React from 'react';
import { Download, Sparkles, Feather, Palette, Compass, Eye } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { YUZERSEF_WHATSAPP, generateWhatsAppLink } from '../lib/utils';

export const SocialDesignsShowcase: React.FC = () => {
  const hqShowcaseItems = [
    {
      id: 'luxury-flat-lay',
      title: 'استعراض تشكيلة المنتجات الكاملة (Studio Flat Lay)',
      subtitle: 'هوديز، تيشرتات، كابات مطرزة، مجات، وجرابات بأعلى معايير التشطيب',
      format: 'دقة فائقة (High Resolution Studio)',
      imageSrc: '/showcase/luxury-flat-lay.png',
      badge: 'التشكيلة الكاملة',
      tags: ['هوديز ملكية', 'كابات 3D', 'مجات سيراميك', 'جرابات فخمة'],
    },
    {
      id: 'premium-embroidered-hoodie',
      title: 'التطريز الميتاليك البارز (Metallic Embroidery Close-Up)',
      subtitle: 'تفاصيل دقيقة لغرز الحرير والذهب ثلاثية الأبعاد على قماش قطني فاخر',
      format: 'ماكرو كلوز أب (4K Macro View)',
      imageSrc: '/showcase/premium-embroidered-hoodie.jpg',
      badge: 'تطريز ميتاليك 3D',
      tags: ['خيوط ميتاليك', 'حبكة متراصة', 'قماش أسود فاحم', 'أصالة أسوان'],
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F6F1E7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge className="bg-[#0B5F55]/15 text-[#0B5F55] border-[#0B5F55]/30 text-xs px-3 py-1 font-bold">
            الهوية البصرية وأسلوب التصميم (Brand Style & High-End Visuals)
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-[#073B35] tracking-tight font-display">
            أسلوب يوزرسيف في التصميم والأناقة
          </h2>
          <p className="text-sm sm:text-base text-[#4d6560] leading-relaxed">
            استعراض فوتوغرافي واقعي عالي الدقة يبرز جودة الخامات وفخامة التطريز الميتاليكي على مختلف المنتجات.
          </p>
        </div>

        {/* 1. Two High Quality Products Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
          {hqShowcaseItems.map((item) => (
            <Card key={item.id} className="overflow-hidden border-2 border-[#d9d2c3] hover:border-[#0B5F55] transition-all duration-300 shadow-xl bg-white flex flex-col justify-between group">
              {/* Product Visual Container */}
              <div className="relative aspect-[4/3] bg-[#073B35] overflow-hidden">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Format Tag & Badge */}
                <div className="absolute top-3 start-3 z-10 flex items-center gap-2">
                  <Badge className="bg-[#E3A92F] text-[#073B35] font-black text-[11px] shadow-md border-none">
                    {item.badge}
                  </Badge>
                  <Badge className="bg-[#073B35]/90 text-white border border-[#E3A92F]/60 text-[10px] font-mono backdrop-blur-xs">
                    {item.format}
                  </Badge>
                </div>

                {/* Subtle dark gradient overlay at the bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                <div className="absolute bottom-3 inset-x-4 text-white z-10">
                  <h4 className="font-bold text-sm sm:text-base drop-shadow-md text-[#F6F1E7]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-emerald-200/90 line-clamp-1 drop-shadow-sm">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Details & Download Button */}
              <CardContent className="p-5 space-y-3.5">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-[#0B5F55] font-semibold">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                  <a
                    href={item.imageSrc}
                    download={`${item.id}.png`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full gap-2 bg-[#0B5F55] hover:bg-[#073B35] text-white text-xs cursor-pointer shadow-sm">
                      <Download className="w-4 h-4" />
                      <span>تحميل الصورة الأصلية بدقة عالية</span>
                    </Button>
                  </a>

                  <a
                    href={item.imageSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-100" title="معاينة بكامل الشاشة">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 2. Editorial Brand Style Statement Card */}
        <div className="max-w-5xl mx-auto rounded-3xl border-2 border-[#0B5F55]/50 bg-gradient-to-br from-[#073B35] via-[#0B5F55] to-[#012C2B] text-white p-7 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Background Texture & Ambient Accents */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #E3A92F 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }}
          />
          <div className="absolute -top-12 -end-12 w-64 h-64 bg-[#E3A92F]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3A92F]/20 border border-[#E3A92F]/40 text-[#E3A92F] text-xs font-bold">
                <Feather className="w-3.5 h-3.5" />
                <span>فلسفة الأناقة والهوية البصرية</span>
              </span>
              <span className="font-mono text-xs text-emerald-200/60 tracking-wider">YUZERSEF SIGNATURE</span>
            </div>

            {/* Standout Quote */}
            <div className="space-y-3 border-r-4 border-[#E3A92F] pr-5 py-1">
              <h3 className="text-xl sm:text-3xl font-black text-[#E3A92F] font-display leading-snug">
                "الأناقة لا تصرخ.. بل تتحدث بهدوء من خلال أدق تفاصيل الغرز."
              </h3>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-light max-w-3xl">
                في <strong className="text-white font-bold">يوزرسيف</strong>، لا نكتفي بوضع شعارك على القماش، بل نصوغ قطعة حية تعكس هوية تفرض حضورها. نختار خيوط الحرير والميتاليك اللامعة بعناية فائقة، مع حبكة متراصة تدوم طويلاً، لنمزج روح الخط العربي الأصيل ببريق الفخامة المعاصرة.
              </p>
            </div>

            {/* Style Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="w-9 h-9 rounded-xl bg-[#E3A92F]/20 text-[#E3A92F] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white">تطريز ميتاليك بارز (3D)</h5>
                  <p className="text-xs text-emerald-100/80 mt-1 leading-relaxed">
                    بريق ذهبي وفضي متقن يمنح الشعار ملمساً ثلاثي الأبعاد لا يتأثر بالغسيل.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="w-9 h-9 rounded-xl bg-[#E3A92F]/20 text-[#E3A92F] flex items-center justify-center shrink-0 mt-0.5">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white">باليت لوني ملكي أصيل</h5>
                  <p className="text-xs text-emerald-100/80 mt-1 leading-relaxed">
                    تناغم ساحر بين الأخضر الزمردي الداكن، الأسود الكربوني، والذهب العتيق.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="w-9 h-9 rounded-xl bg-[#E3A92F]/20 text-[#E3A92F] flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white">تفصيل مخصص لكل عميل</h5>
                  <p className="text-xs text-emerald-100/80 mt-1 leading-relaxed">
                    كل قطعة تمر بمراجعة دقيقة لنسب التصميم لضمان أعلى مستوى من الإبهار.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Consultation CTA */}
            <div className="pt-4 border-t border-emerald-700/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-emerald-200">صُمم ونُفّذ في أسوان بكل فخر وإتقان</span>
              <a
                href={generateWhatsAppLink(undefined, 'مرحباً، أود استشارة حول تطبيق استايل يوزرسيف على تصاميمي الخاصة.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="bg-[#E3A92F] hover:bg-[#d49b24] text-[#073B35] font-black text-xs gap-1.5 border-none px-5 py-2.5">
                  <span>تواصل معنا لتطبيق هذا الاستايل</span>
                </Button>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
