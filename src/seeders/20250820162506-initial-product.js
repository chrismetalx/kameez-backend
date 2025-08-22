'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'T-shirt',
        price: 10.50,
        description: 'Shirt original',
        size: 'M',
        image: '',
        stock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'T-shirt Black',
        price: 16.50,
        description: 'Shirt original black',
        size: 'S',
        image: '',
        stock: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'T-shirt Red',
        price: 50.50,
        description: 'Shirt original Red',
        size: 'XS',
        image: '',
        stock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'T-shirt Blue',
        price: 10.50,
        description: 'Shirt original Blue',
        size: 'L',
        image: '',
        stock: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'T-shirt Brown',
        price: 25.40,
        description: 'Shirt original Brown',
        size: 'XL',
        image: '',
        stock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};