import React, { Component } from 'react';
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, UncontrolledCarousel } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSpecificPlace } from '../actions/yelpInfoActions';
import { getReviews } from '../actions/yelpReviewsActions';

class PlacePage extends Component {

  static propTypes = {
    yelpInfo: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      activeTab: "1"
    }
  }

  componentDidMount() {
    // this.props.getSpecificPlace(this.props.id)
    // this.props.getReviews(this.props.id)
  }

  getStars = (number) => {
    let stars = '★'.repeat(number)
    if (number % 1 == 0.5) {
      stars += '★'
    }
    return stars
  }

  render() {

    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    return (
      <Container className="place-page">
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
            <Container>
              <Row>
                <Col className="col-12 col-md-4 px-0">
                  {
                    this.props.yelpInfo.yelpInfo ?
                    <img src={this.props.yelpInfo.yelpInfo.image_url} />
                    : null
                  }
                </Col>
                <Col className="col-12 col-md-8">
                  <Container className="paragraph my-5">
                  {
                    this.props.yelpInfo.yelpInfo ?
                    <>
                      <Row className="heading">
                        <h3>{`${this.props.yelpInfo.yelpInfo.name}`.toUpperCase()}</h3>
                      </Row>
                      <Row className="heading">
                      {
                        this.props.yelpInfo.yelpInfo.location ?
                        <p>{this.props.yelpInfo.yelpInfo.location.display_address.join(", ")}</p>
                        : null
                      }
                      </Row>
                      <Row className="desc">
                        <Col>
                          <ul>
                            <li><strong>HOURS</strong></li>
                            {
                              this.props.yelpInfo.yelpInfo.hours?
                              this.props.yelpInfo.yelpInfo.hours[0].open.map((day, index) => {
                                return (
                                  <li>{weekdays[index]}: {day.start} - {day.end}</li>
                                )
                              }) : null
                            }
                          </ul>
                        </Col>
                        <Col>
                          <p className="mb-0"><strong>PRICE RANGE:</strong></p>
                          <p>{this.props.yelpInfo.yelpInfo.price}</p>
                          <p className="mb-0"><strong>PHONE:</strong></p>
                          <p>{this.props.yelpInfo.yelpInfo.display_phone}</p>
                        </Col>
                      </Row>
                    </>
                    : null
                  }
                  </Container>
                </Col>
              </Row>
            </Container>
          </TabPane>
          <TabPane tabId="2" className="photos">
            <Container>
            {
              this.props.yelpInfo.yelpInfo && this.props.yelpInfo.yelpInfo.photos ?
              <UncontrolledCarousel items={this.props.yelpInfo.yelpInfo.photos.map(photo => { return { src: photo } })} />
              : null
            }
            </Container>
          </TabPane>
          <TabPane tabId="3" className="reviews">
            <Container className="my-5">
              <ul>
              {
                this.props.yelpReviews.yelpReviews ?
                this.props.yelpReviews.yelpReviews.map(review => {
                  return (
                    <li>
                      <h4>{this.getStars(review.rating)}</h4>
                      <p>{review.user.name}, {review.time_created}</p>
                      <p>{review.text}</p>
                    </li>
                  )
                })
                : null
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
  yelpReviews: state.yelpReviews
});

export default connect(mapStateToProps, { getSpecificPlace, getReviews })(PlacePage);
