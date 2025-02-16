import express from 'express';
import { userController } from '../controllers/user.js';
import { auth, authorize } from '../../middleware/auth.js';

const router = express.Router();

router.get('/users', auth, authorize('admin'), userController.getUsers);
router.post('/users', auth, authorize('admin'), userController.createUser);
router.put('/users/:id', auth, authorize('admin'), userController.updateUser);
router.delete('/users/:id', auth, authorize('admin'), userController.deleteUser);

export default router;