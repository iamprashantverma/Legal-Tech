"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {

    
    const plainPassword = process.env.SEED_USER_PASSWORD;
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Client User",
          email: "client@example.com",
          password: hashedPassword,
          role: "CLIENT",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Admin User",
          email: "admin@example.com",
          password: hashedPassword,
          role: "ADMIN",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Lawyer User",
          email: "lawyer@example.com",
          password: hashedPassword,
          role: "LAWYER",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Legal Manager",
          email: "legalmanager@example.com",
          password: hashedPassword,
          role: "LEGAL_MANAGER",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Paralegal User",
          email: "paralegal@example.com",
          password: hashedPassword,
          role: "PARALEGAL",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "users",
      {
        email: [
          "client@example.com",
          "admin@example.com",
          "lawyer@example.com",
          "legalmanager@example.com",
          "paralegal@example.com",
        ],
      },
      {}
    );
  },
};
