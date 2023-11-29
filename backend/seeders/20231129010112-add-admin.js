'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      first_name: 'ITS ME',
      last_name: 'THE ADMIN',
      email: 'admin@example.com',
      role: 'admin',
      password_digest: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12),
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: 'admin@example.com'
    })
  }
}
;
