const router = require('express').Router()
const {exec} = require('child_process')
const {Problem, User} = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  Problem.findById(req.params.id)
    .then(problem => res.json(problem))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Problem.findAll({include: {model: User}})
    .then(problems => res.json(problems))
    .catch(next)
})

router.post('/:id', (req, res, next) => {
  exec(
    `docker run evaldocker:latest node evalFunc "${req.body.code}"`,
    (error, stdout, stderr) => {
      if (error) console.log(error)
      console.log('RESULT FROM DOCKER: ', stdout)
      let data = stdout.split('\n').filter(i => {
        if (i.includes('mean')) return true
        if (i.includes('solution')) return true
        if (i.includes('Winner')) return true
        if (i.includes('Compared')) return true
        if (i.includes('fast')) return true
      })

      Problem.findById(req.params.id).then(prob => {
        prob.update({
          userSubmission: '' + [...data]
        })
        .then(updatedProblem => {
          
        })
      })
    }
  )
})

router.delete('/:id', (req, res, next) => {
  Problem.findById(req.params.id)
    .then(problem => res.json(problem))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Problem.findById(req.params.id)
    .then(problem => {
      problem.update()
    })
    .catch(next)
})
