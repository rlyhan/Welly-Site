import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getPopularPlaces, getSpecificPlace, getPlacesByCategory } from '../actions/yelpInfoActions'
import { getSpecificCategories } from '../actions/yelpCategoryActions'
import { getReviews } from '../actions/yelpReviewsActions'

class InfoLoaded extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.page == 'generalSearch') {
      this.props.getPopularPlaces();
    } else if (this.props.page === 'category') {
      this.props.getSpecificCategories(this.props.categoryType)
    } else if (this.props.page === 'place-page') {
      this.props.getSpecificPlace(this.props.id)
      this.props.getReviews(this.props.id)
    }
  }

  render() {
    return (
      <>
      {
        this.props.page === 'category' ?
        <>
        {
          this.props.yelpCategories.specificCategories ? this.props.children
          : this.props.yelpCategories.loading ? <div className="search-end"><img className="loading-animation" src={require('../images/loading.gif')}/></div>
          : null
        }
        </>
        : this.props.page === 'place-page' || this.props.page === 'generalSearch' ?
        <>
        {
          this.props.yelpInfo.yelpInfo ? this.props.children
          : this.props.yelpInfo.loading ? <div className="search-end"><img className="loading-animation" src={require('../images/loading.gif')}/></div>
          : null
        }
        </>
        : null
      }
      </>
    )
  }

}

const mapStateToProps = (state) => ({
  yelpInfo: state.yelpInfo,
  yelpCategories: state.yelpCategories,
  yelpReviews: state.yelpReviews
})

export default connect(mapStateToProps, {
  getPopularPlaces,
  getSpecificPlace,
  getPlacesByCategory,
  getSpecificCategories,
  getReviews
})(InfoLoaded)
