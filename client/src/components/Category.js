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
  NavLink
} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchResults from './SearchResults';
import { getSpecificCategories } from '../actions/yelpCategoryActions';
import { getPlaces } from '../actions/yelpInfoActions';
import { displayNavbar, hideNavbar } from '../actions/otherActions';

import '../App.css';

class Category extends Component {

  static propTypes = {
    allCategories: PropTypes.object.isRequired,
    specificCategories: PropTypes.object.isRequired,
    getSpecificCategories: PropTypes.func.isRequired,
    yelpInfo: PropTypes.object.isRequired,
    getPlaces: PropTypes.func.isRequired,
    other: PropTypes.object.isRequired,
    displayNavbar: PropTypes.func.isRequired,
    hideNavbar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.props.displayNavbar();
    this.props.getSpecificCategories(this.props.categoryType)
    this.state = {
      parentCategories: []
    }
  }

  componentDidMount() {
    this.props.getPlaces(this.props.categoryType);
  }

  searchWithFilters = (filters) => {
    console.log(filters)
    this.props.getPlaces(filters);
  }

  render() {

    return (
      <Container className="category">
        <Row className="mx-auto py-4 justify-content-center">
          {
            this.props.name ?
            <h5>{this.props.name}</h5>
            : null
          }
        </Row>
        <Row className="justify-content-center">
        {
          this.props.yelpCategories.specificCategoriesLoading ?
          null
          : <SearchResults
              categoryName={this.props.categoryName}
              categoryType={this.props.categoryType}
              results={this.props.yelpInfo}
              search={this.searchWithFilters}
            />
        }
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  yelpCategories: state.yelpCategories,
  yelpInfo: state.yelpInfo,
  other: state.other
});

export default connect(mapStateToProps, { getSpecificCategories, getPlaces, displayNavbar, hideNavbar })(Category);
