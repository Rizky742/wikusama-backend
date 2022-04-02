'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Biodata', {
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      nama_lengkap: {
        type: Sequelize.STRING(25)
      },
<<<<<<< HEAD
=======
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references : {
          model : "user",
          key : "user_id"
        }
      },
>>>>>>> 1dcd6603fb85be6fe71c25cfc0f18c94a5e76d96
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
