import express from 'express';
import { userController } from '../controllers/user.js';
import { auth, authorize } from '../../middleware/auth.js';
import { validateRegister, validateLogin, validate } from '../controllers/validate.js';


const router = express.Router();

// Public routes
router.post('/register', validateRegister, validate, userController.register);
router.post('/login', validateLogin, validate, userController.login);

// Protected routes for all authenticated users
router.get('/me', auth, userController.getUserByToken);
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

// Admin only routes
// router.get('/users', auth, authorize('admin'), userController.getAllUsers);

// Editor and admin routes
// router.post('/posts', auth, authorize('editor', 'admin'), userController.createPost);

// Subscriber and above routes
// router.get('/premium-content', auth, authorize('subscriber', 'editor', 'admin'), userController.getPremiumContent);

export default router;