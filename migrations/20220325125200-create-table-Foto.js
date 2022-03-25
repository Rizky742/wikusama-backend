'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Foto', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      path: {
        type: Sequelize.STRING(255)
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      alamat: {
        type: Sequelize.STRING(255)
      },
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('Foto');

  }
};
