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
                this.props.yelpCategories.specificCategories ?
                <>
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
                </> : <p>Loading...</p>
              }
            </FormGroup>
            <Button className="mt-2" onClick={this.applyFilters}>Apply</Button>
          </FormGroup>
        </Col>
        <Col className="col-12 col-md-9">
          {
            this.props.results.yelpInfo && this.props.results.yelpInfo.length > 0 ?
            <Container className="search-results">
              {
                this.props.results.yelpInfo.map(place => {
                  return (
                    <Row>
                      <div className="search-result">
                        {
                          place.image_url
                          ? <img className="result-image" src={place.image_url} />
                          : <img className="placeholder" src={require(`../images/home-icons/${this.props.categoryName}.png`)} />
                        }
                        <div className="result-info">
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
                        </div>
                      </div>
                    </Row>
                  );
                })
              }
            </Container>
            : this.props.yelpInfo.loading ? <img className="loading-animation" src={require('../images/loading.gif')}/>
            : <div>No results</div>
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
