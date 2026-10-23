require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Service = require('../models/service.model');
const Portfolio = require('../models/portfolio.model');
const Request = require('../models/request.model');
const Setting = require('../models/setting.model');
const Message = require('../models/message.model');
const Enquiry = require('../models/enquiry.model');

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB for seeding...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB.');

    // 1. Clear existing data
    console.log('🧹 Clearing old collections...');
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Portfolio.deleteMany({}),
      Request.deleteMany({}),
      Setting.deleteMany({}),
      Message.deleteMany({}),
      Enquiry.deleteMany({}),
    ]);

    // 2. Seed Users
    console.log('👤 Seeding default users...');
    const adminUser = await User.create({
      name: 'يوزرسيف (المالك)',
      email: 'admin@userseif.com',
      phone: '01116891025',
      password: 'Admin123!',
      role: 'admin',
    });

    const demoCustomer = await User.create({
      name: 'أحمد محمود (عميل تجريبي)',
      email: 'customer@test.com',
      phone: '01012345678',
      password: 'Test123!',
      role: 'customer',
    });

    console.log(`   - Admin: admin@userseif.com / Admin123!`);
    console.log(`   - Customer: customer@test.com / Test123!`);

    // 3. Seed Services (From IEEE Brief)
    console.log('📦 Seeding official services...');
    const services = await Service.create([
      {
        title: 'طباعة تيشيرتات، هوديز وسويت شيرتات',
        slug: 'custom-tshirts-hoodies',
        category: 'clothing',
        description:
          'طباعة عالية الدقة على خامات قطنية ممتازة ومقاومة للغسيل والاستخدام المتكرر. متوفر طباعة على الصدر والظهر والأكمام والجيب لجميع المقاسات من S حتى 3XL.',
        basePrice: 220,
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
        ],
        options: {
          sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
          colors: ['أسود', 'أبيض', 'كحلي', 'رمادي', 'بيج', 'أحمر'],
          printPositions: ['الصدر (Front Center)', 'الظهر (Back)', 'الجيب الأيسر (Left Chest)', 'الأكمام (Sleeve)'],
          materials: ['قطن 100% ميلتون', 'قطن سنجل جيرسي عالي الجودة'],
        },
        isActive: true,
        displayOrder: 1,
      },
      {
        title: 'كابات مطبوعة ومطرزة',
        slug: 'custom-caps',
        category: 'caps',
        description:
          'كابات بيسبول وشبابية بخامات ممتازة وألوان متنوعة، مع إمكانية الطباعة الحرارية أو التطريز عالي الدقة لشعارات الفرق والشركات والأنشطة الطلابية.',
        basePrice: 95,
        images: [
          'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
        ],
        options: {
          colors: ['أسود', 'كحلي', 'أبيض', 'رمادي', 'زيتي'],
          printPositions: ['الواجهة الأمامية (Front)', 'الجانب الأيمن', 'الجانب الأيسر'],
          materials: ['قماش جبردين ثقيل', 'قطن كلاسيك'],
        },
        isActive: true,
        displayOrder: 2,
      },
      {
        title: 'استيكرات وملصقات فينيل مفرغة (Stickers & Labels)',
        slug: 'vinyl-stickers-labels',
        category: 'stickers',
        description:
          'استيكرات فينيل أصلية مقاومة تماماً للماء والحرارة والخدش، مع قص إلكتروني احترافي مفرغ (Die-Cut) حسب حدود التصميم أو في شيتات مجمعة.',
        basePrice: 15,
        images: [
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
        ],
        options: {
          shapes: ['Die-Cut مفرغ على حدود الرسمة', 'دائري', 'مستطيل / مربع', 'شيت مجمع (Sticker Sheet)'],
          materials: ['فينيل لامع (Glossy)', 'فينيل مط (Matte)', 'فينيل شفاف (Transparent)', 'فينيل هولوجرام (Holographic)'],
        },
        isActive: true,
        displayOrder: 3,
      },
      {
        title: 'مجات سيراميك وهدايا دعائية ترويجية',
        slug: 'custom-mugs-gifts',
        category: 'mugs',
        description:
          'مجات سيراميك وسحرية مخصصة للطباعة بوضوح ودقة ألوان فائقة، نوت بوك، أقلام، وميداليات ترويجية تناسب الهدايا الشخصية وتكريمات الإيفنتات والمؤسسات.',
        basePrice: 85,
        images: [
          'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
        ],
        options: {
          colors: ['أبيض كلاسيك', 'مج سحري أسود (Magic Mug)', 'مج بقلب ملون ودسته ملونة'],
          materials: ['سيراميك حراري أصلي درجة أولى'],
        },
        isActive: true,
        displayOrder: 4,
      },
      {
        title: 'كفرات موبايل مخصصة بتصميمك الخاص',
        slug: 'custom-phone-cases',
        category: 'phone-cases',
        description:
          'كفرات هواتف متينة ضد الصدمات مع طباعة كاملة ودقيقة لجميع موديلات هواتف iPhone و Samsung و Xiaomi وأحدث الإصدارات مع حماية الكاميرا.',
        basePrice: 120,
        images: [
          'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop&q=80',
        ],
        options: {
          materials: ['سيليكون مرن شفاف ضد الصدمات', 'بلاستيك صلب مع حواف سيليكون (Armor Shockproof)'],
        },
        isActive: true,
        displayOrder: 5,
      },
    ]);

    // 4. Seed Portfolio Projects
    console.log('🎨 Seeding portfolio items...');
    const portfolioItems = await Portfolio.create([
      {
        title: 'مجموعة تيشيرتات وسويت شيرتات مؤتمر IEEE أسوان السنوي',
        category: 'clothing',
        description:
          'تنفيذ تيشيرتات قطن 100% بلون كحلي مع طباعة شعار IEEE Aswan Student Branch وشعار المؤتمر على الصدر والظهر لجميع المتطوعين والمنظمين.',
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        ],
        clientName: 'IEEE Aswan Student Branch',
        relatedService: services[0]._id,
        featured: true,
        tags: ['IEEE', 'مؤتمرات', 'أسوان', 'تيشيرتات'],
      },
      {
        title: 'استيكرات فينيل مقاومة للماء والخدش للاب توب',
        category: 'stickers',
        description:
          'مجموعة استيكرات Die-Cut مفرغة بألوان هولوجرام لامعة وتصاميم برمجية شبابية للابتوب والموبايل بجودة طباعة فائقة.',
        images: [
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
        ],
        clientName: 'مجتمع مطوري أسوان',
        relatedService: services[2]._id,
        featured: true,
        tags: ['استيكرات', 'فينيل', 'تقنية'],
      },
      {
        title: 'مجات سحرية وهدايا ترحيبية للمتدربين',
        category: 'mugs',
        description:
          'طباعة مجات سيراميك مخصصة عليها أسماء الطلاب واللوجو الترحيبي مع علبة إهداء مميزة وتغليف فاخر.',
        images: [
          'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
        ],
        clientName: 'مركز تدريب أسوان',
        relatedService: services[3]._id,
        featured: false,
        tags: ['مجات', 'هدايا دعائية'],
      },
    ]);

    // 5. Seed Sample Request
    console.log('📋 Seeding sample customer requests...');
    const sampleRequest = await Request.create({
      requestNumber: 'US-2026-0001',
      user: demoCustomer._id,
      service: services[0]._id,
      serviceTitle: services[0].title,
      referencePortfolio: portfolioItems[0]._id,
      category: 'clothing',
      quantity: 10,
      description: 'تيشيرتات سوداء قطن لفعالية تقنية قادمة في أسوان مع لوجو الفريق على الصدر',
      specifications: {
        sizeBreakdown: { S: 2, M: 4, L: 3, XL: 1 },
        color: 'أسود',
        printPosition: 'الصدر (Front Center)',
        material: 'قطن 100% ميلتون',
      },
      artwork: {
        files: ['/uploads/demo-ieee-logo.png'],
        originalFileNames: ['ieee-logo-vector.png'],
        needsDesignHelp: false,
      },
      mockup: {
        previewImageUrl: '/uploads/demo-mockup-tshirt.png',
        productType: 'tshirt',
        printPosition: 'chest',
        placement: { x: 120, y: 150, scale: 0.85, rotation: 0 },
      },
      contactInfo: {
        name: demoCustomer.name,
        phone: demoCustomer.phone,
        email: demoCustomer.email,
        preferredContactMethod: 'whatsapp',
      },
      desiredDate: '2026-11-01',
      receiptMethod: 'pickup',
      deliveryAddress: 'أسوان - شارع الكورنيش',
      status: 'pending',
      statusHistory: [
        {
          status: 'pending',
          note: 'تم إرسال الطلب بنجاح وبانتظار مراجعة صاحب العمل',
          changedBy: demoCustomer._id,
          changedAt: new Date(),
        },
      ],
      readinessScore: 100,
    });

    // 6. Seed Sample Message
    await Message.create({
      request: sampleRequest._id,
      sender: demoCustomer._id,
      senderRole: 'customer',
      senderName: demoCustomer.name,
      content: 'مرحباً، تم إرفاق ملف اللوجو بدقة عالية بصيغة PNG شفافة، هل الموعد مناسب لكم؟',
    });

    // 7. Seed Sample Enquiry
    console.log('💬 Seeding sample customer enquiries...');
    await Enquiry.create({
      name: 'كريم عثمان',
      phone: '01223344556',
      email: 'karim@example.com',
      subject: 'خصم كميات لأسرة طلابية في جامعة أسوان',
      serviceCategory: 'clothing',
      message: 'السلام عليكم، نحتاج طباعة حوالي 80 هودي مع تطريز لوجو للنشاط الطلابي، هل يوجد خصم خاص للكميات وكيف يتم سداد العربون؟',
      status: 'new',
    });

    // 8. Seed Settings
    console.log('⚙️ Seeding business settings...');
    await Setting.create({
      whatsapp: '01116891025',
      phone: '01116891025',
      email: 'contact@userseif.com',
      address: 'أسوان، جمهورية مصر العربية',
      businessName: 'يوزرسيف للطباعة والتخصيص (UserSeif)',
      aboutText:
        'يوزرسيف علامة رائدة في خدمات الطباعة والتخصيص في أسوان. نحول أفكارك وتصاميمك إلى منتجات مطبوعة واقعية بأعلى جودة وخامات مضمونة مع تجربة استلام لا تُنسى.',
      socialLinks: {
        facebook: 'https://facebook.com/userseif',
        instagram: 'https://instagram.com/userseif',
        tiktok: '',
      },
      faqs: [
        {
          question: 'كيف تتم عملية الطلب في يوزرسيف؟',
          answer:
            'تختار المنتج وتحدد المقاسات والكميات وترفع تصميمك أو تطلب مساعدة في إعداده، ثم ترسل الطلب ليقوم صاحب العمل بمراجعته وتحديد السعر وموعد الاستلام والتواصل معك عبر واتساب.',
        },
        {
          question: 'ما هي مواعيد وطرق الاستلام المتاحة في أسوان؟',
          answer:
            'نوفر الاستلام المباشر من مقرنا في أسوان، كما يتوفر خيار التوصيل للمنازل والمقرات داخل مدينة أسوان والمناطق المجاورة.',
        },
        {
          question: 'هل يمكنني طلب مساعدة في تجهيز التصميم؟',
          answer:
            'نعم بكل تأكيد! يمكنك تحديد خيار (أحتاج مساعدة في التصميم) أثناء إرسال الطلب، وسيتواصل معك فريق التصميم لتجهيز فكرتك.',
        },
      ],
      policies: {
        privacy: 'نلتزم بالحفاظ التام على خصوصية وسرية تصاميم وبيانات عملائنا وملفاتهم.',
        ordering:
          'كل طلب يتم مراجعته بدقة من صاحب العمل للتأكد من جودة الخامات ومناسبة دقة التصميم قبل البدء في الطباعة.',
        quality:
          'نستخدم أحباراً وخامات أصلية مقاومة للغسيل مع ضمان جودة المنتج النهائي.',
      },
    });

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seedDatabase();
