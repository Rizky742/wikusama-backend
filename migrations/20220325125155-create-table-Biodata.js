'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Biodata', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      angkatan: {
        type: Sequelize.CHAR(2),
      },
      tahun_lulus: {
        type: Sequelize.STRING(11)
      },
      kota_asal: {
        type: Sequelize.INTEGER(11),
      },
      provinsi_asal: {
        type: Sequelize.INTEGER(11),
      },
      kota_domisili: {
        type: Sequelize.INTEGER(11),
      },
      provinsi_domisili: {
        type: Sequelize.INTEGER(11),
      }
    });

  },

  async down(queryInterface, Sequelize) {

     await queryInterface.dropTable('Biodata');
  }
};
