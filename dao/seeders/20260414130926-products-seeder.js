'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Products', [

      {
        name: 'iPhone 14 Pro',
        price: 129999,
        stock: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy S23',
        price: 74999,
        stock: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'OnePlus 11 5G',
        price: 56999,
        stock: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nothing Phone 2',
        price: 44999,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Google Pixel 7',
        price: 59999,
        stock: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'iQOO Neo 7',
        price: 29999,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Realme GT 2',
        price: 34999,
        stock: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Redmi Note 12 Pro',
        price: 23999,
        stock: 18,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Moto Edge 40',
        price: 27999,
        stock: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vivo V29 Pro',
        price: 39999,
        stock: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};