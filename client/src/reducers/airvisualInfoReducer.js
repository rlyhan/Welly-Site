import { INFO_LOADING, GET_CURRENT_WEATHER } from '../actions/types';

const initialState = {
  airvisualInfo: [],
  weatherIcon: "",
  loading: true
}

// Try find file
const tryRequire = (path) => {
  try {
   return require(`${path}`);
  } catch (err) {
   return null;
  }
};

// Return either the exact weather icon pathname
// or weather icon pathname matching first two characters + 'd'

function getWeatherIcon(data) {
  var weatherIcon = data.current.weather.ic;
  if (tryRequire(weatherIcon)) {
    return weatherIcon;
  } else {
    return weatherIcon.substring(0, 2) + 'd';
  }
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_CURRENT_WEATHER:
      return {
        airvisualInfo: action.payload,
        weatherIcon: getWeatherIcon(action.payload),
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
