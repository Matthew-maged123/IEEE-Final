import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  ChevronLeft,
  Award,
  MessageCircle,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { BrandLogo } from '../components/BrandLogo';
import { EmbroideryHero } from '../components/EmbroideryHero';
import { BeforeAfterShowcase } from '../components/BeforeAfterShowcase';
import { SocialDesignsShowcase } from '../components/SocialDesignsShowcase';
import { generateWhatsAppLink, YUZERSEF_WHATSAPP } from '../lib/utils';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // 6 Primary Brand Services matching the client visual guidelines exactly
  const servicesList = [
    {
      id: 'hoodies',
      title: 'تشرتات وهوديز مطبوعة',
      image: '/services/service-hoodies.jpg',
      btnText: 'ابدأ تصميمك الآن 🛍️',
      link: '/request?service=clothing-hoodies',
    },
    {
      id: 'caps',
      title: 'كابات ومطرزات عصرية',
      image: '/services/service-caps.jpg',
      btnText: 'طلب تطريز خاص 🧵',
      link: '/request?service=caps-embroidery',
    },
    {
      id: 'stickers',
      title: 'استيكرات استيكراتك',
      image: '/services/service-stickers.jpg',
      badge: 'تسليم سريع ⚡',
      btnText: 'صمم استيكراتك ✂️',
      link: '/request?service=stickers-labels',
    },
    {
      id: 'mugs',
      title: 'مجات وهدايا ترويجية',
      image: '/services/service-mugs.jpg',
      btnText: 'طلب كميات وهدايا 🎁',
      link: '/request?service=mugs-promotional-gifts',
    },
    {
      id: 'cases',
      title: 'جرابات هواتف مخصصة',
      image: '/services/service-cases.jpg',
      btnText: 'اختر موديل هاتفك 📱',
      link: '/request?service=phone-cases',
    },
    {
      id: 'design',
      title: 'خدمة المساعدة والتصميم الفني',
      image: '/services/service-design.jpg',
      btnText: 'تواصل مع مصمم 🖌️',
      link: '/contact',
    },
  ];

  // 3 Verified high-resolution portfolio models
  const portfolioItems = [
    {
      id: 'port-1',
      title: 'هوديز قطنية لطلاب كلية الهندسة بأسوان',
      clientName: 'دفعة هندسة أسوان 2024',
      category: 'ملابس وهوديز',
      serviceId: 'clothing-hoodies',
      description: 'طباعة 120 هودي أسود وكحلي مع لوجو الكلية على الصدر وتطريز أرقام الدفعات بدقة متناهية.',
      imageUrl: '/showcase/premium-embroidered-hoodie.jpg',
    },
    {
      id: 'port-2',
      title: 'استيكرات فينيل مقاومة للماء لمشروع شبابي بأسوان',
      clientName: 'براند أسوان كرافت',
      category: 'استيكرات فينيل',
      serviceId: 'stickers-labels',
      description: '500 استيكر Die-cut مقصوص على شكل الشعار بلمعان مطفي يتحمل الرطوبة والشمس لحقائب المنتجات.',
      imageUrl: '/services/service-stickers.jpg',
    },
    {
      id: 'port-3',
      title: 'جرابات هواتف مطبوعة بتصاميم مستوحاة من التراث النوبي',
      clientName: 'متجر أصالة نوبية',
      category: 'جرابات هواتف',
      serviceId: 'phone-cases',
      description: 'سلسلة من جرابات آيفون وسامسونج بنقوش وزخارف تراثية ملونة بتقنية UV ثلاثية الأبعاد البارزة.',
      imageUrl: '/services/service-cases.jpg',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-x-hidden bg-[#F6F1E7]">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION (a): Cinematic Hero with Embroidery Animation
      ───────────────────────────────────────────────────────────── */}
      <EmbroideryHero />

      {/* ─────────────────────────────────────────────────────────────
          SECTION (b): Real Sketch to Polished Product (Before & After)
      ───────────────────────────────────────────────────────────── */}
      <BeforeAfterShowcase />

      {/* ─────────────────────────────────────────────────────────────
          SECTION (c): Services / Products Catalogue (Refined Visual Cards)
      ───────────────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#0B5F55] font-bold text-xs mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>كتالوج الخدمات والمنتجات المعتمدة</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#073B35] font-display">
              حلول متكاملة للطباعة والتطريز في مكان واحد
            </h2>
            <p className="text-sm text-[#4d6560] mt-1">
              نغطي كافة منتجات الملابس، الكابات، المجات، وجرابات الهواتف بجودة تشطيب استثنائية.
            </p>
          </div>

          <Link to="/services">
            <Button variant="outline" className="gap-2 shrink-0 border-[#d9d2c3] hover:bg-white text-slate-800">
              <span>عرض كل الخدمات</span>
              <ChevronLeft className="w-4 h-4 rtl:rotate-0" />
            </Button>
          </Link>
        </div>

        {/* 6 High-Quality Services Grid matching client layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service) => (
            <Card
              key={service.id}
              className="group overflow-hidden rounded-2xl border-2 border-[#0B5F55]/60 hover:border-[#E3A92F] transition-all duration-300 shadow-xl bg-[#073B35] relative flex flex-col justify-between"
            >
              {/* Product Visual Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#073B35] via-black/20 to-black/40 pointer-events-none" />

                {/* Brand Logo & Title on top */}
                <div className="absolute top-3.5 inset-x-4 flex items-center justify-between z-10">
                  <h3 className="font-bold text-base sm:text-lg text-white font-display drop-shadow-md">
                    {service.title}
                  </h3>
                  <BrandLogo variant="white-on-green" className="h-6 w-auto drop-shadow-sm opacity-90" />
                </div>

                {/* Quick Delivery Badge if exists */}
                {service.badge && (
                  <div className="absolute top-12 start-4 z-10">
                    <Badge className="bg-[#E3A92F] text-[#073B35] font-black text-[10px] px-2 py-0.5 shadow-md border-none">
                      {service.badge}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Action Button at bottom */}
              <div className="p-4 pt-1 bg-[#073B35] z-10">
                <Link to={service.link} className="block w-full">
                  <Button
                    className="w-full bg-[#052925] hover:bg-[#0B5F55] text-white border border-emerald-500/40 hover:border-[#E3A92F] text-xs font-bold py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <span>[ {service.btnText} ]</span>
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION (d): Portfolio with High Resolution Photography
      ───────────────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#0B5F55] font-bold text-xs mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>معرض الأعمال والنماذج السابقة</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#073B35] font-display">
              أعمال نفذناها بكل شغف ودقة
            </h2>
            <p className="text-sm text-[#4d6560] mt-1">
              نماذج واقعية مصورة بجودة عالية؛ يمكنك اختيار أي نموذج واستخدامه كمرجع مباشر لطلبك!
            </p>
          </div>

          <Link to="/portfolio">
            <Button variant="outline" className="gap-2 shrink-0 border-[#d9d2c3] hover:bg-white text-slate-800">
              <span>تصفح كل المعرض</span>
              <ChevronLeft className="w-4 h-4 rtl:rotate-0" />
            </Button>
          </Link>
        </div>

        {/* 3 Prominent Portfolio Cards with Full Visual Photography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-[#d9d2c3] hover:border-[#0B5F55] flex flex-col justify-between bg-white group rounded-2xl">
              {/* Card visual: Full aspect ratio image */}
              <div className="h-48 sm:h-52 bg-[#073B35] relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                
                {/* Category Badge */}
                <div className="absolute top-3 start-3 z-10">
                  <Badge className="bg-[#E3A92F] text-[#073B35] font-black text-[11px] shadow-md border-none">
                    {item.category}
                  </Badge>
                </div>

                {/* Client info overlay */}
                <div className="absolute bottom-3 inset-x-4 text-white z-10">
                  <span className="text-[11px] text-[#E3A92F] font-bold block">{item.clientName}</span>
                  <h3 className="text-sm font-black leading-snug mt-0.5 text-white drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>

              <CardContent className="p-5 space-y-3.5">
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-slate-100">
                  <Button
                    size="sm"
                    onClick={() =>
                      navigate(`/request?service=${item.serviceId}&ref=${encodeURIComponent(item.title)}`)
                    }
                    className="w-full text-xs gap-1.5 bg-[#0B5F55] hover:bg-[#073B35] text-white py-2 rounded-xl"
                  >
                    <span>استخدم هذا العمل كمرجع لطلبك</span>
                    <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION (e): How Ordering Works
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 border-y border-[#d9d2c3]/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-[#0B5F55] uppercase tracking-wider">سير العمل المعتمد (Customer Journey)</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#073B35] font-display">
              رحلة طلبك من الفكرة حتى الاستلام
            </h2>
            <p className="text-sm text-[#4d6560]">
              خطوات منظمة ومباشرة مدعومة بفحص الجاهزية الذكي لضمان استيفاء كافة المواصفات.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'اختر وحدد المواصفات',
                desc: 'حدد نوع المنتج، الألوان، وتوزيع المقاسات المطلوب بدقة في معالج الطلب.',
              },
              {
                step: '02',
                title: 'فحص الجاهزية الذكي',
                desc: 'يتأكد المساعد من تطابق الكمية مع مجموع المقاسات ووجود التصميم المرفق.',
              },
              {
                step: '03',
                title: 'إصدار كود المتابعة',
                desc: 'تحصل فوراً على رمز طلب رسمي (YZ-xxxx) وتستعرض ملخصاً كاملاً قابلاً للمراجعة.',
              },
              {
                step: '04',
                title: 'اعتماد المعمل والتنفيذ',
                desc: 'يراجع المشرف ملفاتك، يحدد القرار والتوجيه، ويمكنك متابعة الحالة لحظياً.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F6F1E7] rounded-2xl p-6 border border-[#d9d2c3] shadow-xs relative overflow-hidden"
              >
                <span className="text-4xl font-black text-slate-300/40 absolute top-3 end-3 select-none pointer-events-none font-mono">
                  {item.step}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#0B5F55] text-white flex items-center justify-center font-bold text-xs mb-4">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/request">
              <Button size="lg" className="bg-[#E3A92F] hover:bg-[#d49b24] text-[#073B35] font-black px-8">
                ابدأ رحلة طلبك الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: High-End Brand Aesthetics & Products Showcase
      ───────────────────────────────────────────────────────────── */}
      <SocialDesignsShowcase />

      {/* ─────────────────────────────────────────────────────────────
          SECTION (f): Contact CTA
      ───────────────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#073B35] via-[#0B5F55] to-[#073B35] text-white p-8 sm:p-14 overflow-hidden shadow-2xl border-2 border-[#0B5F55]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-5 text-center sm:text-start">
              <Badge className="bg-[#E3A92F]/20 text-[#E3A92F] border-[#E3A92F]/40 text-xs">
                جاهزون لبدء مشروعك
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-black leading-tight text-white font-display">
                هل لديك فكرة أو تصميم وتبحث عن لمسة تليق بعلامتك؟
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                استخدم معالج الطلب الذكي الآن وسيقوم المساعد بفحص تفاصيل طلبك وتمريره للمشرف للمراجعة.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
                <Link to="/request" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-[#E3A92F] text-[#073B35] hover:bg-[#d49b24] font-black shadow-md border-none">
                    ابدأ معالج الطلب
                  </Button>
                </Link>
                
                <a
                  href={generateWhatsAppLink(undefined, 'مرحباً، أود الاستفسار عن خدمات يوزرسيف المتاحة.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto text-white hover:bg-white/10 border border-white/30 gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>تواصل واتساب ({YUZERSEF_WHATSAPP})</span>
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="p-6 rounded-2xl bg-[#0B5F55]/40 border border-white/10 backdrop-blur-xs shadow-inner flex items-center justify-center">
                <BrandLogo
                  variant="white-on-green"
                  className="h-28 sm:h-36 w-auto drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
