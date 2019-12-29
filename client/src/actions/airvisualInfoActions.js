import axios from 'axios';
import { WEATHER_LOADING, GET_CURRENT_WEATHER, LOADING_ERROR } from './types';

export const getCurrentWeather = () => dispatch => {
  dispatch(setInfoLoading());
  axios.get('api/airvisual/weather')
    .then(res =>
    dispatch({
      type: GET_CURRENT_WEATHER,
      payload: res.data.data
    })
  )
  .catch(err =>
    dispatch({type: LOADING_ERROR})
  );
};

export const setInfoLoading = () => {
  return {
    type: WEATHER_LOADING
  }
}
