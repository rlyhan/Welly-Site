const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get current weather

router.get('/weather', (req, res) => {
  return axios.get(
    `http://api.airvisual.com/v2/city?city=Wellington%20City&state=Wellington&country=New%20Zealand&key=${process.env.REACT_APP_AIRVISUAL_KEY}`
  ).then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.status(500).json({})
  })
})

module.exports = router
