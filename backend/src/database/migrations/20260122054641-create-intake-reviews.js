'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("intake_reviews", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      intakeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: "intakes", key: "id" },
        onDelete: "CASCADE",
      },

      lawyerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },

      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    await queryInterface.addIndex("intake_reviews", ["lawyerId"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("intake_reviews");
  },
};
