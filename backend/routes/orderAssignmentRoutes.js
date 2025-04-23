// routes/orderAssignmentRoutes.js
import express from 'express';
import {
  assignOrder,
  autoAssignOrders,
  getAssignmentAnalytics,
  manualAssignOrder
} from '../controllers/orderAssignmentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.post('/auto-assign/:orderId', assignOrder);
router.post('/auto-assign-all', admin, autoAssignOrders);
router.get('/analytics', getAssignmentAnalytics);
router.post('/manual-assign', admin, manualAssignOrder);

export default router;