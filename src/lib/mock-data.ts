import { Service, PortfolioItem, ServiceRequest } from './types';

export const DEMO_NOTICE = 'تجريبي - للعرض فقط (Demo Data - Needs Client Confirmation)';

// The exact 6 core services of Yuzersef Aswan from brief documentation
export const DEMO_SERVICES: Service[] = [
  {
    id: 'clothing-hoodies',
    category: 'clothing',
    title: 'تيشرتات وهوديز وسويت شيرت مطبوعة',
    shortDescription: 'طباعة وتخصيص تجريبي للملابس بمختلف المقاسات والألوان (Demo).',
    fullDescription: 'معاينة تجريبية لخدمة طباعة وتخصيص الملابس (تيشرتات، هوديز، سويت شيرت) للأفراد والفرق، مع خيارات متعددة للألوان ومواضع الطباعة (Demo).',
    icon: 'Shirt',
    imageUrl: '/products/tshirt-white-front.png',
    startingPrice: 'يبدأ من 180 ج.م (تقديري)',
    features: [
      'خيارات أقمشة متعددة للمعاينة التفاعلية (Demo)',
      'طباعة بتدرجات ألوان واضحة وتوزيع مقاسات مرن',
      'توزيع المقاسات من S حتى XXL',
      'إمكانية الطباعة على الصدر أو الظهر'
    ],
    deliverables: ['ملابس مطبوعة ومغلفة بشكل فردي', 'معاينة رقمية قبل بدء التنفيذ'],
    estimatedDays: '2 - 4 أيام عمل',
    badge: 'الأكثر طلباً'
  },
  {
    id: 'caps-embroidery',
    category: 'caps',
    title: 'كابات مطبوعة ومطرزة',
    shortDescription: 'كابات عصرية بيسبول وسناب باك بتصاميم وشعارات بارزة مقاومة للشمس والعوامل الخارجية.',
    fullDescription: 'تخصيص كابات للفعاليات والمشاريع الشبابية وأصحاب البراندات، بخامات متنوعة وأقفال معدنية قابلة للتعديل مع دقة عالية في وضع الشعارات أو العبارات.',
    icon: 'Cap',
    imageUrl: '/products/cap-black-front.png',
    startingPrice: 'يبدأ من 95 ج.م (تقديري)',
    features: [
      'خامات قطنية وشبكية عالية التهوية',
      'طباعة فينيل حراري بارز أو تطريز دقيق',
      'مقاس موحد قابل للتعديل (Adjustable Strap)',
      'تنوع واسع في ألوان الكابات الأساسية'
    ],
    deliverables: ['كابات مجهزة في علب حماية من التلف', 'معاينة التصميم الرقمي قبل البدء'],
    estimatedDays: '2 - 3 أيام عمل',
    badge: 'شبابي ومميز'
  },
  {
    id: 'stickers-labels',
    category: 'stickers',
    title: 'استيكرات ولواصق مخصصة (Die-Cut)',
    shortDescription: 'استيكرات فينيل مقاومة للماء والخدش، مقصوصة بدقة دي-كت على شكل التصميم أو دائرية ومستطيلة.',
    fullDescription: 'طباعة ملصقات فينيل لامعة ومطفية تناسب اللابتوب، زجاجات المياه، تغليف المنتجات، والسيارات، مع قص مخصص دقيق حول أدق تفاصيل الشعار.',
    icon: 'Sticker',
    imageUrl: '/products/case-green-back.png',
    startingPrice: 'يبدأ من 50 ج.م (تقديري)',
    features: [
      'فينيل مقاوم للماء وأشعة الشمس والخدوش',
      'قص مخصص Die-cut أو Kiss-cut على ورق سهل النزع',
      'طباعة عالية الدقة تبرز تفاصيل الخطوط الدقيقة',
      'خيارات تشطيب: لامع (Glossy) أو مطفي (Matte)'
    ],
    deliverables: ['شيتات أو ملصقات مقطعة فردياً جاهزة للتوزيع', 'لاصق قوي لا يترك أثراً عند الإزالة'],
    estimatedDays: '1 - 2 يوم عمل',
    badge: 'تسليم سريع'
  },
  {
    id: 'mugs-promotional-gifts',
    category: 'mugs-gifts',
    title: 'مجّات وهدايا ترويجية مخصصة',
    shortDescription: 'طباعة سبلميشن حرارية على المجّات السيراميك والسحرية والثيرموسات والدروع التذكارية.',
    fullDescription: 'هدايا شخصية ودعائية تترك انطباعاً دائماً. طباعة ألوان كاملة ومقاومة لغسالات الأطباق والميكروويف، وتجهيز بوكسات تذكارية للهدايا والمناسبات.',
    icon: 'Coffee',
    imageUrl: '/products/mug-white.png',
    startingPrice: 'يبدأ من 85 ج.م (تقديري)',
    features: [
      'مج سيراميك للمعاينة التجريبية بألوان متنوعة (Demo)',
      'طباعة سبلميشن بدقة ألوان فوتوغرافية',
      'ثرامس حرارية لحفظ البرودة والحرارة',
      'إمكانية كتابة الاسم أو إدراج صور شخصية'
    ],
    deliverables: ['المج داخل كرتونة حماية مخصصة هدية', 'تغليف ضد الصدمات للشحن الآمن'],
    estimatedDays: '1 - 2 يوم عمل'
  },
  {
    id: 'phone-cases',
    category: 'phone-cases',
    title: 'جرابات هواتف مخصصة (Custom Phone Cases)',
    shortDescription: 'كفرات حماية مدعمة بأحدث تصاميمك وصورك المخصصة لكافة موديلات آيفون وسامسونج وغيرها.',
    fullDescription: 'حوّل هاتفك إلى قطعة فنية تعبر عنك! جرابات سيليكون مرنة أو صلبة مدعمة ضد الصدمات، مع طباعة UV متطورة ثلاثية الأبعاد لا تبهت مع الاستخدام اليومي.',
    icon: 'Smartphone',
    imageUrl: '/products/case-black-back.png',
    startingPrice: 'يبدأ من 120 ج.م (تقديري)',
    features: [
      'متوفر لأكثر من 100 موديل لهواتف آبل، سامسونج، شاومي، وأوبو',
      'حواف مرتفعة لحماية الشاشة وعدسات الكاميرا',
      'طباعة UV ناصعة الألوان ومقاومة لبصمات الأصابع',
      'إمكانية إضافة اسمك أو تصميمك المفضل'
    ],
    deliverables: ['جراب مخصص داخل غلاف يوزرسيف الشفاف', 'ملمس مريح مانع للانزلاق'],
    estimatedDays: '1 - 3 أيام عمل',
    badge: 'الأحدث'
  },
  {
    id: 'custom-designs',
    category: 'custom-design',
    title: 'تصاميم مخصصة ومساعدة فنية',
    shortDescription: 'رسم وتجهيز الشعارات وتفريغ الخلفيات وتحويل الأفكار إلى ملفات فيكتور جاهزة للطباعة.',
    fullDescription: 'إذا لم تكن تملك تصميماً جاهزاً للطباعة، مصممونا في أسوان على أهبة الاستعداد لمساعدتك في رسم الشعار أو ضبط دقة الصورة وتحويلها لمقاسات الطباعة المثالية.',
    icon: 'Palette',
    imageUrl: '/products/hoodie-green-front.png',
    startingPrice: 'يبدأ من 70 ج.م (تقديري)',
    features: [
      'تحويل الرسومات اليدوية لملفات رقمية Vector',
      'تفريغ الصور وتحسين جودة الطباعة CMYK',
      'اقتراح مقاسات ومواضع الطباعة الأنسب للخامة',
      'بروفة رقمية واقعية (Mockup) قبل التنفيذ'
    ],
    deliverables: ['ملفات التصميم بصيغ AI, PDF, PNG عالية الدقة', 'موك أب توضيحي'],
    estimatedDays: '1 - 2 يوم عمل'
  }
];

export const DEMO_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'هوديز قطنية لطلاب كلية الهندسة بأسوان',
    clientName: 'دفعة هندسة أسوان 2024',
    category: 'clothing',
    serviceId: 'clothing-hoodies',
    description: 'طباعة 120 هودي أسود وكحلي مع لوجو الكلية على الصدر وأسماء الطلاب بتوزيع مقاسات دقيق.',
    imageUrl: '/products/hoodie-black-front.png',
    tags: ['هوديز شتوية', 'طباعة DTF', 'مقاسات متنوعة'],
    year: '2024',
    highlight: 'تم فحص جاهزية المقاسات عبر النظام وتسليم الطلبية بالكامل في 4 أيام.'
  },
  {
    id: 'port-2',
    title: 'استيكرات فينيل مقاومة للماء لمشروع شبابي بأسوان',
    clientName: 'براند أسوان كرافت',
    category: 'stickers',
    serviceId: 'stickers-labels',
    description: '500 استيكر Die-cut مقصوص على شكل الشعار بلمعان مطفي لحقائب وتغليف المنتجات.',
    imageUrl: '/products/case-green-back.png',
    tags: ['استيكرات دي-كت', 'مقاوم للماء', 'تغليف منتجات'],
    year: '2024',
    highlight: 'خامات فينيل ممتازة تتحمل الرطوبة والشمس.'
  },
  {
    id: 'port-3',
    title: 'جرابات هواتف مطبوعة بتصاميم مستوحاة من التراث النوبي',
    clientName: 'متجر أصالة نوبية',
    category: 'phone-cases',
    serviceId: 'phone-cases',
    description: 'سلسلة من جرابات آيفون وسامسونج بنقوش وزخارف تراثية ملونة بتقنية UV ثلاثية الأبعاد.',
    imageUrl: '/products/case-black-back.png',
    tags: ['جرابات آيفون', 'تراث نوبي', 'طباعة UV بارزة'],
    year: '2024',
    highlight: 'ثبات ألوان مذهل وملمس نافر عالي الفخامة.'
  },
  {
    id: 'port-4',
    title: 'كابات بيسبول مطرزة لماراثون النيل بأسوان',
    clientName: 'نادي رياضي أسواني',
    category: 'caps',
    serviceId: 'caps-embroidery',
    description: 'كابات رياضية بيضاء مع لوجو مطرز باللون الأخضر وشعار الحدث.',
    imageUrl: '/products/cap-white-front.png',
    tags: ['كابات رياضية', 'تطريز شعارات', 'ماراثون'],
    year: '2024',
    highlight: 'تسليم 200 كاب قبل انطلاق الفعالية بيومين.'
  },
  {
    id: 'port-5',
    title: 'مجّات سحرية هدايا تخرج مخصصة بالأسماء',
    clientName: 'أكاديمية تدريب أسوان',
    category: 'mugs-gifts',
    serviceId: 'mugs-promotional-gifts',
    description: 'مجّات حرارية سحرية تكشف عن صور الخريجين وعبارات التهنئة عند صب المشروب الساخن.',
    imageUrl: '/products/mug-white.png',
    tags: ['مج سحري', 'هدايا تخرج', 'سبلميشن فوتوغرافي'],
    year: '2024',
    highlight: 'تجهيز وتغليف فردي في علب هدايا أنيقة.'
  },
  {
    id: 'port-6',
    title: 'تيشرتات أوفر سايز بطباعة جرافيك أصلية',
    clientName: 'براند ستريت وير محلي',
    category: 'clothing',
    serviceId: 'clothing-hoodies',
    description: 'تيشرتات أوفر سايز تجريبية مع رسمة على الظهر وشعار على الجيب (Demo).',
    imageUrl: '/products/tshirt-black-back.png',
    tags: ['أوفر سايز', 'طباعة ظهر', 'نموذج تجريبي'],
    year: '2024',
    highlight: 'معاينة تجريبية ناجحة للمقاسات والمواصفات.'
  }
];

export const INITIAL_DEMO_REQUESTS: ServiceRequest[] = [
  {
    id: 'YZ-0001',
    customerName: 'محمود عبد الرحيم (تجريبي)',
    phone: '01012345678',
    email: 'mahmoud.aswan@example.com',
    serviceId: 'clothing-hoodies',
    serviceTitle: 'تيشرتات وهوديز وسويت شيرت مطبوعة',
    serviceCategory: 'clothing',
    projectBrief: 'طلب 10 هوديز شتوية لون أسود لفريق العمل، مع طباعة لوجو الشركة على الصدر بمقاس 10 سم وطباعة العبارة على الظهر.',
    quantity: 10,
    clothingColor: 'أسود',
    sizeBreakdown: { s: 2, m: 4, l: 3, xl: 1, xxl: 0 },
    printPlacement: 'both-sides',
    needsDesignHelp: false,
    desiredDate: '2026-10-30',
    receiptPreference: 'aswan-pickup',
    urgency: 'normal',
    budget: '1800 - 2000 ج.م',
    attachments: [
      { id: 'att-1', name: 'team-logo-vector.pdf', size: 1850000, type: 'application/pdf' }
    ],
    status: 'in-progress',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    adminNotes: 'تم فحص وتطابق توزيع المقاسات (10/10). جاري الطباعة الحرارية في المعمل.',
    nextStepText: 'التجهيز والتغليف والاستلام يوم الخميس من مقر يوزرسيف بأسوان.'
  },
  {
    id: 'YZ-0002',
    customerName: 'فاطمة النوبي (تجريبي)',
    phone: '01123456789',
    email: 'fatma.demo@example.com',
    serviceId: 'stickers-labels',
    serviceTitle: 'استيكرات ولواصق مخصصة (Die-Cut)',
    serviceCategory: 'stickers',
    projectBrief: 'استيكرات دائرية مقاس 5×5 سم لتغليف علب الكوكيز المنزلية، نحتاج لمسة مطفية مقاومة للزيوت والماء.',
    quantity: 200,
    stickerWidthCm: 5,
    stickerHeightCm: 5,
    stickerShape: 'circle',
    stickerUsage: 'outdoor-waterproof',
    needsDesignHelp: false,
    desiredDate: '2026-10-28',
    receiptPreference: 'shipping-delivery',
    urgency: 'urgent',
    budget: '250 ج.م',
    attachments: [
      { id: 'att-2', name: 'cookie-label-art.png', size: 920000, type: 'image/png' }
    ],
    status: 'under-review',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    adminNotes: 'طلب مستعجل قيد المراجعة الفنية للتأكد من هوامش القطع الدائري.',
    nextStepText: 'سيتم تأكيد عرض السعر النهائي خلال ساعتين عبر الواتساب.'
  },
  {
    id: 'YZ-0003',
    customerName: 'كريم الشريف (تجريبي)',
    phone: '01234567890',
    email: 'karim.demo@example.com',
    serviceId: 'phone-cases',
    serviceTitle: 'جرابات هواتف مخصصة (Custom Phone Cases)',
    serviceCategory: 'phone-cases',
    projectBrief: 'جراب هاتف آيفون 15 برو، أريد طباعة اسم "KAREEM" مع خلفية سوداء رخامية وتأثير بارز.',
    quantity: 1,
    phoneModel: 'iPhone 15 Pro',
    personalisationText: 'KAREEM',
    needsDesignHelp: true,
    desiredDate: '2026-10-27',
    receiptPreference: 'aswan-pickup',
    urgency: 'normal',
    budget: '120 ج.م',
    attachments: [],
    status: 'approved',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    adminNotes: 'الطلب معتمد. المصمم جهز البروفة الأولية للاعتماد.',
    nextStepText: 'تم إرسال بروفة التصميم على الواتساب وبانتظار موافقة العميل للبدء بالطباعة.'
  },
  {
    id: 'YZ-0004',
    customerName: 'عمر الصادق (تجريبي)',
    phone: '01512345678',
    email: 'omar.demo@example.com',
    serviceId: 'clothing-hoodies',
    serviceTitle: 'تيشرتات وهوديز وسويت شيرت مطبوعة',
    serviceCategory: 'clothing',
    projectBrief: 'طلب 50 تيشرت تخرج بلون أبيض، الميزانية المقترحة 1000 جنيه للكمية بالكامل.',
    quantity: 50,
    clothingColor: 'أبيض',
    sizeBreakdown: { s: 10, m: 20, l: 15, xl: 5, xxl: 0 },
    printPlacement: 'chest',
    needsDesignHelp: false,
    desiredDate: '2026-10-25',
    receiptPreference: 'aswan-pickup',
    urgency: 'normal',
    budget: '1000 ج.م (غير متوافق)',
    attachments: [],
    status: 'rejected',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    adminNotes: 'الميزانية المقدمة من العميل (20 ج.م للتيشرت) غير كافية لتغطية تكلفة خامة القطن المصري الفاخر والطباعة.',
    rejectionReason: 'الميزانية المقترحة أقل من تكلفة خامات القطن الفاخر والطباعة الحرارية المعتمدة لدى يوزرسيف.',
    nextStepText: 'يمكن للعميل تعديل الكمية أو اختيار خامة بديلة والتواصل معنا عبر واتساب 01116891025.'
  }
];

export const DEMO_ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'demo123',
  name: 'مسؤول يوزرسيف (Demo Admin)'
};
