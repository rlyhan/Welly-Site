import axios from 'axios';
import { REVIEWS_LOADING, GET_REVIEWS } from './types';

const herokuapp = 'https://cors-anywhere.herokuapp.com/';

export const getReviews = (id) => dispatch => {
  dispatch(setReviewsLoading());
  axios.get(`${herokuapp}https://api.yelp.com/v3/businesses/${id}/reviews`, {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    }
  }).then(res =>
    dispatch({
      type: GET_REVIEWS,
      payload: res.data.reviews
    })
  )
  // .catch(err =>
  //   console.log(err);
  //   // dispatch(returnErrors(err.response.data, err.response.status))
  // );
};


export const setReviewsLoading = () => {
  return {
    type: REVIEWS_LOADING
  }
}
