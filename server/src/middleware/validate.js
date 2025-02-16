import { body, validationResult } from 'express-validator';

// Validation rules
export const validateRegister = [
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

export const validateLogin = [
  body('username').notEmpty().trim(),
  body('password').notEmpty()
];

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};