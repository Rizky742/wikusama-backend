'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Biodata', {
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        unique: true,
      },
      nama_lengkap: {
        type: Sequelize.STRING(25)
      },
      angkatan: {
        type: Sequelize.CHAR(2),
      },
      jurusan : {
        type: Sequelize.ENUM,
        values: ['Elektronika Informatika', 'Teknik Informatika', 'Teknik Komputer dan Jaringan', 'Rekayasa Perangkat Lunak']
      },
      quotes: {
        type: Sequelize.TEXT,
      },
      last_position: {
        type: Sequelize.STRING(25),
      },
      phone_number: {
        type: Sequelize.STRING(30),
      },
      profession: {
        type: Sequelize.STRING(25),
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
