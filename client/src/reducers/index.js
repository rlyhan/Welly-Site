// Root reducer

import { combineReducers } from 'redux'
import authReducer from './authReducer'
import airvisualInfoReducer from './airvisualInfoReducer'
import yelpCategoryReducer from './yelpCategoryReducer'
import yelpInfoReducer from './yelpInfoReducer'
import yelpReviewsReducer from './yelpReviewsReducer'
import otherReducer from './otherReducer'

export default combineReducers({
  auth: authReducer,
  airvisualInfo: airvisualInfoReducer,
  yelpCategories: yelpCategoryReducer,
  yelpInfo: yelpInfoReducer,
  yelpReviews: yelpReviewsReducer,
  other: otherReducer
})
