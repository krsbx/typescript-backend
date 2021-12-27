const { encrypt } = require('../utils/encryption');

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@admin.com',
        firstName: "I'm",
        lastName: 'Admin',
        role: 'admin',
        password: await encrypt('admin'),
      },
    ]);
  },

  down: async (queryInterface: any, Sequelize: any) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
