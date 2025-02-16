import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import initDatabase from './utils/initdb.js';
import { initJobs } from './jobs/index.js';

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

import cmsRoutes from './cms/routes/admin.js';
import typesRouter from './cms/routes/types.js';
import categoriesRouter from './cms/routes/categories.js';
// import postsRouter from './cms/routes/posts';


import userRouter from './web/routes/user.js';
import aiRouter from './web/routes/ai.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3001;
const app = express();

// Initialize response headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5175',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Initialize json parser
app.use(express.json());

// Initialize jobs
initJobs();

// CMS
app.use('/api/cms', cmsRoutes);
app.use('/api/cms', typesRouter);
app.use('/api/cms', categoriesRouter);
// app.use('/cms/api/', postsRouter);

// Web
app.use('/api/', aiRouter);
app.use('/api/', userRouter);
// app.use('/api/', webRoutes);

// Serve static assets in production
console.log('NODE_ENV:' + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the client dist directory
  // const clientDistPath = path.resolve(__dirname, '../../client/dist');
  // app.use(express.static(clientDistPath));
  
  app.use(express.static('dist'));
  
  // Handle CMS routes
  app.get('/cms/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/cms/index.html'));
  });

  // Handle main app routes
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});