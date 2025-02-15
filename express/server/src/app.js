import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import initDatabase from './utils/initdb.js';

dotenv.config();
// initDatabase()
//   .then(() => {
//     // ...existing code...
    
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch(error => {
//     console.error('Failed to initialize database:', error);
//     process.exit(1);
//   });
// import cmsRoutes from './cms/routes/posts';
// import path

// import authMiddleware from './middleware/auth';
// import postsRouter from './cms/routes/posts.js';
import userRouter from './web/routes/user.js';
import aiRouter from './web/routes/ai.js';

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5175',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// CMS
// app.use('/api/cms', authMiddleware.requireAdmin, cmsRoutes);
// app.use('/cms/api/', postsRouter);

// Web
app.use('/api/', aiRouter);
add.use('/api/', userRouter);
// app.use('/api/', webRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});