const express = require('express');
const {getProducts, getProductById} = require('../controllers/productController');
const router = express.Router();


router.get('/', getProducts);
router.get('/', getProductById);

module.exports = router;