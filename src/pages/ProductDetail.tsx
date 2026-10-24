import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Send, Palette } from 'lucide-react';
import { getShopProductById, type ShopProductColor, type ShopProductSize } from '../lib/shop-data';

// ─── Size Guide Modal ──────────────────────────────────────────────────────────
const SizeGuideModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
    <div
      className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-lg font-bold text-slate-900 mb-4 text-right">دليل المقاسات</h2>
      <table className="w-full text-sm text-right border-collapse">
        <thead>
          <tr className="bg-slate-50">
            <th className="p-2 border border-slate-200 font-semibold">المقاس</th>
            <th className="p-2 border border-slate-200 font-semibold">الصدر (سم)</th>
            <th className="p-2 border border-slate-200 font-semibold">الطول (سم)</th>
          </tr>
        </thead>
        <tbody>
          {[
            { size: 'Small', chest: '96–100', length: '68' },
            { size: 'Medium', chest: '100–104', length: '70' },
            { size: 'Large', chest: '104–108', length: '72' },
            { size: 'Xlarge', chest: '108–114', length: '74' },
          ].map((row) => (
            <tr key={row.size} className="hover:bg-slate-50">
              <td className="p-2 border border-slate-200">{row.size}</td>
              <td className="p-2 border border-slate-200">{row.chest}</td>
              <td className="p-2 border border-slate-200">{row.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={onClose}
        className="mt-5 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
      >
        إغلاق
      </button>
    </div>
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────
export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getShopProductById(id) : undefined;

  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors?.[0]?.id ?? ''
  );
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6F1E7] gap-4">
        <p className="text-slate-600 text-lg">المنتج مش موجود</p>
        <button
          onClick={() => navigate('/products')}
          className="px-5 py-2.5 bg-[#0B5F55] text-white rounded-xl text-sm font-semibold hover:bg-[#073B35] transition-colors"
        >
          رجوع للمنتجات
        </button>
      </div>
    );
  }

  // ── Variant-aware image & size logic ───────────────────────────────────────
  // Find the variant matching the selected color (if variants exist)
  const currentVariant = product.variants?.find((v) => v.colorId === selectedColor);

  // Images: use variant-specific images if available, else fall back to product.images
  const allImages =
    currentVariant?.images && currentVariant.images.length > 0
      ? currentVariant.images
      : product.images && product.images.length > 0
      ? product.images
      : [product.imageUrl];

  // Sizes: use variant-specific sizes if available, else fall back to product.sizes
  const displaySizes = currentVariant?.sizes ?? product.sizes ?? [];

  const currentColor = product.colors?.find((c: ShopProductColor) => c.id === selectedColor);

  return (
    <div className="min-h-screen bg-[#F6F1E7]" dir="rtl">
      {showSizeGuide && <SizeGuideModal onClose={() => setShowSizeGuide(false)} />}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 justify-end flex-wrap">
          <Link to="/" className="hover:text-[#0B5F55] transition-colors">الرئيسية</Link>
          <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
          <Link to="/products" className="hover:text-[#0B5F55] transition-colors">المنتجات</Link>
          <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
          <span className="text-slate-800 font-medium truncate max-w-[160px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Layout */}
        <div className="flex flex-col-reverse lg:flex-row gap-10 items-start">

          {/* ── Left: Info Panel ── */}
          <div className="w-full lg:w-[420px] shrink-0 flex flex-col gap-5">

            {/* Badge */}
            {product.badge && (
              <span className="inline-flex items-center self-start gap-1.5 bg-[#E3A92F] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                {product.badge}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div>
              <p className="text-xs text-slate-500 mb-0.5">سعر المنتج</p>
              <p className="text-3xl font-black text-slate-900">
                {product.price.toLocaleString('ar-EG')} جنيه
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}{' '}
                {product.description.length > 80 && (
                  <span className="text-[#0B5F55] font-semibold cursor-pointer hover:underline">
                    اقرأ المزيد...
                  </span>
                )}
              </p>
            )}

            {/* Color Selector — clicking a color resets image gallery */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-sm font-bold text-slate-700 mb-2">
                  اللون:{' '}
                  <span className="font-semibold text-[#0B5F55]">{currentColor?.name ?? ''}</span>
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.colors.map((color: ShopProductColor) => (
                    <button
                      key={color.id}
                      onClick={() => {
                        // Reset gallery to first image when color changes
                        setSelectedColor(color.id);
                        setActiveImageIdx(0);
                        setSelectedSize('');
                      }}
                      title={color.name}
                      className={`w-9 h-9 rounded-full transition-all duration-200 ${
                        selectedColor === color.id
                          ? 'ring-2 ring-[#0B5F55] ring-offset-2 scale-110'
                          : 'hover:scale-105 ring-1 ring-slate-300'
                      } ${color.border ? 'border-2 border-slate-300' : ''}`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector — driven by variant sizes if available */}
            {displaySizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs text-[#0B5F55] font-semibold hover:underline"
                  >
                    دليل المقاسات
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-700">المقاس</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                      {displaySizes.filter((s: ShopProductSize) => s.available).length} متاح
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-2 text-right">اختر المقاس المناسب</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {displaySizes.map((size: ShopProductSize) => (
                    <button
                      key={size.label}
                      onClick={() => size.available && setSelectedSize(size.label)}
                      disabled={!size.available}
                      className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                        !size.available
                          ? 'border-slate-200 text-slate-300 cursor-not-allowed line-through'
                          : selectedSize === size.label
                          ? 'border-[#0B5F55] bg-[#0B5F55] text-white shadow-sm'
                          : 'border-slate-300 text-slate-700 hover:border-[#0B5F55] hover:text-[#0B5F55] bg-white'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add Design */}
            <div className="rounded-2xl bg-white border border-slate-200 p-4">
              <div className="flex items-center gap-2 justify-end mb-2">
                <p className="text-sm font-bold text-slate-800">ضيف تصميمك</p>
                <Plus className="w-4 h-4 text-[#0B5F55]" />
              </div>
              <p className="text-xs text-slate-500 text-right mb-4 leading-relaxed">
                أضف صورة أو نص، واوصف الموضوع وعايز كل جانب الاستوديو
              </p>

              {/* Studio Button */}
              <Link
                to={`/request?product=${product.id}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all duration-200 mb-2"
              >
                <Palette className="w-4 h-4" />
                <span>ابدأ التصميم</span>
              </Link>

              {/* Send Design Button */}
              <Link
                to={`/request?product=${product.id}&action=send`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                <span>أرسل لنا تصميمك</span>
              </Link>
            </div>

            {/* Footer note */}
            <p className="text-xs text-slate-400 text-right leading-relaxed">
              شبكة ملف جاهزة؟ ارفعها واحجز دون فلوس قبل الطباعة عن طريق الاستوديو.
            </p>
          </div>

          {/* ── Right: Image Gallery — updates when color changes ── */}
          <div className="w-full lg:flex-1 flex flex-col-reverse sm:flex-row gap-3">
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto shrink-0">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`rounded-xl overflow-hidden shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 transition-all ${
                      activeImageIdx === idx
                        ? 'border-[#0B5F55] shadow-md'
                        : 'border-transparent hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} صورة ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="flex-1 relative rounded-3xl overflow-hidden bg-white shadow-sm min-h-[320px] sm:min-h-[480px] lg:min-h-[560px]">
              <img
                src={allImages[activeImageIdx]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {product.badge && (
                <span className="absolute top-4 right-4 bg-[#E3A92F] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {product.badge}
                </span>
              )}
              {/* Color indicator overlay */}
              {currentColor && (
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                  <div
                    className="w-4 h-4 rounded-full border border-slate-300"
                    style={{ backgroundColor: currentColor.hex }}
                  />
                  <span className="text-xs font-semibold text-slate-700">{currentColor.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
