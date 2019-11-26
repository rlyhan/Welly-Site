import { DISPLAY_NAVBAR, HIDE_NAVBAR } from './types';

export const displayNavbar = () => dispatch => {
  dispatch({
    type: DISPLAY_NAVBAR,
    payload: true
  })
}

export const hideNavbar = () => dispatch => {
  dispatch({
    type: HIDE_NAVBAR,
    payload: false
  })
}
