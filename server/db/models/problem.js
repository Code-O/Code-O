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
    allowNull: false
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
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  funcName: {
    type: Sequelize.STRING,
    allowNull: false,
   validate: {
     notEmpty: true
   }
  },
  optimalSolution: {
    type: Sequelize.TEXT
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
