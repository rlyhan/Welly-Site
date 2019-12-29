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
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  authenticated: false,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      }
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
        loading: false,
        error: null
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        authenticated: true,
        loading: false,
        error: null
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        token: null,
        user: null,
        authenticated: false,
        loading: false,
        error: action.payload
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        token: null,
        user: null,
        authenticated: false,
        loading: false,
        error: null
      };
    case FAVOURITE_ADDED:
    case FAVOURITE_REMOVED:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
