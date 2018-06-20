/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../server/db/db')
const app = require('../../server/index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/users', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        isAdmin: false,
      })
    })

    it('Secures route if user !== admin', () => {
      return request(app)
        .get('/api/users')
        .expect(403)
    })
  }) 
}) 
