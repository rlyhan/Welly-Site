import React, { Component } from 'react'
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle
} from 'reactstrap'
import { connect } from 'react-redux'

import '../App.css'

import { getCurrentWeather } from '../actions/airvisualInfoActions'
import { getPopularPlaces } from '../actions/yelpInfoActions'
import { displayNavbar, hideNavbar } from '../actions/otherActions'

import WeatherModal from './modals/WeatherModal'
import GeneralSearch from './GeneralSearch'

const ref = React.createRef()

class Home extends Component {

  constructor(props) {
    super()
    this.state = {
      navbarShowing: false,
      isOpen: false
    }
    window.addEventListener('scroll', this.changeNavbarDisplay)
  }

  componentDidMount() {
    this.props.getCurrentWeather()
    this.props.getPopularPlaces(1)
    this.props.hideNavbar()
  }

  // Scroll to lower half of page upon click

  handleScroll = (e) => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  // If scroll position >= 500, show navbar
  // Else, hide navbar

  changeNavbarDisplay = (e) => {
    if (window.pageYOffset >= 500 && !this.state.navbarShowing) {
      this.setState({
        navbarShowing: true
      })
      this.props.displayNavbar()
    } else if (window.pageYOffset < 500 && this.state.navbarShowing) {
      this.setState({
        navbarShowing: false
      })
      this.props.hideNavbar()
    }
  }

  render() {

    return (
      <div className="home">
        <Jumbotron fluid className="home-jumbotron mb-0">
          <div className="home-image">
            <img src={require('../images/wellington-day.jpg')}></img>
          </div>
          <Container>
            <h1 className="logo text-center" style={{color: 'white', fontSize: '90px', marginTop: '40px'}}>WELLY.</h1>
          </Container>
          <Container>
            <Row className="justify-content-center">
              {
                this.props.airvisualInfo.loading ?
                <img className="loading-animation" src={require('../images/loading.gif')}/>
                : this.props.airvisualInfo.error ?
                <br></br>
                : <WeatherModal weather={this.props.airvisualInfo} />
              }
            </Row>
            <Row className="home-links text-center my-2">
              <Col className="col-12 col-sm-4">
                <Card>
                  <a href="/shops"><CardBody>
                    <CardImg src={require('../images/home-icons/shopping.png')}></CardImg>
                  </CardBody></a>
                </Card>
                <CardTitle>SHOP</CardTitle>
              </Col>
              <Col className="col-12 col-sm-4">
                <Card>
                  <a href="/eat"><CardBody>
                    <CardImg src={require('../images/home-icons/restaurants.png')}></CardImg>
                  </CardBody></a>
                </Card>
                <CardTitle>EAT</CardTitle>
              </Col>
              <Col className="col-12 col-sm-4">
                <Card>
                  <a href="/bars"><CardBody>
                    <CardImg src={require('../images/home-icons/nightlife.png')}></CardImg>
                  </CardBody></a>
                </Card>
                <CardTitle>BARS & NIGHTLIFE</CardTitle>
              </Col>
              {/*   this is for stretch      padding/margin around existing categories to pull them in closer
              <Col>
                <Card>
                  <CardBody>
                    <CardImg src={require('../images/home-icons/events.png')}></CardImg>
                  </CardBody>
                </Card>
                <CardTitle>EVENTS</CardTitle>
              </Col>
              <Col>
                <Card>
                  <CardBody>
                    <CardImg src={require('../images/home-icons/services.png')}></CardImg>
                  </CardBody>
                </Card>
                <CardTitle>SERVICES</CardTitle>
              </Col>
              */}
            </Row>
          </Container>
        </Jumbotron>
        <div className="scrolldown" onClick={this.handleScroll}><span></span></div>
        <span ref={ref}></span>
        <GeneralSearch />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  airvisualInfo: state.airvisualInfo,
  yelpInfo: state.yelpInfo,
  other: state.other,
})

export default connect(mapStateToProps, { getCurrentWeather, getPopularPlaces, displayNavbar, hideNavbar })(Home)
