'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("intakes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name: Sequelize.STRING(150),
      dob: Sequelize.DATEONLY,

      status: {
        type: Sequelize.ENUM("PENDING", "APPROVED", "REJECTED", "IN_REVIEW"),
        allowNull: false,
        defaultValue: "PENDING",
      },

      email: Sequelize.STRING(100),
      phoneNumber: Sequelize.STRING(20),
      address: Sequelize.STRING(255),

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      priority: {
        type: Sequelize.ENUM("LOW", "MEDIUM", "HIGH"),
        defaultValue: "MEDIUM",
      },

      caseType: Sequelize.STRING(100),
      description: Sequelize.TEXT,
      uploadDocs: Sequelize.JSON,
      uploadId: Sequelize.JSON,

      approvedAt: Sequelize.DATE,
      rejectedAt: Sequelize.DATE,

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    await queryInterface.addIndex("intakes", ["userId"]);
    await queryInterface.addIndex("intakes", ["status"]);
    await queryInterface.addIndex("intakes", ["priority"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("intakes");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_intakes_status";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_intakes_priority";'
    );
  },
};
