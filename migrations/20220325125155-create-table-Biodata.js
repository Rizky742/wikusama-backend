'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Biodata', {
      nama_lengkap: {
        type: Sequelize.STRING(25)
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      angkatan: {
        type: Sequelize.CHAR(2),
      },
      jurusan : {
        type: Sequelize.ENUM,
        values: ['Elektronika Informatika', 'Teknik Informatika', 'Teknik Komputer dan Jaringan', 'Rekayasa Perangkat Lunak']
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
