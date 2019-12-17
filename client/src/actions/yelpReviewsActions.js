import axios from 'axios';
import { REVIEWS_LOADING, GET_REVIEWS, LOADING_ERROR } from './types';

export const getReviews = (id) => dispatch => {
  dispatch(setReviewsLoading())
  axios.get(`/api/yelp/reviews/${id}`)
  .then(res =>
    dispatch({
      type: GET_REVIEWS,
      payload: res.data.reviews
    })
  )
  .catch(err =>
    dispatch({ type: LOADING_ERROR })
  )
}


export const setReviewsLoading = () => {
  return {
    type: REVIEWS_LOADING
  }
}
