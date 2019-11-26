import axios from 'axios';
import { ALL_CATEGORIES_LOADING, SPECIFIC_CATEGORIES_LOADING, GET_ALL_CATEGORIES, GET_SPECIFIC_CATEGORIES } from './types';

const herokuapp = 'https://cors-anywhere.herokuapp.com/';

export const getAllCategories = () => dispatch => {
  dispatch(setAllCategoriesLoading());
  axios.get(`${herokuapp}https://api.yelp.com/v3/categories`, {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    },
    params: {
      locale: 'en_NZ'
    }
  }).then(res =>
    dispatch({
      type: GET_ALL_CATEGORIES,
      payload: res.data.categories.sort((a, b) => { return a.title > b.title })
    })
  )
}

export const getSpecificCategories = (specificCategory) => dispatch => {
  dispatch(setSpecificCategoriesLoading());
  axios.get(`${herokuapp}https://api.yelp.com/v3/categories`, {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_KEY}`
    },
    params: {
      locale: 'en_NZ'
    }
  }).then(res =>
    dispatch({
      type: GET_SPECIFIC_CATEGORIES,
      payload: res.data.categories.filter(category => {
        return specificCategory.split(",").includes(category.parent_aliases[0])
      }).sort(function(a, b) {
        if (a.title.toUpperCase() > b.title.toUpperCase()) {
          return 1;
        } else if (a.title.toUpperCase() < b.title.toUpperCase()) {
          return -1;
        }
        return 0;
      })
    })
  )
}

export const setAllCategoriesLoading = () => {
  return {
    type: ALL_CATEGORIES_LOADING
  }
}

export const setSpecificCategoriesLoading = () => {
  return {
    type: SPECIFIC_CATEGORIES_LOADING
  }
}
