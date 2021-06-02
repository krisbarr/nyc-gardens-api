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
// const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { garden: { title: '', text: 'foo' } } -> { garden: { text: 'foo' } }
// const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })
//

// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.post('/comments', requireToken, (req, res, next) => {
  const commentData = req.body.comment
  const gardenId = commentData.gardenId
  req.body.comment.owner = req.user.id
  console.log(gardenId)
  Garden.findById(gardenId)
    .then(handle404)
    .then(garden => {
      garden.comments.push(commentData)
      return garden.save()
    })
    .then(garden => res.status(201).json({ garden }))
})

router.delete('/comments/:commentId', requireToken, (req, res, next) => {
  const commentId = req.params.commentId
  const gardenId = req.body.comment.gardenId
  req.body.comment.owner = req.user.id
  Garden.findById(gardenId)
    .then(handle404)
    .then(garden => {
      garden.comments.id(commentId).remove()

      return garden.save()
    })
    .then(() => res.sendStatus(204))
})

router.patch('/comments/:commentId', requireToken, (req, res, next) => {
  const commentId = req.params.commentId
  const commentData = req.body.comment
  const gardenId = commentData.gardenId

  Garden.findById(gardenId)
    .then(handle404)
    .then(garden => {
      const comment = garden.comments.id(commentId)

      comment.set(commentData)

      return garden.save()
    })
    .then(() => res.sendStatus(204))
})

module.exports = router
