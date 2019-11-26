import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSpecificPlace } from '../actions/yelpInfoActions';
import { getReviews } from '../actions/yelpReviewsActions';

class InfoLoaded extends Component {

  static propTypes = {
    yelpInfo: PropTypes.object.isRequired,
    yelpReviews: PropTypes.object.isRequired
  }


  constructor(props) {
    super(props)
    console.log(props)

  }

  componentDidMount() {
    this.props.getSpecificPlace(this.props.id)
    this.props.getReviews(this.props.id)
  }

  render() {
    return (
      <>
        {
          this.state.yelpInfo.yelpInfo ? this.props.children : null
        }
      </>
    )
  }

}

const mapStateToProps = (state) => ({
  yelpInfo: state.yelpInfo,
  yelpReviews: state.yelpReviews
});

export default connect(mapStateToProps, { getSpecificPlace, getReviews })(InfoLoaded);
