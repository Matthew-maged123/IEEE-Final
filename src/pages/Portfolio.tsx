import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, Sparkles, ArrowLeft, Tag, Calendar, CheckCircle2, BookmarkPlus } from '../components/ui/icons';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { getPortfolioItems } from '../lib/mock-api';
import { PortfolioItem } from '../lib/types';

export const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('الكل');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPortfolioItems().then((res) => {
      setItems(res);
      setLoading(false);
    });
  }, []);

  const categories = [
    { id: 'الكل', label: 'الكل' },
    { id: 'clothing', label: 'تيشرتات وهوديز' },
    { id: 'caps', label: 'كابات' },
    { id: 'stickers', label: 'استيكرات ولواصق' },
    { id: 'phone-cases', label: 'جرابات هواتف' },
    { id: 'mugs-gifts', label: 'مجّات وهدايا' },
  ];

  const filteredItems =
    activeCategory === 'الكل'
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="py-10 sm:py-16 space-y-12 bg-transparent min-h-screen">
      {/* Header */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
        <Badge variant="demo" className="text-xs bg-[#065E5A]/10 text-[#065E5A] border-[#065E5A]/30">
          معرض أعمال ونماذج يوزرسيف في أسوان (Portfolio)
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-[#012C2B] tracking-tight">
          معرض الأعمال والتنفيذات المخصصة
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          استكشف نماذج من التيشرتات، الهوديز، الكابات، الاستيكرات، وجرابات الموبايل التي نفذناها لعملائنا في أسوان. يمكنك اختيار أي عمل واستخدامه كمرجع مباشر لطلبك!
        </p>
      </section>

      {/* Categories Filter */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#E3A92F] text-[#073B35] border-2 border-[#073B35] shadow-[3px_3px_0px_#073B35]'
                  : 'bg-white text-[#073B35] border-2 border-[#d9d2c3] hover:border-[#073B35]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Items Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 rounded-xl bg-slate-200/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200 flex flex-col justify-between group bg-white"
              >
                {/* Visual Banner */}
                <div className="h-56 bg-linear-to-tr from-[#012C2B] via-[#065E5A] to-[#012C2B] p-5 flex flex-col justify-between text-white relative overflow-hidden group">
                  {item.imageUrl && (
                    <div className="absolute inset-y-2 end-2 w-36 flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 pointer-events-none">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain drop-shadow-lg"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between relative z-10">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-xs text-[10px]">
                      {item.category === 'clothing' ? 'ملابس وهوديز' : item.category === 'stickers' ? 'استيكرات' : item.category === 'phone-cases' ? 'جرابات موبايل' : item.category === 'caps' ? 'كابات' : 'هدايا ومجات'}
                    </Badge>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-200 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.year}
                    </span>
                  </div>

                  <div className="relative z-10 max-w-[65%]">
                    <span className="text-xs text-[#5ee7cf] font-semibold">{item.clientName}</span>
                    <h3 className="text-base font-black leading-snug mt-1 group-hover:text-emerald-100 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <div className="absolute -bottom-8 -end-8 w-32 h-32 rounded-full bg-[#5ee7cf]/10 blur-xl pointer-events-none" />
                </div>

                <CardContent className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{item.highlight}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* "Use as reference" Action (Mandated by Section 5 & Page 8 / 15) */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Button
                      onClick={() =>
                        navigate(
                          `/request?service=${item.serviceId}&ref=${encodeURIComponent(item.title)}`
                        )
                      }
                      className="w-full gap-2 text-xs"
                    >
                      <BookmarkPlus className="w-4 h-4" />
                      <span>استخدم هذا العمل كمرجع لطلبك (Use as reference)</span>
                    </Button>
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
