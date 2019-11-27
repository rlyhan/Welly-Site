import React, { Component } from 'react';
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sortPlaces } from '../actions/yelpInfoActions';

class SearchResults extends Component {

  static propTypes = {
    allCategories: PropTypes.object.isRequired,
    specificCategories: PropTypes.object.isRequired,
    yelpInfo: PropTypes.object.isRequired,
    sortPlaces: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      filters: []
    }
  }

  componentDidMount() {
    // if (this.props.categoryType == 'shopping') {
    //   this.setState({
    //     categories: this.props.categories.yelpCategories.filter(category => {
    //       return category.parent_aliases.includes('shopping')
    //     })
    //   })
    // }
  }

  onSortSelect = (e) => {
    if (e.target.value == "") {
      document.getElementById('sort-menu').value = ""
    }
    this.props.sortPlaces(this.props.results.yelpInfo, e.target.value);
  }

  onFilterSelect = (e) => {
    let selectedFilter = e.target;
    let newFilters = this.state.filters;
    if (selectedFilter.checked) {
      newFilters.push(selectedFilter.value);
      this.setState({
        filters: newFilters
      });
    } else {
      let removeIndex = this.state.filters.indexOf(selectedFilter.value);
      newFilters.splice(removeIndex, 1);
      this.setState({
        filters: newFilters
      });
    }
  }

  applyFilters = () => {
    if (this.state.filters.length > 0) {
      this.props.search(this.state.filters.join(","))
    } else {
      this.props.search(this.props.categoryType)
    }
    document.getElementById('sort-menu').value = ""
  }

  getStars = (number) => {
    let stars = '★'.repeat(number)
    if (number % 1 == 0.5) {
      stars += '★'
    }
    return stars
  }

  render() {
    return (
      <>
      {
        this.props.yelpCategories.specificCategories.length > 0 ?
        <Col className="col-12 col-md-3 mb-5">
          <FormGroup>
            <Label for="sort">SORT</Label>
            <FormGroup className="sort-box">
              <Input id="sort-menu" type="select" name="sort" onChange={this.onSortSelect.bind(this)}>
{/*                <option onChange={this.onSort} value="">Cost (Low to High)</option>
                <option onChange={this.onSort} value="">Cost (High to Low)</option>*/}
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
              this.props.yelpCategories.specificCategories.map(category => {
                return (
                  <div>
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
      : null }
      <Col className="col-12 col-md-9">
      {
        this.props.yelpInfo.yelpInfo && this.props.yelpInfo.yelpInfo.length > 0 ?
        <Container className="search-results">
          {
            this.props.yelpInfo.yelpInfo.map(place => {
              return (
                <Row>
                    {
                      place.image_url
                      ? <Col className="result-image col-12 col-sm-4 col-md-4 col-lg-3"><img src={place.image_url} /></Col>
                      : <Col className="result-image placeholder col-12 col-sm-4 col-md-4 col-lg-3"><img src={require(`../images/home-icons/${this.props.categoryName}.png`)} /></Col>
                    }
                    <Col className="result-info col-12 col-sm-8 col-md-8 col-lg-9">
                      <a href={`/places/${place.id}`}><p className="h5">{place.name.toUpperCase()}</p></a>
                      <p>
                        {
                          place.categories.map(category => {
                            return (category.title)
                          }).join(", ")
                        }
                      </p>
                      <p>{this.getStars(place.rating)} ({place.review_count} reviews)</p>
                      <p><i>{place.location.display_address.join(", ")}
                      </i></p>
                    </Col>
                </Row>
              )
            })
          }
        </Container>
        : this.props.yelpInfo.loading ? <div className="search-end"><img className="loading-animation" src={require('../images/loading.gif')}/></div>
        : <div className="search-end">No results</div>
      }
      </Col>
      </>
    );
  }

}


const mapStateToProps = (state) => ({
  yelpCategories: state.yelpCategories,
  yelpInfo: state.yelpInfo
});

export default connect(mapStateToProps, { sortPlaces })(SearchResults);
