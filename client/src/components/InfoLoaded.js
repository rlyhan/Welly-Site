import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'

import { getPopularPlaces, getSpecificPlace, getPlacesByCategory } from '../actions/yelpInfoActions'
import { getSpecificCategories } from '../actions/yelpCategoryActions'
import { getReviews } from '../actions/yelpReviewsActions'

class InfoLoaded extends Component {

  componentDidMount() {
    if (this.props.page === 'category') {
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
          this.props.yelpInfo.error ?
          <Container className="text-center" style={{paddingTop: "128px"}}>
            <h1 class="display-4">
              An error occurred fetching data. Please try refreshing the page.
            </h1>
          </Container>
          :
          <>
          {
            this.props.page === 'category' ?
            <>
            {
              this.props.yelpCategories.specificCategories ? this.props.children
              : this.props.yelpCategories.loading ?
                <div className="search-end">
                  <img className="loading-animation" src={require('../images/loading.gif')} alt="loading" />
                </div>
              : null
            }
            </>
            : this.props.page === 'place-page' ?
            <>
            {
              this.props.yelpInfo.yelpInfo && this.props.children
            }
            </> : null
          }
          </>
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
