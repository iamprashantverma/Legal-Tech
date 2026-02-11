'use strict';
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');
class AuditLog extends Model {}

AuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    actorId: DataTypes.INTEGER,
    actorRole: DataTypes.STRING,
    actorType: DataTypes.STRING,

    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    entityType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    entityId: DataTypes.INTEGER,
    requestId: DataTypes.STRING,
    beforeState: DataTypes.JSON,
    afterState: DataTypes.JSON,

    metadata: DataTypes.JSON,
  },
  {
    sequelize,
    tableName: 'audit_logs',
    modelName: 'AuditLog',
    timestamps: false,
    underscored: true,
  }
);

module.exports = AuditLog;
