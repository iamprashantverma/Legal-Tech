'use strict';

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    profileUrl: {
      type: DataTypes.STRING(400),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM(
        'CLIENT',
        'ADMIN',
        'LAWYER',
        'LEGAL_MANAGER',
        'PARALEGAL'
      ),
      defaultValue: 'CLIENT',
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    underscored: true,
    indexes: [
      { unique: true, fields: ['email'] },
      { fields: ['role'] },
    ],
  }
);

module.exports = User;
