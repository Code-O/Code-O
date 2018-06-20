/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../server/db/db')
const app = require('../../server/index')
const Problem = db.model('problem')

describe('Problem routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/problems', () => {

    beforeEach(() => {
      return Problem.create({
        name: 'codysProblem',
        description: 'cody',
        difficulty : 'easy',
        tags: 'tags',
        hints : 'hint',
        solved: false,
        userSubmission: 'Submission',
        points: 1,
      })
    })

    it('renders problems in the database', () => {
      return request(app)
        .get('/api/problems')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal('codysProblem')
        })
    })
  }) 
}) 
