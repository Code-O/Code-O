const router = require('express').Router()
const { Problem, User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Problem.findAll({ include: { model: User } })
        .then(problems => res.json(problems))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Problem.create(req.body)
        .then(problem => res.json(problem))
        .catch(next)
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