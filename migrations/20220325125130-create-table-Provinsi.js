'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Provinsi', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nama: {
        type: Sequelize.STRING(30)
      }
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('Provinsi');

  }
};
