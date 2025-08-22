const router = require('express').Router();
const { getProducts } = require('../controllers/product.controller.js');

router.get('/products', getProducts);

module.exports = router;