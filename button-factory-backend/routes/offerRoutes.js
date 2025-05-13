import express from 'express';
import {
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from '../controllers/offerController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getOffers);
router.post('/', protect, authorizeRoles('admin'), createOffer);
router.put('/:id', protect, authorizeRoles('admin'), updateOffer);
router.delete('/:id', protect, authorizeRoles('admin'), deleteOffer);

export default router;
