'use strict';

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class IntakeReview extends Model {}

IntakeReview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    intakeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    lawyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'intake_reviews',
    modelName: 'IntakeReview',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['lawyer_id'] },
    ],
  }
);

module.exports = IntakeReview;
