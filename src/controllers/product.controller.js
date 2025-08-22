const { Product } = require('../models');

const getProducts = async (req, res) => {
  const products = await Product.findAll();

  res.status(200).json({
    status: 200,
    message: 'Products retrieve successfully',
    products
  });
};

module.exports = {
  getProducts: getProducts
};