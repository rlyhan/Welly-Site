import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'
import { connect } from 'react-redux'

import '../App.css'

import { getSpecificCategories } from '../actions/yelpCategoryActions'
import { getPlacesByCategory } from '../actions/yelpInfoActions'
import { displayNavbar, hideNavbar } from '../actions/otherActions'

import SearchResults from './SearchResults'

class Category extends Component {

  constructor(props) {
    super(props)
    props.displayNavbar()
    this.state = {
      yelpInfo: [],
      yelpCategories: [],
      categories: [],
      parentCategories: [],
      filters: [],
      sortMethod: "",
      currentPage: 1,
      backButtonDisabled: true,
      nextButtonDisabled: true
    }
  }

  componentDidMount() {
    this.setState({
      yelpInfo: this.props.yelpInfo.yelpInfo,
      yelpCategories: this.props.yelpCategories.specificCategories
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
      // If there are filters, search by filters + current page
      // Else, just search by page category + current page
      if (this.state.filters.length > 0) {
        this.props.getPlacesByCategory(this.state.filters.join(","), this.state.currentPage)
      } else {
        this.props.getPlacesByCategory(this.props.categoryType, this.state.currentPage)
      }
    }
  }

  // Select a sort option
  onSortSelect = e => {
    this.setState({ sortMethod: e.target.value })
    if (e.target.value == "") document.getElementById('sort-menu').value = ""
  }

  // Return results according to given sort method
  getSortedResults = (sortMethod) => {
    if (sortMethod == "") return this.state.yelpInfo
    return this.state.yelpInfo.slice().sort((a, b) => {
      if (a[sortMethod] < b[sortMethod]) {
        return 1
      } else if (a[sortMethod] > b[sortMethod]) {
        return -1
      }
      return 0
    })
  }

  // On checking a filter
  onFilterSelect = e => {
    let selectedFilter = e.target
    let newFilters = this.state.filters

    // If a filter is selected, add filters to current array of filters
    // Else if filter is deselected, remove from current array of filters
    if (selectedFilter.checked) {
      this.setState({ filters: [...newFilters, selectedFilter.value] })
    } else {
      let removeIndex = this.state.filters.indexOf(selectedFilter.value)
      newFilters.splice(removeIndex, 1)
      this.setState({ filters: newFilters })
    }
  }

  // On clicking apply filter button
  applyFilters = () => {
    // If filters selected, fetch filtered results
    // Else return all results in category
    if (this.state.filters.length > 0) {
      this.props.getPlacesByCategory(this.state.filters.join(","), 1)
    } else {
      this.props.getPlacesByCategory(this.props.categoryType, 1)
    }
    document.getElementById('sort-menu').value = ""

    // If there are more than 10 results remaining, make next page visitable
    if (this.props.yelpInfo.yelpInfo.length > 10) {
      this.setState({
        currentPage: 1,
        backButtonDisabled: true,
        nextButtonDisabled: false
      })
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
      <Container className="category pt-5">
        <Row className="justify-content-center">
          <Col className="col-12 col-md-3 mb-5">
            <FormGroup>
              <Label for="sort">SORT</Label>
              <FormGroup className="sort-box">
                <Input id="sort-menu" type="select" name="sort" onChange={this.onSortSelect.bind(this)}>
                  <option value="">Sort</option>
                  <option value="rating">Highest Rated</option>
                  <option value="review_count">No. of Reviews</option>
                </Input>
              </FormGroup>
            </FormGroup>
            <FormGroup>
              <Label for="filter">CATEGORIES</Label>
              <FormGroup check className="filter-box">
              {
                this.state.yelpCategories.map((category, index) => {
                  return (
                    <div key={index}>
                      <Label check>
                        <Input
                          type="checkbox"
                          name="filter"
                          onChange={this.onFilterSelect.bind(this)}
                          value={category.alias} />{' '}
                        {category.title}
                      </Label>
                    </div>
                  )
                })
              }
              </FormGroup>
              <Button className="mt-2" onClick={this.applyFilters}>Apply</Button>
            </FormGroup>
          </Col>
          <Col className="col-12 col-md-9">
          {
            this.state.yelpInfo ?
            <SearchResults results={this.getSortedResults(this.state.sortMethod)} category={this.props.categoryName} />
            : this.props.yelpInfo.loading ? <div className="search-end"><img className="loading-animation" src={require('../images/loading.gif')}/></div>
            : <div className="search-end">No results</div>
          }
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Pagination>
            <PaginationItem>
              <PaginationLink onClick={this.changePageBack} disabled={this.state.backButtonDisabled}>
                PREV
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={this.changePageNext} disabled={this.state.nextButtonDisabled}>
                NEXT
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  yelpCategories: state.yelpCategories,
  yelpInfo: state.yelpInfo,
  other: state.other
})

export default connect(mapStateToProps, { getSpecificCategories, getPlacesByCategory, displayNavbar, hideNavbar })(Category)
