import axios from 'axios'

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FAVOURITE_ADDED,
  FAVOURITE_REMOVED
} from "./types"

// Check token & load user
export const loadUser = () => (dispatch, getState) => {

  if (getState().auth.token) {

    dispatch({ type: USER_LOADING })

    const token = getState().auth.token

    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }

    if (token) {
      config.headers['x-auth-token'] = token
    }

    axios.get('/api/auth/user', config)
      .then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
      }))
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: err
        })
      })

  } else {
    dispatch({ type: AUTH_ERROR })
  }
}

// Register user
export const register = ({ username, email, password }) => dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ username, email, password })

  axios.post('/api/auth/register', body, config)
    .then(res => dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL,
        payload: err
      })
    })

}

// Login username
export const login = ({ loginName, password }) => dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ loginName, password })

  axios.post('/api/auth/login', body, config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL,
        payload: err
      })
    })

}

// Logout
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  })
}

// Add to favourites
export const addToFavourites = ({ name, yelpId }, userId) => dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, yelpId })

  axios.put(`/api/auth/user/${userId}/favourite/add`, body, config)
    .then(res => dispatch({
      type: FAVOURITE_ADDED,
      payload: res.data
    }))


}

// Remove from favourites
export const removeFromFavourites = (yelpId, userId) => dispatch => {

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({ yelpId: yelpId })

    axios.put(`/api/auth/user/${userId}/favourite/delete`, body, config)
      .then(res => dispatch({
        type: FAVOURITE_REMOVED,
        payload: res.data
      }))

}

// Clear auth error
export const clearAuthError = () => dispatch => {
  dispatch({
    type: AUTH_ERROR,
    payload: null
  })
}
