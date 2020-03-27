const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const path = require('path')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

require('dotenv').config()

const User = require('./models/User')
const auth = require('./routes/api/auth')
const yelp = require('./routes/api/yelp')
const airvisual = require('./routes/api/airvisual')

// Use Cross Origin Resource Sharing
app.use(cors())

// Bodyparser Middleware
app.use(express.json())

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Passport Session
passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

// Use Passport Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' ?
                'https://explore-welly.herokuapp.com/auth/facebook/callback' : 'http://localhost:5000/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'picture']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({'facebook.id': profile.id}, function(err, user){
        if(err) return done
        if(user) {
          jwt.sign({ id: user.id }, process.env.REACT_APP_JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err

            var userObj = {
              user: {
                id: user.id,
                username: user.username,
                favouritePlaces: user.favouritePlaces
              },
              token: token
            }

            return done(null, userObj)
          })
        } else {
          const newUser = {
            "username": profile.displayName,
            "facebook.id": profile.id
          }

          User.create(newUser, (err, user) => {
            if (err) return done(err)
            jwt.sign({ id: user.id }, process.env.REACT_APP_JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
              if (err) throw err

              var userObj = {
                user: {
                  id: user.id,
                  username: user.username,
                  favouritePlaces: user.favouritePlaces
                },
                token: token
              }

              return done(null, userObj)
            })
          })
        }
      })
    })
  }
))

// Connect to Mongo
mongoose
  .connect(process.env.MONGO_URI, { // Adding new Mongo URL parser
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Use routes
app.use('/api/auth/', auth)
app.use('/api/yelp/', yelp)
app.use('/api/airvisual/', airvisual)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
