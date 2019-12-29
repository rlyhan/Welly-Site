import {
  ALL_CATEGORIES_LOADING,
  SPECIFIC_CATEGORIES_LOADING,
  GET_ALL_CATEGORIES,
  GET_SPECIFIC_CATEGORIES,
  LOADING_ERROR }
from '../actions/types';

const initialState = {
  allCategories: [],
  specificCategories: [],
  allCategoriesLoading: true,
  specificCategoriesLoading: true,
  error: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ALL_CATEGORIES:
      return {
        allCategories: action.payload,
        allCategoriesLoading: false
      }
    case GET_SPECIFIC_CATEGORIES:
      return {
        specificCategories: action.payload,
        specificCategoriesLoading: false
      }
    case ALL_CATEGORIES_LOADING:
      return {
        allCategoriesLoading: true,
        error: false
      }
    case SPECIFIC_CATEGORIES_LOADING:
      return {
        specificCategoriesLoading: true,
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
