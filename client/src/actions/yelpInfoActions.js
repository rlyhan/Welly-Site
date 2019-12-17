import axios from 'axios';
import { INFO_LOADING, GET_PLACES, GET_SPECIFIC_PLACE, LOADING_ERROR } from './types';

export const getPopularPlaces = () => dispatch => {
  dispatch(setInfoLoading());
  axios.get('/api/yelp/popular')
  .then(res =>
    dispatch({
      type: GET_PLACES,
      payload: res.data.businesses
    })
  )
  .catch(err =>
    dispatch({ type: LOADING_ERROR })
  )
};

export const searchPlaces = (query) => dispatch => {
  dispatch(setInfoLoading());
  axios.get(`/api/yelp/search/${query}`)
  .then(res =>
    dispatch({
      type: GET_PLACES,
      payload: res.data.businesses
    })
  )
  .catch(err =>
    dispatch({ type: LOADING_ERROR })
  )
}

export const getPlacesByCategory = (categories, page) => dispatch => {
  dispatch(setInfoLoading());
  axios.get(`/api/yelp/category/${categories}/page/${page}`)
  .then(res =>
    dispatch({
      type: GET_PLACES,
      payload: res.data.businesses
    })
  )
  .catch(err =>
    dispatch({ type: LOADING_ERROR })
  )
}

export const getSpecificPlace = (id) => dispatch => {
  dispatch(setInfoLoading());
  axios.get(`/api/yelp/place/${id}`)
  .then(res =>
    dispatch({
      type: GET_SPECIFIC_PLACE,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({ type: LOADING_ERROR })
  )
};

export const setInfoLoading = () => {
  return {
    type: INFO_LOADING
  }
}
