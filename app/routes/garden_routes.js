const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for gardens
const Garden = require('../models/garden')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { garden: { title: '', text: 'foo' } } -> { garden: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })
//

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// GET gardens
/* router.get('/p78i-pat6.json', (req, res, next) => {
  Garden.find()
    .then(gardens => res.json({ gardens: gardens }))
    .catch(next)
}) */

/* router.get('/p78i-pat6.json', (req, res, next) => {
  let zipcode = req.query.zipcode
  let gardens = Garden.findAll({ zipcode: zipcode }).exec()
    .then(garden => res.json({ gardens: gardens }))
    .catch(next)
}) */
router.post('/gardens', requireToken, (req, res, next) => {
  const gardenData = req.body.garden
  req.body.garden.members = req.user.id
  Garden.create(gardenData)
    .then(garden => res.status(201).json({garden: garden}))
    .catch(next)
})

router.get('/gardens', (req, res, next) => {
  Garden.find()
    .then(gardens => {
      // `gardens` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return gardens.map(garden => garden.toObject())
    })
    // respond with status 200 and JSON of the gardens
    .then(gardens => res.status(200).json({ gardens: gardens }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

router.patch('/gardens/:id', requireToken, (req, res, next) => {
  const gardenId = req.params.id
  const userData = req.user.id
  Garden.findById(gardenId)
    .then(handle404)
    .then(garden => {
      garden.members.push(userData)
      return garden.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router