import axios from 'axios';
import { INFO_LOADING, GET_POPULAR_PLACES, GET_PLACES, GET_SPECIFIC_PLACE } from './types';

const herokuapp = 'https://cors-anywhere.herokuapp.com/';

export const getPopularPlaces = () => dispatch => {
  dispatch(setInfoLoading());
  // axios.get('/api/yelp').then(res =>
  //   dispatch({
  //     type: GET_PLACES,
  //     payload: res.data.businesses
  //   })
  // )
  axios.get(`${herokuapp}https://api.yelp.com/v3/businesses/search`, {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    },
    params: {
      latitude: -41.28664,
      longitude: 174.77557
    }
  }).then(res =>
    dispatch({
      type: GET_PLACES,
      payload: res.data.businesses
    })
  )
  // .catch(err =>
  //   console.log(err);
  //   // dispatch(returnErrors(err.response.data, err.response.status))
  // );
};

export const getPlaces = (categories) => dispatch => {
  dispatch(setInfoLoading());
  axios.get(`${herokuapp}https://api.yelp.com/v3/businesses/search`, {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    },
    params: {
      latitude: -41.28664,
      longitude: 174.77557,
      categories: categories,
      limit: 50
    }
  }).then(res =>{
    dispatch({
      type: GET_PLACES,
      payload: res.data.businesses
    })
  })
}

export const sortPlaces = (places, key) => dispatch => {
  dispatch({
    type: GET_PLACES,
    payload: places.sort(function(a, b) {
      if (a[key] < b[key]) {
        return 1;
      } else if (a[key] > b[key]) {
        return -1;
      }
      return 0;
    })
  })
}

export const getSpecificPlace = (id) => dispatch => {
  dispatch(setInfoLoading());
  axios.get(`${herokuapp}https://api.yelp.com/v3/businesses/${id}`, {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    }
  }).then(res =>
    dispatch({
      type: GET_SPECIFIC_PLACE,
      payload: res.data
    })
  )
};

export const setInfoLoading = () => {
  return {
    type: INFO_LOADING
  }
}
