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
    `docker run eval:latest node evalFunc "${req.body.code}"`,
    (error, stdout, stderr) => {
      if (error) console.log(error)
      console.log('stdout in route:', stdout)
      res.send(stdout)
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
