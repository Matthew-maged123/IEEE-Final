import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Shirt,
  Smartphone,
  Tag,
  Coffee,
  Palette,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ArrowLeft
} from '../components/ui/icons';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { getServices } from '../lib/mock-api';
import { Service, ServiceCategory } from '../lib/types';

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('الكل');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices().then((res) => {
      setServices(res);
      setLoading(false);
    });
  }, []);

  const categories = [
    { id: 'الكل', label: 'الكل' },
    { id: 'clothing', label: 'ملابس وهوديز' },
    { id: 'caps', label: 'كابات' },
    { id: 'stickers', label: 'استيكرات ولواصق' },
    { id: 'phone-cases', label: 'جرابات هواتف' },
    { id: 'mugs-gifts', label: 'مجّات وهدايا' },
    { id: 'custom-design', label: 'تصاميم مخصصة' },
  ];

  const filteredServices =
    activeCategory === 'الكل'
      ? services
      : services.filter((s) => s.category === activeCategory);

  const getServiceIcon = (category: ServiceCategory) => {
    switch (category) {
      case 'clothing':
        return <Shirt className="w-6 h-6" />;
      case 'caps':
        return <Sparkles className="w-6 h-6" />;
      case 'stickers':
        return <Tag className="w-6 h-6" />;
      case 'phone-cases':
        return <Smartphone className="w-6 h-6" />;
      case 'mugs-gifts':
        return <Coffee className="w-6 h-6" />;
      case 'custom-design':
        return <Palette className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="py-10 sm:py-16 space-y-12 bg-[#EFEFEA] min-h-screen">
      {/* Header */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
        <Badge variant="demo" className="text-xs bg-[#065E5A]/10 text-[#065E5A] border-[#065E5A]/30">
          خدمات الطباعة والتخصيص في أسوان (Demo Services)
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-[#012C2B] tracking-tight">
          خدمات الطباعة والتخصيص المعتمدة
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          نقدم في «يوزرسيف» حلول طباعة مباشرة وتطريز على التيشرتات والهوديز والكابات والجرابات والاستيكرات بأعلى خامات القطن والفينيل المقاوم للعوامل الجوية.
        </p>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#065E5A] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 rounded-xl bg-slate-200/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="hover:shadow-xl hover:border-[#065E5A] transition-all duration-200 flex flex-col justify-between overflow-hidden border-slate-200 bg-white"
              >
                <CardContent className="p-7 space-y-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#065E5A]/10 text-[#065E5A] flex items-center justify-center font-bold">
                      {getServiceIcon(service.category)}
                    </div>
                    {service.badge && (
                      <Badge className="bg-[#065E5A]/15 text-[#065E5A] border-[#065E5A]/30 text-xs font-bold">
                        {service.badge}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-xl text-slate-900">{service.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Feature highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-700">أبرز المواصفات والخامات:</p>
                    <ul className="space-y-1.5">
                      {service.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#065E5A] mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and turnaround */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="block text-[10px] text-slate-400">التسعير التقريبي</span>
                      <span className="font-bold text-slate-900 text-sm">{service.startingPrice}</span>
                    </div>
                    <div className="text-end">
                      <span className="block text-[10px] text-slate-400">متوسط التنفيذ</span>
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#065E5A]" />
                        {service.estimatedDays}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 grid grid-cols-2 gap-3">
                    <Link to={`/services/${service.id}`} className="w-full">
                      <Button variant="outline" size="sm" className="w-full text-xs border-slate-300">
                        التفاصيل الكاملة
                      </Button>
                    </Link>
                    <Link to={`/request?service=${service.id}`} className="w-full">
                      <Button size="sm" className="w-full text-xs gap-1 bg-[#065E5A] hover:bg-[#012C2B] text-white">
                        <span>طلب فوري</span>
                        <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
