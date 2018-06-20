const { expect } = require('chai')
const db = require('../../server/db/index')
const Problem = db.model('problem')

describe('▒▒▒ Backend tests ▒▒▒', () => {
  beforeEach('Synchronize and clear database', () => db.sync({ force : true }));

  after('Synchronize and clear database', () => db.sync({ force : true }));

  describe('Sequelize models', function () {

    describe('Problem Model', () => {

      describe('validations', () => {

        // *Assertion translation*:
        // The `name`, 'description', 'difficulty', 'tags', 'hints', 'solved', 'userSubmission', 'points' column should be a required field.
        it('require data', async () => {
          const problem = Problem.build();
          return problem.validate()
            .then(() => { throw new Error('Promise should have rejected'); })
            .catch(err => {
              expect(err).to.exist;
              expect(err).to.be.an('error');
            });
        });
      });

    });
  })
})