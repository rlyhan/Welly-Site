const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const path = require('path')
require('dotenv').config()

const auth = require('./routes/api/auth')
const yelp = require('./routes/api/yelp')
const airvisual = require('./routes/api/airvisual')

// Bodyparser Middleware
app.use(express.json())

// Use Cross Origin Resource Sharing
app.use(cors())

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
app.use('/api/auth', auth)
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
