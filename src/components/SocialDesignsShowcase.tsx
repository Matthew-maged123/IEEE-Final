import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Sparkles, Feather, Palette, Compass, Eye, ArrowLeft } from './ui/icons';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { generateWhatsAppLink } from '../lib/utils';

export const SocialDesignsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'social' | 'studio'>('all');

  const socialCampaignItems = [
    {
      id: 'social-1',
      title: 'اطبع اللي في دماغك على تيشيرت',
      campaign: 'حملة تشكيلة المنتجات (Product Showcase Campaign)',
      description: 'تصميم احترافي لحسابات التواصل يبرز تنوع منتجات يوزرسيف (تيشيرتات، هوديز، كابات) مع توجيه مباشر للموقع.',
      imageSrc: '/social/social-design-1-showcase.png',
      badge: 'بوست 1: الخدمات والمنتجات',
      ctaText: 'اطلب من الموقع',
      ctaLink: '/services',
      tag: '1080×1350 (4:5)',
    },
    {
      id: 'social-2',
      title: 'خلّيك مختلف.. خلّيك يوزرسيف',
      campaign: 'حملة التخصيص وبدء الطلب (Action & Personalize Campaign)',
      description: 'بوست تفاعلي يركز على سهولة رفع التصميم وبدء الطلب خلال دقيقتين مع ميزة فحص الجاهزية الذكي.',
      imageSrc: '/social/social-design-2-personalize.png',
      badge: 'بوست 2: ابدأ طلبك',
      ctaText: 'ابدأ طلبك الآن',
      ctaLink: '/request',
      tag: '1080×1350 (4:5)',
    },
  ];

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
    <section className="py-14 sm:py-20 bg-[#F6F1E7] border-t border-[#d9d2c3]/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <Badge className="bg-[#0B5F55]/15 text-[#0B5F55] border-[#0B5F55]/30 text-xs px-3 py-1 font-bold">
            الهوية البصرية وتصاميم التواصل (Brand Identity & Social Media)
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-[#073B35] tracking-tight font-display">
            تصاميم السوشيال ميديا وأسلوب الأناقة
          </h2>
          <p className="text-sm sm:text-base text-[#4d6560] leading-relaxed">
            استعراض البوستات الرسمية المعتمدة للمنصات الرقمية ونماذج الاستوديو الفوتوغرافية عالية الدقة وفق وثيقة التحكيم.
          </p>

          {/* Filter Pills */}
          <div className="pt-2 flex justify-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#E3A92F] text-[#073B35] border-2 border-[#073B35] shadow-[3px_3px_0px_#073B35]'
                  : 'bg-white text-[#073B35] border-2 border-[#d9d2c3] hover:border-[#073B35]'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'social'
                  ? 'bg-[#E3A92F] text-[#073B35] border-2 border-[#073B35] shadow-[3px_3px_0px_#073B35]'
                  : 'bg-white text-[#073B35] border-2 border-[#d9d2c3] hover:border-[#073B35]'
              }`}
            >
              بوستات السوشيال ميديا (Step 2)
            </button>
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'studio'
                  ? 'bg-[#E3A92F] text-[#073B35] border-2 border-[#073B35] shadow-[3px_3px_0px_#073B35]'
                  : 'bg-white text-[#073B35] border-2 border-[#d9d2c3] hover:border-[#073B35]'
              }`}
            >
              فوتوغرافيا الاستوديو والتطريز
            </button>
          </div>
        </div>

        {/* 1. Official Social Media Campaign Posts (Requirement Step 2) */}
        {(activeTab === 'all' || activeTab === 'social') && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E3A92F]" />
                <h3 className="font-bold text-lg text-[#073B35]">
                  حملتا السوشيال ميديا المعتمدتان (1080×1350 - Portrait)
                </h3>
              </div>
              <span className="text-xs text-[#0B5F55] font-semibold">بفكرة ورسالة وزر تواصل واضح</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {socialCampaignItems.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden border-2 border-[#d9d2c3] hover:border-[#0B5F55] transition-all duration-300 shadow-xl bg-white flex flex-col justify-between group rounded-3xl"
                >
                  {/* Image Container with 4:5 Aspect Ratio */}
                  <div className="relative aspect-[4/5] bg-[#073B35] overflow-hidden">
                    <img
                      src={post.imageSrc}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Badge & Format Tag */}
                    <div className="absolute top-3.5 start-3.5 z-10 flex items-center gap-2">
                      <Badge className="bg-[#E3A92F] text-[#073B35] font-black text-[11px] shadow-md border-none">
                        {post.badge}
                      </Badge>
                      <Badge className="bg-[#073B35]/90 text-white border border-[#E3A92F]/60 text-[10px] font-mono backdrop-blur-xs">
                        {post.tag}
                      </Badge>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#073B35] via-black/40 to-transparent pointer-events-none" />

                    {/* Bottom Title Overlay */}
                    <div className="absolute bottom-3.5 inset-x-4 text-white z-10">
                      <span className="text-[11px] text-[#E3A92F] font-bold block">{post.campaign}</span>
                      <h4 className="font-black text-base sm:text-lg drop-shadow-md text-white font-display mt-0.5">
                        {post.title}
                      </h4>
                    </div>
                  </div>

                  {/* Card Content & Action Buttons */}
                  <CardContent className="p-5 space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {post.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
                      <Link to={post.ctaLink} className="w-full sm:flex-1">
                        <Button className="w-full gap-1.5 text-xs">
                          <span>{post.ctaText}</span>
                          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                        </Button>
                      </Link>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a
                          href={post.imageSrc}
                          download={`${post.id}.png`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-initial"
                          title="تحميل التصميم بالأبعاد الكاملة"
                        >
                          <Button variant="outline" size="sm" className="w-full border-slate-200 text-slate-700 hover:bg-slate-100 text-xs gap-1.5">
                            <Download className="w-3.5 h-3.5" />
                            <span>تحميل</span>
                          </Button>
                        </a>

                        <a
                          href={post.imageSrc}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="معاينة بكامل الشاشة"
                        >
                          <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-100">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 2. High Quality Studio Photography (Macro Embroidery & Flat Lay) */}
        {(activeTab === 'all' || activeTab === 'studio') && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0B5F55]" />
                <h3 className="font-bold text-lg text-[#073B35]">
                  فوتوغرافيا الاستوديو وجودة الخامات (Studio Photography)
                </h3>
              </div>
              <span className="text-xs text-[#0B5F55] font-semibold">استعراض تفاصيل الخامات والغرز</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {hqShowcaseItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-2 border-[#d9d2c3] hover:border-[#0B5F55] transition-all duration-300 shadow-xl bg-white flex flex-col justify-between group rounded-3xl"
                >
                  {/* Product Visual Container */}
                  <div className="relative aspect-[4/3] bg-[#073B35] overflow-hidden">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Format Tag & Badge */}
                    <div className="absolute top-3.5 start-3.5 z-10 flex items-center gap-2">
                      <Badge className="bg-[#E3A92F] text-[#073B35] font-black text-[11px] shadow-md border-none">
                        {item.badge}
                      </Badge>
                      <Badge className="bg-[#073B35]/90 text-white border border-[#E3A92F]/60 text-[10px] font-mono backdrop-blur-xs">
                        {item.format}
                      </Badge>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                    <div className="absolute bottom-3.5 inset-x-4 text-white z-10">
                      <h4 className="font-bold text-sm sm:text-base drop-shadow-md text-[#F6F1E7]">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-emerald-200/90 line-clamp-1 drop-shadow-sm">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Details & Actions */}
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
                        <Button className="w-full gap-2 text-xs">
                          <Download className="w-4 h-4" />
                          <span>تحميل الصورة بدقة عالية</span>
                        </Button>
                      </a>

                      <a
                        href={item.imageSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl" title="معاينة بكامل الشاشة">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 3. Editorial Brand Style Statement Card */}
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
                <Button size="sm" className="text-xs gap-1.5 px-5 py-2.5">
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
