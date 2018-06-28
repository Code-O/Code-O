const router = require('express').Router()
const {exec} = require('child_process')
const {Problem, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Problem.findAll({include: {model: User}})
    .then(problems => res.json(problems))
    .catch(next)
})

router.post('/', (req, res, next) => {
  // exec(`docker run eval:latest "${req.body.code}"`, (error, stdout, stderr) => {
  exec(
    `node evalFunc.js '${req.body.code}'`,
    // `docker run eval:latest node evalFunc "${req.body.code}"`,
    (error, stdout, stderr) => {
      if (error) console.log(error)
      console.log('stdout in route@@@@@@@@:', stdout, 'END*******')
      res.send(
        stdout.split('\n').filter(i => {
          if (i.includes('mean')) return true
          if (i.includes('Winner')) return true
          if (i.includes('Compared')) return true
          if (i.includes('fast')) return true
        })
      )
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
    .then(problem => res.json(problem))
    .catch(next)
})
