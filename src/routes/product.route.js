const router = require('express').Router();
const { getProducts, getProductById, postProduct, putProduct, deleteProduct } = require('../controllers/product.controller.js');

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', postProduct);
router.put('/products/:id', putProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;