// Root reducer

import { combineReducers } from 'redux';
import airvisualInfoReducer from './airvisualInfoReducer';
import yelpCategoryReducer from './yelpCategoryReducer';
import yelpInfoReducer from './yelpInfoReducer';
import yelpReviewsReducer from './yelpReviewsReducer';
import otherReducer from './otherReducer';

export default combineReducers({
  airvisualInfo: airvisualInfoReducer,
  yelpCategories: yelpCategoryReducer,
  yelpInfo: yelpInfoReducer,
  yelpReviews: yelpReviewsReducer,
  other: otherReducer
})
