import express from 'express';
import { typeController } from '../controllers/types.js';
import { auth, authorize } from '../../middleware/auth.js';

const router = express.Router();

router.get('/types', auth, typeController.getTypes);
router.post('/types', auth, authorize('admin'), typeController.createType);
router.put('/types/:id', auth, authorize('admin'), typeController.updateType);
router.delete('/types/:id', auth, authorize('admin'), typeController.deleteType);

export default router;