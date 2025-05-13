import express from 'express';
import {
  getFeedbacks,
  createFeedback,
  deleteFeedback,
} from '../controllers/feedbackController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, authorizeRoles('admin'), getFeedbacks);
router.post('/', protect, createFeedback);
router.delete('/:id', protect, authorizeRoles('admin'), deleteFeedback);

export default router;
