import { REVIEWS_LOADING, GET_REVIEWS } from '../actions/types';

const initialState = {
  yelpReviews: [],
  loading: true
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_REVIEWS:
      return {
        yelpReviews: action.payload,
        loading: false
      }
    case REVIEWS_LOADING:
      return {
        loading: true
      }
    default:
      return state;
  }
}
