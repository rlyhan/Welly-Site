import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import '../App.css'

function getStars(number) {
  let stars = '★'.repeat(number)
  if (number % 1 == 0.5) {
    stars += '★'
  }
  return stars
}

const SearchResults = (props) => {
  if (props.results.length > 0) {
    return (
      <Container className="search-results">
        {
          props.results.slice(0, 10).map((place, index) => {
            return (
              <Row key={index}>
                <Col className="result-image col-12 col-sm-4 col-md-4 col-lg-3">
                  {
                    place.image_url
                    ? <img src={place.image_url} />
                    : <>
                        {
                          props.category
                          ? <img src={require(`../images/home-icons/${props.category}.png`)} alt="category-image"/>
                          : <img src={require(`../images/place-placeholder.png`)} alt="placeholder" style={{backgroundColor: 'black'}}  />
                        }
                      </>
                  }
                </Col>
                <Col className="result-info col-12 col-sm-8 col-md-8 col-lg-9">
                  <a href={`/places/${place.id}`}>
                    <p className="h5">{place.name.toUpperCase()}</p>
                  </a>
                  <p>
                    {
                      place.categories.map(category => {
                        return category.title
                      }).join(", ")
                    }
                  </p>
                  <p>{getStars(place.rating)} ({place.review_count} reviews)</p>
                  <p>
                    <i>{place.location.display_address.join(", ")}</i>
                  </p>
                </Col>
              </Row>
            )
          })
        }
      </Container>
    )
  }
  return (
    <div className="search-end mb-5">No results</div>
  )
}

export default SearchResults
