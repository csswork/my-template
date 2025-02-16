import express from 'express';
import { userController } from '../../web/controllers/user.js';
import { auth, authorize } from '../../middleware/auth.js';
import { validateLogin, validate } from '../../middleware/validate.js';


const router = express.Router();

// Public routes
router.post('/login', validateLogin, validate, userController.login);
router.get('/me', auth, authorize('admin'), userController.getUserByToken);
router.get('/profile', auth, authorize('admin'), userController.getProfile);
router.post('/profile', auth, authorize('admin'), userController.updateProfile);
router.post('/logout', auth, authorize('admin'), userController.logout);

export default router;