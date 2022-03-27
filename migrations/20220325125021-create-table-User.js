'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      username: {
        type: Sequelize.STRING(26),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM,
        values: ['admin','wikusama']
      },
      foto_profile: {
        type: Sequelize.STRING(255),
      }
    });
    await queryInterface.addConstraint('User', {
      type: 'unique',
      fields: ['email'],
      name: 'UNIQUE_USERS_EMAIL'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};
