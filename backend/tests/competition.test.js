require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user.model');
const Request = require('../models/request.model');
const Service = require('../models/service.model');
const Enquiry = require('../models/enquiry.model');

jest.setTimeout(45000);

describe('IEEE Brand & Build Competition Comprehensive Quality & Criteria Tests', () => {
  let adminToken;
  let customerAToken;
  let customerBToken;
  let customerAId;
  let customerBId;
  let sampleService;

  beforeAll(async () => {
    // Connect to database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 30000,
      });
    }

    // Clear and create test users
    await User.deleteMany({
      email: {
        $in: [
          'test_admin@userseif.com',
          'test_cust_a@userseif.com',
          'test_cust_b@userseif.com',
        ],
      },
    });
    await Request.deleteMany({
      'contactInfo.email': {
        $in: ['test_cust_a@userseif.com', 'test_cust_b@userseif.com'],
      },
    });
    await Enquiry.deleteMany({ email: 'test_enquirer@example.com' });

    // 1. Create Admin
    const admin = await User.create({
      name: 'مسؤول يوزرسيف',
      email: 'test_admin@userseif.com',
      phone: '01116891025',
      password: 'Password123!',
      role: 'admin',
    });

    // 2. Create Customer A
    const custA = await User.create({
      name: 'عميل أ (Customer A)',
      email: 'test_cust_a@userseif.com',
      phone: '01011112222',
      password: 'Password123!',
      role: 'customer',
    });
    customerAId = custA._id;

    // 3. Create Customer B
    const custB = await User.create({
      name: 'عميل ب (Customer B)',
      email: 'test_cust_b@userseif.com',
      phone: '01033334444',
      password: 'Password123!',
      role: 'customer',
    });
    customerBId = custB._id;

    // Login each user to get JWT tokens
    const adminLogin = await request(app).post('/api/v1/auth/login').send({
      email: 'test_admin@userseif.com',
      password: 'Password123!',
    });
    adminToken = adminLogin.body.data.token;

    const custALogin = await request(app).post('/api/v1/auth/login').send({
      email: 'test_cust_a@userseif.com',
      password: 'Password123!',
    });
    customerAToken = custALogin.body.data.token;

    const custBLogin = await request(app).post('/api/v1/auth/login').send({
      email: 'test_cust_b@userseif.com',
      password: 'Password123!',
    });
    customerBToken = custBLogin.body.data.token;

    sampleService = await Service.findOne();
  });

  afterAll(async () => {
    try {
      await User.deleteMany({
        email: {
          $in: [
            'test_admin@userseif.com',
            'test_cust_a@userseif.com',
            'test_cust_b@userseif.com',
          ],
        },
      });
      await Request.deleteMany({
        'contactInfo.email': {
          $in: ['test_cust_a@userseif.com', 'test_cust_b@userseif.com'],
        },
      });
      await Enquiry.deleteMany({ email: 'test_enquirer@example.com' });
      await mongoose.connection.close();
    } catch (e) {
      // ignore
    }
  });

  // -------------------------------------------------------------
  // Test 1: A complete request reaches admin (Page 09)
  // -------------------------------------------------------------
  let createdRequestId;
  let createdRequestNumber;
  test('Criterion 1: A complete request reaches admin dashboard with all specifications intact', async () => {
    const payload = {
      category: 'clothing',
      quantity: 5,
      serviceTitle: 'تيشيرتات قطن فاخرة',
      description: 'تيشيرتات لمؤتمر IEEE مع طباعة على الصدر والظهر',
      specifications: {
        sizeBreakdown: { S: 1, M: 2, L: 2 },
        color: 'أسود',
        printPosition: 'الصدر والظهر',
        material: 'قطن 100%',
      },
      artwork: {
        files: ['/uploads/test-design-logo.png'],
        needsDesignHelp: false,
      },
      mockup: {
        previewImageUrl: '/uploads/mockup-preview.png',
        productType: 'tshirt',
        printPosition: 'chest',
        placement: { x: 100, y: 150, scale: 0.9, rotation: 0 },
      },
      contactInfo: {
        name: 'عميل أ (Customer A)',
        phone: '01011112222',
        email: 'test_cust_a@userseif.com',
        preferredContactMethod: 'whatsapp',
      },
      desiredDate: '2026-11-15',
      receiptMethod: 'pickup',
    };

    // Customer creates request
    const createRes = await request(app)
      .post('/api/v1/requests')
      .set('Authorization', `Bearer ${customerAToken}`)
      .send(payload);

    expect(createRes.status).toBe(201);
    expect(createRes.body.success).toBe(true);
    expect(createRes.body.data.request.requestNumber).toMatch(/^US-\d{4}-\d+/);
    expect(createRes.body.data.request.status).toBe('pending');
    expect(createRes.body.data.readiness.ready).toBe(true);
    expect(createRes.body.data.readiness.score).toBe(100);

    createdRequestId = createRes.body.data.request._id;
    createdRequestNumber = createRes.body.data.request.requestNumber;

    // Admin verifies request reached dashboard with populated messages
    const adminInspectRes = await request(app)
      .get(`/api/v1/admin/requests/${createdRequestId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(adminInspectRes.status).toBe(200);
    expect(adminInspectRes.body.success).toBe(true);
    const inspected = adminInspectRes.body.data.request;
    expect(inspected.quantity).toBe(5);
    expect(inspected.category).toBe('clothing');
    expect(inspected.specifications.color).toBe('أسود');
    expect(inspected.artwork.files).toContain('/uploads/test-design-logo.png');
    expect(inspected.mockup.placement.scale).toBe(0.9);
    expect(inspected.nextAction).toBeDefined();
  });

  // -------------------------------------------------------------
  // Test 2: Missing or inconsistent details are caught (Page 09)
  // -------------------------------------------------------------
  test('Criterion 2: Inconsistent size breakdown vs total quantity is caught', async () => {
    const inconsistentPayload = {
      category: 'clothing',
      quantity: 10,
      specifications: {
        // Sum is 1 + 2 = 3, but quantity is 10!
        sizeBreakdown: { S: 1, M: 2 },
        color: 'أبيض',
        printPosition: 'الصدر',
      },
      artwork: { files: ['/uploads/design.png'] },
      contactInfo: { name: 'فادي', phone: '01112223344' },
    };

    const res = await request(app)
      .post('/api/v1/requests/validate-readiness')
      .send(inconsistentPayload);

    expect(res.status).toBe(200);
    expect(res.body.data.ready).toBe(false);
    expect(res.body.data.missingFields).toContain('sizeBreakdown');

    const sizeCheck = res.body.data.checks.find((c) => c.field === 'sizeBreakdown');
    expect(sizeCheck.status).toBe('fail');
    expect(sizeCheck.message).toContain('لا يتطابق مع إجمالي الكمية');
  });

  test('Criterion 2: Missing print position for clothing is caught', async () => {
    const missingPositionPayload = {
      category: 'clothing',
      quantity: 5,
      specifications: {
        sizeBreakdown: { M: 5 },
        color: 'أزرق',
        // printPosition missing!
      },
      artwork: { files: ['/uploads/design.png'] },
      contactInfo: { name: 'عميل', phone: '01011112222' },
    };

    const res = await request(app)
      .post('/api/v1/requests/validate-readiness')
      .send(missingPositionPayload);

    expect(res.status).toBe(200);
    expect(res.body.data.ready).toBe(false);
    expect(res.body.data.missingFields).toContain('printPosition');
  });

  test('Criterion 2: Missing phone model for phone-cases is caught', async () => {
    const missingPhoneModelPayload = {
      category: 'phone-cases',
      quantity: 1,
      specifications: {
        // phoneModel missing!
      },
      artwork: { files: ['/uploads/design.png'] },
      contactInfo: { name: 'عميل', phone: '01011112222' },
    };

    const res = await request(app)
      .post('/api/v1/requests/validate-readiness')
      .send(missingPhoneModelPayload);

    expect(res.status).toBe(200);
    expect(res.body.data.ready).toBe(false);
    expect(res.body.data.missingFields).toContain('phoneModel');
  });

  // -------------------------------------------------------------
  // Test 3: Approval and rejection appear correctly for the customer (Page 09)
  // -------------------------------------------------------------
  test('Criterion 3: Approval decision appears correctly for customer with quotation & notes & nextAction', async () => {
    // Admin approves the request
    const decisionRes = await request(app)
      .patch(`/api/v1/admin/requests/${createdRequestId}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        decision: 'approved',
        approvalNotes: 'تمت مراجعة التصميم وجودته ممتازة للطباعة الحريرية',
        estimatedCost: 1100,
        estimatedDeliveryDate: '2026-11-10',
      });

    expect(decisionRes.status).toBe(200);
    expect(decisionRes.body.success).toBe(true);

    // Customer views the request
    const customerViewRes = await request(app)
      .get(`/api/v1/requests/${createdRequestId}`)
      .set('Authorization', `Bearer ${customerAToken}`);

    expect(customerViewRes.status).toBe(200);
    const reqData = customerViewRes.body.data.request;
    expect(reqData.status).toBe('approved');
    expect(reqData.adminFeedback.decision).toBe('approved');
    expect(reqData.adminFeedback.approvalNotes).toBe(
      'تمت مراجعة التصميم وجودته ممتازة للطباعة الحريرية'
    );
    expect(reqData.adminFeedback.estimatedCost).toBe(1100);
    expect(reqData.nextAction).toContain('الموافقة');
  });

  test('Criterion 3: Rejection decision appears correctly for customer with rejection reason', async () => {
    // Create another request to test rejection
    const newReq = await Request.create({
      requestNumber: 'US-2026-9999',
      user: customerAId,
      category: 'mugs',
      quantity: 2,
      contactInfo: { name: 'Customer A', phone: '01011112222' },
      status: 'pending',
    });

    // Admin rejects request with reason
    const rejectRes = await request(app)
      .patch(`/api/v1/admin/requests/${newReq._id}/decision`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        decision: 'rejected',
        rejectionReason: 'التصميم المرفق دقة البيكسل فيه منخفضة جداً ولا يصلح للطباعة الحرارية',
      });

    expect(rejectRes.status).toBe(200);

    // Customer views rejected request
    const customerViewRes = await request(app)
      .get(`/api/v1/requests/${newReq._id}`)
      .set('Authorization', `Bearer ${customerAToken}`);

    expect(customerViewRes.status).toBe(200);
    const reqData = customerViewRes.body.data.request;
    expect(reqData.status).toBe('rejected');
    expect(reqData.adminFeedback.decision).toBe('rejected');
    expect(reqData.adminFeedback.rejectionReason).toBe(
      'التصميم المرفق دقة البيكسل فيه منخفضة جداً ولا يصلح للطباعة الحرارية'
    );
    expect(reqData.nextAction).toContain('رفض');
  });

  // -------------------------------------------------------------
  // Test 4: Customer files and request access stay private (Page 09)
  // -------------------------------------------------------------
  test('Criterion 4: Customer B cannot view Customer A private request (403 Forbidden)', async () => {
    const unauthorizedAccessRes = await request(app)
      .get(`/api/v1/requests/${createdRequestId}`)
      .set('Authorization', `Bearer ${customerBToken}`);

    expect(unauthorizedAccessRes.status).toBe(403);
    expect(unauthorizedAccessRes.body.success).toBe(false);
    expect(unauthorizedAccessRes.body.message).toContain('غير مصرح لك');
  });

  test('Criterion 4: Unauthenticated guest cannot view private request (401 Unauthorized)', async () => {
    const guestAccessRes = await request(app).get(`/api/v1/requests/${createdRequestId}`);

    expect(guestAccessRes.status).toBe(401);
    expect(guestAccessRes.body.success).toBe(false);
  });

  test('Criterion 4: Admin has legitimate access to inspect any request', async () => {
    const adminAccessRes = await request(app)
      .get(`/api/v1/requests/${createdRequestId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(adminAccessRes.status).toBe(200);
    expect(adminAccessRes.body.success).toBe(true);
  });

  test('Criterion 4: Guest Tracking endpoint verifies Phone matching to protect private request', async () => {
    // 1. Correct requestNumber + correct phone -> 200 OK
    const validTrackRes = await request(app).post('/api/v1/requests/track').send({
      requestNumber: createdRequestNumber,
      phone: '01011112222',
    });
    expect(validTrackRes.status).toBe(200);
    expect(validTrackRes.body.success).toBe(true);
    expect(validTrackRes.body.data.tracking.status).toBe('approved');
    expect(validTrackRes.body.data.tracking.nextAction).toBeDefined();

    // 2. Correct requestNumber + WRONG phone -> 403 Forbidden (Privacy protected)
    const wrongPhoneTrackRes = await request(app).post('/api/v1/requests/track').send({
      requestNumber: createdRequestNumber,
      phone: '01099998888',
    });
    expect(wrongPhoneTrackRes.status).toBe(403);
    expect(wrongPhoneTrackRes.body.success).toBe(false);
    expect(wrongPhoneTrackRes.body.message).toContain('حماية خصوصية العميل');
  });

  // -------------------------------------------------------------
  // Test 5: General Enquiries Route (Page 04 requirement)
  // -------------------------------------------------------------
  test('Enquiries: Visitor can submit enquiry without ordering, and admin can review', async () => {
    const enquiryPayload = {
      name: 'طارق علي',
      phone: '01098765432',
      email: 'test_enquirer@example.com',
      subject: 'طلب عرض سعر لكمية تيشيرتات',
      serviceCategory: 'clothing',
      message: 'نود الاستفسار عن إمكانية طباعة 150 تيشيرت لمؤتمر بأسوان وما هي مدة التنفيذ؟',
    };

    const submitRes = await request(app).post('/api/v1/enquiries').send(enquiryPayload);
    expect(submitRes.status).toBe(201);
    expect(submitRes.body.success).toBe(true);
    const enquiryId = submitRes.body.data.enquiry._id;

    // Admin lists enquiries
    const adminListRes = await request(app)
      .get('/api/v1/enquiries')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(adminListRes.status).toBe(200);
    expect(adminListRes.body.data.enquiries.length).toBeGreaterThan(0);

    // Admin updates status
    const updateRes = await request(app)
      .patch(`/api/v1/enquiries/${enquiryId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'contacted', adminNotes: 'تم التواصل هاتفياً وتقديم عرض السعر' });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.data.enquiry.status).toBe('contacted');
  });

  // -------------------------------------------------------------
  // Test 6: Mockup Templates Canvas API
  // -------------------------------------------------------------
  test('Mockup: Templates endpoint provides product canvas dimensions and printable areas', async () => {
    const res = await request(app).get('/api/v1/services/mockup-templates');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.templates.clothing).toBeDefined();
    expect(res.body.data.templates.clothing.views[0].printableArea).toBeDefined();
    expect(res.body.data.templates.mugs).toBeDefined();
    expect(res.body.data.templates.caps).toBeDefined();
  });
});
