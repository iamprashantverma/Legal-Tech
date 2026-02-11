'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cases", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      caseNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },

      caseType: Sequelize.STRING(100),

      priority: {
        type: Sequelize.ENUM("LOW", "MEDIUM", "HIGH"),
        defaultValue: "MEDIUM",
      },

      description: Sequelize.TEXT,

      intakeId: {
        type: Sequelize.INTEGER,
        references: { model: "intakes", key: "id" },
        onDelete: "CASCADE",
      },

      status: {
        type: Sequelize.ENUM(
          "DRAFT",
          "OPEN",
          "IN_REVIEW",
          "APPROVED",
          "CLOSED"
        ),
        defaultValue: "OPEN",
      },

      assignedTo: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onDelete: "SET NULL",
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    await queryInterface.addIndex("cases", ["caseNumber"], { unique: true });
    await queryInterface.addIndex("cases", ["intakeId"]);
    await queryInterface.addIndex("cases", ["assignedTo"]);
    await queryInterface.addIndex("cases", ["priority"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("cases");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_cases_priority";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_cases_status";'
    );
  },
};
