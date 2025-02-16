import express from 'express';
import { categoryController } from '../controllers/categories.js';
import { auth, authorize } from '../../middleware/auth.js';

const router = express.Router();

router.get('/categories', auth, categoryController.getCategories);
router.post('/categories', auth, authorize('admin'), categoryController.createCategory);
router.put('/categories/:id', auth, authorize('admin'), categoryController.updateCategory);
router.delete('/categories/:id', auth, authorize('admin'), categoryController.deleteCategory);

export default router;