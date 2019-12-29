import { INFO_LOADING, GET_PLACES, GET_SPECIFIC_PLACE, LOADING_ERROR } from '../actions/types';

const initialState = {
  yelpInfo: [],
  loading: true,
  error: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_PLACES:
    case GET_SPECIFIC_PLACE:
      return {
        yelpInfo: action.payload,
        loading: false
      }
    case INFO_LOADING:
      return {
        loading: true,
        error: false
      }
    case LOADING_ERROR:
      return {
        error: true
      }
    default:
      return state;
  }
}
