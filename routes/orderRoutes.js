const express = require('express');
const {addOrderItems, getOrderById} = require('../controllers/orderController');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addOrderItems);
router.post('/:id', protect, getOrderById);

module.exports = router;

