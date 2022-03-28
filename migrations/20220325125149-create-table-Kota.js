'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Kota', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nama: {
        type: Sequelize.STRING(255)
      },
      id_provinsi : {
        type: Sequelize.INTEGER(11)
      }
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('Kota');

  }
};
