import express from 'express';
import { getInventory, updateStock } from '../controllers/inventoryController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, authorizeRoles('admin'), getInventory);
router.put('/:productId', protect, authorizeRoles('admin'), updateStock);

export default router;
