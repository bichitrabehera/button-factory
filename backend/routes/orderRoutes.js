import express from 'express';
import {
  getOrders,
  getUserOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, authorizeRoles('admin'), getOrders);
router.get('/myorders', protect, getUserOrders);
router.get('/:id', protect, getOrderById);
router.post('/', protect, createOrder);
router.put('/:id/status', protect, authorizeRoles('admin'), updateOrderStatus);
router.delete('/:id', protect, authorizeRoles('admin'), deleteOrder);

export default router;
