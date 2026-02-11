'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      profileUrl: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      role: {
        type: Sequelize.ENUM(
          "CLIENT",
          "ADMIN",
          "LAWYER",
          "LEGAL_MANAGER",
          "PARALEGAL"
        ),
        allowNull: false,
        defaultValue: "CLIENT",
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("users", ["email"], { unique: true });
    await queryInterface.addIndex("users", ["role"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_role";'
    );
  },
};
