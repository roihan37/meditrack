'use strict';
const fs = require('fs');
const { hash } = require('../helper/bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const dataUsers = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'))
     .map((el) => {
      el.password = hash(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
     })
     await queryInterface.bulkInsert('Users',dataUsers,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users',null,{})
  }
};
