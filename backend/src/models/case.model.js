'use strict';

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class Case extends Model {}

Case.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    caseNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    caseType: DataTypes.STRING(100),

    priority: {
      type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
      defaultValue: 'MEDIUM',
    },

    description: DataTypes.TEXT,

    intakeId: DataTypes.INTEGER,

    status: {
      type: DataTypes.ENUM(
        'DRAFT',
        'OPEN',
        'IN_REVIEW',
        'APPROVED',
        'CLOSED'
      ),
      defaultValue: 'OPEN',
    },

    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'cases',
    modelName: 'Case',
    timestamps: true,
    underscored: true,
    indexes: [
      { unique: true, fields: ['case_number'] },
      { fields: ['intake_id'] },
      { fields: ['assigned_to'] },
      { fields: ['priority'] },
    ],
  }
);

module.exports = Case;
