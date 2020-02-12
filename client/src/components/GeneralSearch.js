import React, { Component } from 'react'
import {
  Container,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'
import { connect } from 'react-redux'

import '../App.css'

import { getPopularPlaces, searchPlaces } from '../actions/yelpInfoActions'

import SearchResults from './SearchResults'

class GeneralSearch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      yelpInfo: [],
      query: '',
      searchedQuery: '',
      currentPage: 1,
      backButtonDisabled: true,
      nextButtonDisabled: true
    }
  }

  componentDidMount() {
    this.setState({
      yelpInfo: this.props.yelpInfo.yelpInfo
    }, () => {
      if (this.state.yelpInfo && this.state.yelpInfo.length > 10) {
        this.setState({
          nextButtonDisabled: false
        })
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.yelpInfo.yelpInfo !== prevProps.yelpInfo.yelpInfo) {
      this.setState({ yelpInfo: this.props.yelpInfo.yelpInfo }, () => {
        // Disable next button to disabled if number of results < 11
        if (this.state.yelpInfo && this.state.yelpInfo.length < 11) {
          this.setState({ nextButtonDisabled: true })
        } else {
          this.setState({ nextButtonDisabled: false })
        }
      })
    }
    if (this.state.currentPage !== prevState.currentPage) {
      // Disable back button if current page = 1
      if (this.state.currentPage == 1) {
        this.setState({ backButtonDisabled: true })
      } else {
        this.setState({ backButtonDisabled: false })
      }
      // If search query isn't empty, search by query + current page
      // Else, search by popular places + current page
      if (this.state.searchedQuery != '') {
        this.props.searchPlaces(this.state.query, this.state.currentPage)
      } else {
        this.props.getPopularPlaces(this.state.currentPage)
      }
    }
  }

  updateQuery = e => {
    this.setState({
      query: e.target.value
    })
  }

  searchQuery = () => {
    if (this.state.query == '') {
      this.setState({ currentPage: 1 }, () => {
        this.props.getPopularPlaces(this.state.currentPage)
      })
    } else {
      this.setState({
        searchedQuery: this.state.query
      }, () => {
        this.props.searchPlaces(this.state.searchedQuery, this.state.currentPage)
      })
    }
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.searchQuery()
    }
  }

  changePageBack = e => {
    this.setState({
      currentPage: this.state.currentPage - 1,
      nextButtonDisabled: false,
      backButtonDisabled: true
    })
  }

  changePageNext = e => {
    this.setState({
      currentPage: this.state.currentPage + 1,
      backButtonDisabled: false,
      nextButtonDisabled: true
    })
  }

  render() {
    return (
      <Container className="general">
        <Container className="mb-5">
          <Row className="mb-5">
            <Container className="search">
              <div className="search-bar">
                <input
                  type="text"
                  onChange={this.updateQuery}
                  onKeyPress={this.handleKeyPress}
                >
                </input>
                <a onClick={this.searchQuery}>
                  <i className="fa fa-search"></i>
                </a>
              </div>
            </Container>
          </Row>
        </Container>
        {
          this.state.yelpInfo ?
          <SearchResults results={this.state.yelpInfo} />
          : this.props.yelpInfo.loading ? <div className="search-end pb-5"><img className="loading-animation" src={require('../images/loading.gif')}/></div>
          : null
        }
        <Row className="justify-content-center">
          <Pagination>
            <PaginationItem>
              <PaginationLink onClick={this.changePageBack} disabled={this.state.backButtonDisabled}>
                ⯇
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={this.changePageNext} disabled={this.state.nextButtonDisabled}>
                ⯈
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  yelpInfo: state.yelpInfo
})

export default connect(mapStateToProps, { getPopularPlaces, searchPlaces })(GeneralSearch)
