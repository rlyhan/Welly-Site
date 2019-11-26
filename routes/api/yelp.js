const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', (req, res) => {
  return axios.get('https://api.yelp.com/v3/businesses/search', {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    },
    params: {
      latitude: -41.28664,
      longitude: 174.77557
    }
  }).then(data => {
    console.log(data)
    res.json(data);
  })
})

module.exports = router;
