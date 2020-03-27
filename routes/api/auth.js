const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')

const User = require('../../models/User')

let facebookUser = {}

router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

router.put('/user/:id/favourite/add', (req, res) => {
  const { id } = req.params

  User.updateOne({_id: id}, {$push: {favouritePlaces: req.body}}, () => {
    User.findById(id)
      .select('-password')
      .then(user => res.json(user))
  })
})

router.put('/user/:id/favourite/delete', (req, res) => {
  const { id } = req.params

  User.updateOne({_id: id}, {$pull: {favouritePlaces: {yelpId: req.body.yelpId}} }, () => {
    User.findById(id)
      .select('-password')
      .then(user => res.json(user))
  })
})

router.post('/register', (req, res, next) => {
  const { email, username, password } = req.body

  if (!email || !username || !password) {
    return res.status(400).json({ msg: 'All fields required.'})
  }

  User.findOne({ email: email })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'User already exists' })

      const newUser = {
        username,
        email,
        password
      }

      User.create(newUser, (err, user) => {
        if (err) {
          return next(err)
        } else {
          jwt.sign({ id: user.id }, process.env.REACT_APP_JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err
            res.json({
              user: {
                id: user.id,
                username: user.username,
                email: user.email
              },
              token: token
            })
          })
        }
      })
  })
})

router.post('/login', (req, res, next) => {
  const { loginName, password } = req.body

  if (!loginName || !password) {
    return res.status(400).json({ msg: 'All fields required.'})
  }

  User.findOne({$or: [{ email: loginName }, { username: loginName }]})
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'User does not exist.' })

      bcrypt.compare(password, user.password)
        .then(match => {
          if(!match) return res.status(400).json({ msg: 'Invalid credentials.' })
          jwt.sign({ id: user.id }, process.env.REACT_APP_JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err
            res.json({
              user: {
                id: user.id,
                username: user.username,
                email: user.email,
                favouritePlaces: user.favouritePlaces,
              },
              token: token
            })
          })
        })
    })
})

router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/',
                                      session: false }),
  function (req, res) {
    facebookUser = req.user
    res.redirect(process.env.NODE_ENV === 'production' ? 'https://explore-welly.herokuapp.com/' : 'http://localhost:3000/')
  }
)

router.get('/facebook/success', function (req, res) {
  if (Object.keys(facebookUser).length > 0) {
    res.json(facebookUser)
  }
})

router.get('/logout', function (req, res) {
  facebookUser = {}
})

module.exports = router
