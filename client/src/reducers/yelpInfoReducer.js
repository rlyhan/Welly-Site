import { INFO_LOADING, GET_PLACES, GET_SPECIFIC_PLACE } from '../actions/types';

const initialState = {
  yelpInfo: [],
  loading: true
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
        loading: true
      }
    default:
      return state;
  }
}
