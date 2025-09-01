const { Product } = require('../models');
const { UniqueConstraintError } = require('sequelize');

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({
      status: 200,
      message: 'Products retrieve successfully.',
      data: products
    });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: `Product with ID ${id} not found.`
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Product retrieve successfully.',
      data: product
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};

const postProduct = async (req, res) => {
  try {
    const { name, price, description, size, image, stock } = req.body;
    const trimmedName = name.trim();
    let cleanedImage = image;

    if (!name || !price || !description || !size || !image) {
      return res.status(404).json({
        status: 404,
        message: `All fields are required.`
      });
    }

    if (image.includes('data:')) {
      cleanedImage = image.split(' ')[0].trim();
    }

    const createProduct = await Product.create(
      {
        name: trimmedName,
        price,
        description,
        size,
        image: cleanedImage,
        stock
      }
    );

    res.status(200).json({
      status: 200,
      message: 'Product created successfully.',
      data: createProduct
    });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({ message: `The product could not be created because one with that name already exists.` });
    } else {
      return res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
};

const putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, size, image, stock } = req.body;
    const trimmedName = name.trim();
    let cleanedImage = image;

    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: `Product with ID ${id} not found.`
      });
    }

    if (!name || !price || !description || !size) {
      return res.status(404).json({
        status: 404,
        message: `All fields are required.`
      });
    }

    if (image.includes('data:')) {
      cleanedImage = image.split(' ')[0].trim();
    }

    const updateProduct = await Product.update(
      {
        name: trimmedName,
        price,
        description,
        size,
        image: cleanedImage,
        stock
      },
      {
        where: {
          id
        }
      }
    );

    res.status(200).json({
      status: 200,
      message: 'Product updated successfully.',
      data: updateProduct
    });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({ message: `The product could not be updated because one with that name already exists.` });
    } else {
      return res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: `Product with ID ${id} not found.`
      });
    }

    const destroyProduct = await Product.destroy(
      {
        where: {
          id
        }
      }
    );

    res.status(200).json({
      status: 200,
      message: 'Product deleted successfully.',
      data: destroyProduct
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};

module.exports = {
  getProducts: getProducts,
  getProductById: getProductById,
  postProduct: postProduct,
  putProduct: putProduct,
  deleteProduct: deleteProduct
};