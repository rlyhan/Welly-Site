import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  UncontrolledCarousel
} from 'reactstrap'
import { connect } from 'react-redux'

import '../App.css'

import { getSpecificPlace } from '../actions/yelpInfoActions'
import { getReviews } from '../actions/yelpReviewsActions'
import { addToFavourites, removeFromFavourites } from '../actions/authActions'

class PlacePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTab: "1",
      addButtonDisabled: false,
      removeButtonDisabled: false
    }
  }

  getStars = (number) => {
    let stars = '★'.repeat(number)
    if (number % 1 == 0.5) {
      stars += '★'
    }
    return stars
  }

  addToFavourites = () => {
    this.setState({
      addButtonDisabled: true,
      removeButtonDisabled: false
    })
    const placeInfo = {
      name: this.props.yelpInfo.yelpInfo.name,
      yelpId: this.props.yelpInfo.yelpInfo.id
    }
    this.props.addToFavourites(placeInfo, this.props.auth.user._id)
  }

  removeFromFavourites = () => {
    this.props.removeFromFavourites(this.props.yelpInfo.yelpInfo.id, this.props.auth.user._id)
    this.setState({
      addButtonDisabled: false,
      removeButtonDisabled: true
    })
  }

  render() {

    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    let { yelpInfo } = this.props.yelpInfo

    return (
      <Container className="place-page mb-5">
        <Nav tabs>
          <NavItem style={{borderTopLeftRadius: "5px"}} className={this.state.activeTab == 1 ? 'place-page-active-tab' : null}>
            <NavLink onClick={() => this.setState({ activeTab: "1" })}>
              DETAILS
            </NavLink>
          </NavItem>
          <NavItem className={this.state.activeTab == 2 ? 'place-page-active-tab' : null}>
            <NavLink onClick={() => this.setState({ activeTab: "2" })}>
              PHOTOS
            </NavLink>
          </NavItem>
          <NavItem style={{borderTopRightRadius: "5px"}} className={this.state.activeTab == 3 ? 'place-page-active-tab' : null}>
            <NavLink onClick={() => this.setState({ activeTab: "3" })}>
              REVIEWS
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1" className="details">
            <Container className="py-3">
              <Row>
                <Col className="col-12 col-md-4 my-auto px-4" style={{padding: "none"}}>
                  {
                    yelpInfo.image_url ?
                    <img src={yelpInfo.image_url} style={{ border: "2px solid white" }}/> :
                    <img className="placeholder" src={require(`../images/place-placeholder.png`)} />
                  }
                </Col>
                <Col className="col-12 col-md-8 px-4">
                  <Container className="paragraph my-5">
                    <Row className="heading">
                      <h3>{`${yelpInfo.name}`.toUpperCase()}</h3>
                    </Row>
                    <Row className="heading">
                      <p className="mb-0">
                      {
                        yelpInfo.categories &&
                        yelpInfo.categories.map(category => {
                          return (category.title)
                        }).join(", ")
                      }
                      </p>
                    </Row>
                    <Row className="heading">
                      <h5>
                        <span style={{color: 'yellow'}}>
                          {this.getStars(yelpInfo.rating)}
                        </span>
                        <span style={{fontSize: '15px'}}>
                          &nbsp;({yelpInfo.review_count} reviews)
                        </span>
                      </h5>
                    </Row>
                    <Row className="heading">
                      <p className="address mb-0">
                      {
                        yelpInfo.location &&
                        yelpInfo.location.display_address.join(", ")
                      }
                      </p>
                    </Row>
                    <Row className="favourite-button">
                    {
                      this.props.auth.authenticated && this.props.auth.user.favouritePlaces &&
                      <>
                      {
                        this.props.auth.user.favouritePlaces.find(place => {
                          return place.yelpId == this.props.url
                        }) != null ?
                        <Button className="my-2" color="danger" onClick={this.removeFromFavourites} disabled={this.state.removeButtonDisabled}>
                          REMOVE FROM FAVOURITES
                        </Button>
                        :
                        <Button className="my-2" color="success" onClick={this.addToFavourites} disabled={this.state.addButtonDisabled}>
                          ADD TO FAVOURITES
                        </Button>
                      }
                      </>
                    }
                    </Row>
                    <Row className="desc">
                      <Col>
                        <ul>
                          <li><strong>HOURS</strong></li>
                          {
                            yelpInfo.hours ?
                            yelpInfo.hours[0].open.map((day, index) => {
                              return (
                                <li key={index}>{weekdays[index]}: {day.start} - {day.end}</li>
                              )
                            }) : "No hours available"
                          }
                        </ul>
                      </Col>
                      <Col>
                        <p className="mb-0"><strong>PRICE RANGE:</strong></p>
                        <p>{yelpInfo.price}</p>
                        <p className="mb-0"><strong>PHONE:</strong></p>
                        <p>{yelpInfo.display_phone}</p>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </TabPane>
          <TabPane tabId="2" className="photos">
            {
              yelpInfo.photos && yelpInfo.photos.length > 0 ?
              <Container><UncontrolledCarousel className="py-5" items={yelpInfo.photos.map(photo => { return { src: photo } })} /></Container>
              :
              <Container className="py-5"><p className="text-center">No photos available.</p></Container>
            }
          </TabPane>
          <TabPane tabId="3" className="reviews">
            <Container className="py-3" fluid>
              <ul>
              {
                this.props.yelpReviews.yelpReviews ?
                this.props.yelpReviews.yelpReviews.map((review, index) => {
                  return (
                    <li key={index}>
                      <Card style={{backgroundColor: "#2F2F2F"}}>
                        <CardBody className="review-top">
                          <CardTitle style={{color: "yellow"}}>{this.getStars(review.rating)}</CardTitle>
                          <CardSubtitle style={{fontWeight: "bold"}}>{(review.user.name).toUpperCase()}</CardSubtitle>
                          <CardText>{new Date(review.time_created).toString().split("GMT")[0]}</CardText>
                        </CardBody>
                        <CardBody className="review-body pt-0">
                          <CardText>{review.text}<i> Full review on Yelp</i></CardText>
                        </CardBody>
                      </Card>
                    </li>
                  )
                })
                : <p className="text-center">No reviews available.</p>
              }
              </ul>
            </Container>
          </TabPane>
        </TabContent>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  yelpInfo: state.yelpInfo,
  yelpReviews: state.yelpReviews,
  auth: state.auth
})

export default connect(mapStateToProps, { getSpecificPlace, getReviews, addToFavourites, removeFromFavourites })(PlacePage)
