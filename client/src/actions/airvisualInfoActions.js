import axios from 'axios';
import { INFO_LOADING, GET_CURRENT_WEATHER } from './types';

export const getCurrentWeather = () => dispatch => {
  dispatch(setInfoLoading());
  axios.get(`http://api.airvisual.com/v2/city?city=Wellington%20City&state=Wellington&country=New%20Zealand&key=${process.env.REACT_APP_AIRVISUAL_KEY}`)
    .then(res =>
    dispatch({
      type: GET_CURRENT_WEATHER,
      payload: res.data.data
    })
  )
  // .catch(err =>
  //   console.log(err);
  //   // dispatch(returnErrors(err.response.data, err.response.status))
  // );
};

export const setInfoLoading = () => {
  return {
    type: INFO_LOADING
  }
}
