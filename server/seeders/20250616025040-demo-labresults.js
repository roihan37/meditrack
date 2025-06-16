'use strict';
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
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
     const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE email = 'roy@gmail.com';`
    );
    const userId = users[0][0].id;
     const rawData = JSON.parse(fs.readFileSync('./data/labResult.json', 'utf-8'))
     
     const dataLabResults = rawData.map((el) => ({
      id: uuidv4(),
      userId, // override yang dari file
      date: el.date,
      results: JSON.stringify(el.results),
      createdAt: new Date(),
      updatedAt: new Date()
    }));
     
     await queryInterface.bulkInsert('LabResults',dataLabResults,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('LabResults', null, {});
  }
};
