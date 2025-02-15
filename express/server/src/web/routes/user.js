import express from 'express';
import { body } from 'express-validator';
import { userController } from '../controllers/user.js';
import { auth, authorize } from '../../middleware/auth.js';
const validateRegister = [
  body('username').notEmpty().trim(),
  body('password').isLength({ min: 6 }),
  body('email').optional().isEmail(),
  body('phone').optional().matches(/^\+?[1-9]\d{1,14}$/),
  body('wechat').optional().trim(),
  body().custom((value) => {
    if (!value.email && !value.phone && !value.wechat) {
      throw new Error('At least one contact method (email, phone, or wechat) is required');
    }
    return true;
  })
];

const validateLogin = [
  body('username').notEmpty().trim(),
  body('password').notEmpty()
];

const router = express.Router();

// Public routes
router.post('/register', validateRegister, userController.register);
router.post('/login', validateLogin, userController.login);

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


// import express from 'express';
// import { body } from 'express-validator';
// import { userController } from '../../controllers/user.js';

// const router = express.Router();

// // Validation middleware
// const validateRegister = [
//   body('username').notEmpty().trim(),
//   body('password').isLength({ min: 6 }),
//   body('email').optional().isEmail(),
//   body('phone').optional().matches(/^\+?[1-9]\d{1,14}$/),
//   body('wechat').optional().trim(),
//   body().custom((value) => {
//     if (!value.email && !value.phone && !value.wechat) {
//       throw new Error('At least one contact method (email, phone, or wechat) is required');
//     }
//     return true;
//   })
// ];

// const validateLogin = [
//   body('username').notEmpty().trim(),
//   body('password').notEmpty()
// ];

// // Routes
// router.post('/register', validateRegister, userController.register);
// router.post('/login', validateLogin, userController.login);
// router.get('/profile', userController.getProfile);
// router.post('/profile', userController.updateProfile);
// // get user data
// router.get('/user', userController.getUser);

// export default router;