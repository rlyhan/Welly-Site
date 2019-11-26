import { DISPLAY_NAVBAR, HIDE_NAVBAR } from '../actions/types';

const initialState = {
  navbarShowing: true
}

export default function(state = initialState, action) {
  switch(action.type) {
    case DISPLAY_NAVBAR:
    case HIDE_NAVBAR:
      return {
        navbarShowing: action.payload
      }
    default:
      return state;
  }
}
