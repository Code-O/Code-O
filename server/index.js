const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({ db })
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')

const Problem = require('./db/models/problem');
const Bluebird = require('bluebird')
const { User } = require('../server/db/models')

module.exports = app

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  db.models.user
    .findById(id)
    .then(user => done(null, user))
    .catch(done)
)

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

// const syncDb = () => db.sync()

var problems = [
  {
    name: "Sum of positive",
    description: "You get an array of numbers, return the sum of all of the positives ones. example [1,-4,7,12] => 1 + 7 + 12 = 20, note: if there is nothing to sum, the sum is default to 0.",
    difficulty: "easy",
    tags: "arrays",
    hints: "Try array loops or method",
    solved: false,
    userSubmission: "",
    points: 1
  },
  {
    name: "Pizza Payments",
    description: "Kate and Michael want to buy a pizza and share it. Depending on the price of the pizza, they are going to divide the costs:1.If the pizza is less than €5,- Michael invites Kate, so Michael pays the full price. 2.Otherwise Kate will contribute 1 / 3 of the price, but no more than €10(she's broke :-) and Michael pays the rest. How much is Michael going to pay? Calculate the amount with two decimals, if necessary.",
    difficulty: "easy",
    tags: "fundamentals",
    hints: "Try array loops or method",
    solved: false,
    userSubmission: "",
    points: 1
  },
  {
    name: "Find the unique number",
    description: "There is an array with some numbers. All numbers are equal except for one. Try to find it! findUniq([1, 1, 1, 2, 1, 1]) === 2 findUniq([0, 0, 0.55, 0, 0]) === 0.55 It's guaranteed that array contains more than 3 numbers.",
    difficulty: "medium",
    tags: "fundamentals",
    hints: "The tests contain some very huge arrays, so think about performance.",
    solved: false,
    userSubmission: "",
    points: 2
  },
  {
    name: "Simple Pig Latin",
    description: "Move the first letter of each word to the end of it, then add 'ay' to the end of the word. Leave punctuation marks untouched. Examples: pigIt('Pig latin is cool'); pigIt('Hello world !');.",
    difficulty: "hard",
    tags: "algorithms",
    hints: "",
    solved: false,
    userSubmission: "",
    points: 3
  }
]

const syncDb = () => db.sync({ force: true })
  .then(() => {
    return Bluebird.map(problems, problem => {
      return Problem.create(problem)
    })
      .then(() => {
        return User.create({ email: 'admin@admin.com', password: 'admin', isAdmin: true })
      })
  })

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  sessionStore
    .sync()
    .then(syncDb)
    .then(createApp)
    .then(startListening)
} else {
  createApp()
}
