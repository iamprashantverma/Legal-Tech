'use strict';

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class Intake extends Model {}

Intake.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: DataTypes.STRING(150),
    dob: DataTypes.DATEONLY,

    status: {
      type: DataTypes.ENUM(
        'PENDING',
        'APPROVED',
        'REJECTED',
        'IN_REVIEW'
      ),
      defaultValue: 'PENDING',
    },

    email: DataTypes.STRING(100),
    phoneNumber: DataTypes.STRING(20),
    address: DataTypes.STRING(255),

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },

    priority: {
      type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
      defaultValue: 'MEDIUM',
    },

    caseType: DataTypes.STRING(100),
    description: DataTypes.TEXT,

    uploadDocs: DataTypes.JSON,
    uploadId: DataTypes.JSON,

    approvedAt: DataTypes.DATE,
    rejectedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'intakes',
    modelName: 'Intake',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['status'] },
      { fields: ['priority'] },
    ],
  }
);

module.exports = Intake;
