# Youzersef - Homepage Backup (نسخة احتياطية للصفحة الرئيسية)

- **تاريخ إنشاء النسخة**: 2026-10-24
- **الغرض**: حفظ كود ومكونات وصور وموك اب الصفحة الرئيسية بالكامل.

---

## محتويات النسخة الاحتياطية

### 1. صفحات ومكونات React (`src/`):
- `src/pages/Home.tsx`: كود الصفحة الرئيسية بالكامل متضمناً الأقسام والمعرض والكتالوج.
- `src/components/EmbroideryHero.tsx`: سكشن الـ Hero التفاعلي مع استوديو تخصيص التيشيرت والهودي والـ Tote Bag.
- `src/components/Navbar.tsx`: الهيدر والـ Navbar العائم مع الأزرار العريضة والكبسولات.
- `src/components/BeforeAfterShowcase.tsx`: قسم المقارنة قبل وبعد بين الاسكتش والمنتج النهائي.
- `src/components/SocialDesignsShowcase.tsx`: معرض تصاميم السوشيال ميديا والتطريز.
- `src/components/BrandLogo.tsx`: مكون شعار العلامة التجارية الرسمي.
- `src/components/Footer.tsx`: الفوتر وتذييل الصفحة.
- `src/index.css`: ملف التنسيقات العامة وألوان الهوية.

### 2. الصور والأصول المرئية (`public/`):
- **اللوجوهات والشعارات**:
  - `public/feather-logo-green2.png`: ريشة يوزرسيف الخضراء الكبيرة في العنوان الرئيسي.
  - `public/feather-logo-green.png`
  - `public/logo/logo-green.png` و `public/logo/logo-white.png`: لوجو يوزرسيف الرسمي للطباعة والتخصيص.
  - `public/brand/*`: شعارات وأيقونات البراند.
- **موك اب منتجات الـ Hero**:
  - `public/products/Tote_Bag_Mockup.png`: موك اب الشنطة التوت باج الحقيقية.
  - `public/products/tshirt-white-front-trans.png`
  - `public/products/tshirt-green-front.png`
  - `public/products/tshirt-black-front-trans.png`
  - `public/products/hoodie-white-front-trans.png`
  - `public/products/hoodie-green-front.png`
  - `public/products/hoodie-black-front-trans.png`
- **كتالوج الخدمات (`public/services/`)**:
  - `service-hoodies.jpg`, `service-caps.jpg`, `service-stickers.jpg`, `service-mugs.jpg`, `service-cases.jpg`, `service-design.jpg`.
- **المعرض والمقارنات (`public/showcase/` & `public/social/`)**:
  - `sketch-before.jpg`, `embroidered-hoodie-after.jpg`, `premium-embroidered-hoodie.jpg`, `luxury-flat-lay.png`.
  - `social-design-1-showcase.png`, `social-design-2-personalize.png`.

---

## طريقة الاستعادة (Restore)
إذا أردت استعادة أي ملف أو الصفحة بالكامل، يمكنك ببساطة نسخ محتويات مجلد `backup_homepage/` إلى المجلد الرئيسي للمشروع وسيعود كل شيء كما هو تماماً.
