const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middlewares/error.handler');

// Route imports
const authRoutes = require('./routes/auth.routes');
const serviceRoutes = require('./routes/service.routes');
const portfolioRoutes = require('./routes/portfolio.routes');
const requestRoutes = require('./routes/request.routes');
const messageRoutes = require('./routes/message.routes');
const adminRoutes = require('./routes/admin.routes');
const settingRoutes = require('./routes/setting.routes');
const uploadRoutes = require('./routes/upload.routes');
const enquiryRoutes = require('./routes/enquiry.routes');

const app = express();

// Ensure uploads folder exists
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// Serve uploaded files statically
app.use(
  '/uploads',
  express.static(uploadsPath, {
    setHeaders: (res) => {
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    },
  })
);

// Helmet with relaxed CSP for local media
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  })
);

app.use(cookieParser());

// CORS configuration
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.GLOBAL_RATE_LIMIT_MAX) || 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'تم إرسال عدد كبير جداً من الطلبات، يرجى المحاولة لاحقاً',
  },
});

const apiRouter = express.Router();
apiRouter.use(globalLimiter);

// Health Check API
apiRouter.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    ok: true,
    service: 'UserSeif Printing & Personalization API',
    brand: 'يوزرسيف - أسوان',
    env: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/services', serviceRoutes);
apiRouter.use('/portfolio', portfolioRoutes);
apiRouter.use('/requests', requestRoutes);
apiRouter.use('/requests/:requestId/messages', messageRoutes);
apiRouter.use('/admin', adminRoutes);
apiRouter.use('/settings', settingRoutes);
apiRouter.use('/upload', uploadRoutes);
apiRouter.use('/enquiries', enquiryRoutes);

// Base API route
app.use('/api/v1', apiRouter);

// 404 Route Handler
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: 'المسار المطلوب غير موجود في واجهة برمجة التطبيقات (API Route Not Found)',
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
