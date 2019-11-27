import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';

import { searchPlaces } from '../actions/yelpInfoActions';

const history = createBrowserHistory();

class SearchBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }

  componentDidMount() {

  }

  updateQuery = (e) => {
    console.log(e.target.value)
    this.setState({
      query: e.target.value
    })
  }

  searchQuery = (e) => {
    this.props.searchPlaces(this.state.query)
  }

  render() {
    return (
      <Container className="mb-5">
        <Row className="mx-auto my-5 justify-content-center">
          <h3 className="display-4">Browse all places, events, services and more</h3>
        </Row>
        <Row className="mb-5">
          <Container className="search">
            <div className="search-bar">
              <input type="text" onChange={this.updateQuery}></input>
              <a onClick={this.searchQuery}><i className="fa fa-search"></i></a>
            </div>
          </Container>
        </Row>
        <Row>
        {/*
          this.props.yelpInfo.loading ?
          <p>Loading...</p>
          : <SearchResults
              results={this.props.yelpInfo}
              categories={this.props.yelpCategories}
            />
        */}
        </Row>
      </Container>
    )
  }
}

SearchBar.propTypes = {
  yelpInfo: PropTypes.object.isRequired,
  searchPlaces: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  yelpInfo: state.yelpInfo
});

export default connect(mapStateToProps, { searchPlaces })(SearchBar);
