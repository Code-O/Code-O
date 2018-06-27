const Sequelize = require('sequelize')
const db = require('../db')

const Problem = db.define('problem', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: null
  },
  difficulty: {
    type: Sequelize.ENUM('easy', 'medium', 'hard'),
    allowNull: false
  },
  hints: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  solved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  userSubmission: {
    type: Sequelize.TEXT
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  funcName: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Problem

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
