import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'

import { getPopularPlaces } from '../actions/yelpInfoActions'

import SearchBar from './SearchBar'

class GeneralSearch extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getPopularPlaces();
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
      <Container className="general">
        <SearchBar />
        {
          this.props.yelpInfo.yelpInfo && this.props.yelpInfo.yelpInfo.length > 0 ?
          <Container className="search-results">
            {
              this.props.yelpInfo.yelpInfo.map((place, index) => {
                return (
                  <Row key={index}>
                      {
                        place.image_url
                        ? <Col className="result-image col-12 col-sm-4 col-md-3"><img src={place.image_url} alt="place-image" /></Col>
                        : <Col className="result-image placeholder col-12 col-sm-4 col-md-3"><img src={require(`../images/place-placeholder.png`)} alt="place-placeholder" /></Col>
                      }
                      <Col className="result-info col-12 col-sm-8 col-md-9">
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
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  yelpInfo: state.yelpInfo
})

export default connect(mapStateToProps, { getPopularPlaces })(GeneralSearch)
