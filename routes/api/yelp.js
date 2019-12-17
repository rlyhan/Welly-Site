const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get popular places

router.get('/popular', (req, res) => {
  return axios.get('https://api.yelp.com/v3/businesses/search', {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    },
    params: {
      latitude: -41.28664,
      longitude: 174.77557
    }
  }).then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.status(500).json({})
  })
})

// Get places by search term

router.get('/search/:term', (req, res) => {
  return axios.get('https://api.yelp.com/v3/businesses/search', {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    },
    params: {
      latitude: -41.28664,
      longitude: 174.77557,
      term: req.params.term
    }
  }).then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.status(500).json({})
  })
})

// Get places by category and page offset

router.get('/category/:categories/page/:page', (req, res) => {
  axios.get('https://api.yelp.com/v3/businesses/search', {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    },
    params: {
      latitude: -41.28664,
      longitude: 174.77557,
      categories: req.params.categories,
      offset: ((req.params.page - 1) * 10),
      limit: 11
    }
  }).then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.status(500).json({})
  })
})

// Get one place by id

router.get('/place/:id', (req, res) => {
  axios.get(`https://api.yelp.com/v3/businesses/${req.params.id}`, {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    }
  }).then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.status(500).json({})
  })
})

// Get reviews for a place by id

router.get('/reviews/:placeId', (req, res) => {
  axios.get(`https://api.yelp.com/v3/businesses/${req.params.placeId}/reviews`, {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    }
  }).then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.status(500).json({})
  })
})

// Get all categories

router.get('/categories', (req, res) => {
  axios.get('https://api.yelp.com/v3/categories', {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    },
    params: {
      locale: 'en_NZ'
    }
  }).then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.status(500).json({})
  })
})

module.exports = router;
