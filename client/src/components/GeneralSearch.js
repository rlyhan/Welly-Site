import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'

import { getPopularPlaces } from '../actions/yelpInfoActions'

import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

class GeneralSearch extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <Container className="general">
        {
        <>
          <SearchBar />
          {
            this.props.yelpInfo.yelpInfo ?
            <SearchResults results={this.props.yelpInfo.yelpInfo} />
            : this.props.yelpInfo.loading ?
            <Container>
              <div className="search-end"><img className="loading-animation" src={require('../images/loading.gif')}/></div>
            </Container>
            : <div className="search-end">No results</div>
          }
        </>
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  yelpInfo: state.yelpInfo
})

export default connect(mapStateToProps, { getPopularPlaces })(GeneralSearch)
