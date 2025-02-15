import path from 'path';
import express from 'express';
import cors from 'cors';
import cmsRoutes from './cms/routes/posts';

// import path


// import authMiddleware from './middleware/auth';
// import webRoutes from './web/routes/posts';

const app = express();
app.use(cors());
app.use(express.json());

// CMS 接口（需要管理员权限）
// app.use('/api/cms', authMiddleware.requireAdmin, cmsRoutes);
app.use('/api/cms', cmsRoutes);

// Web 公开接口
// app.use('/api/web', webRoutes);

// 前端静态文件托管（生产环境）
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