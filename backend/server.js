require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./utils/logger');

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`FATAL: Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    logger.info('MongoDB connected successfully');
    console.log('✅ Connected to MongoDB database');

    server.listen(PORT, () => {
      logger.info(`UserSeif Server running on port ${PORT}`);
      console.log(`🚀 UserSeif Backend Server running on http://localhost:${PORT}`);
      console.log(`📡 API Health Check available at http://localhost:${PORT}/api/v1/health`);
    });
  })
  .catch((err) => {
    logger.error(`MongoDB connection error: ${err.message}`, { error: err });
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      process.exit(0);
    });
  });
});

module.exports = server;
