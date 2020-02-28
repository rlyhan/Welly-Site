import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { connect } from 'react-redux'

import '../App.css'

class Profile extends Component {

  constructor() {
    super()
    this.state = {
      currentPage: 1,
      backButtonDisabled: true,
      nextButtonDisabled: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentPage !== prevState.currentPage) {
      // Disable back button if current page = 1
      if (this.state.currentPage == 1) {
        this.setState({ backButtonDisabled: true })
      } else {
        this.setState({ backButtonDisabled: false })
      }
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

  getStartIndex() {
    return (this.state.currentPage - 1) * 10
  }

  render() {

    return (
      <Container className="profile">
      {
        this.props.auth.user ?
        <>
          <Row>
            <Col>
              <h4>Profile</h4>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col className="col-12 col-sm-4 mb-3">
              <Card className="text-center">
                <CardBody className="profile-image">
                  <CardImg top width="100%" src={require("../images/user.png")} alt="Profile image"/>
                </CardBody>
                <CardBody>
                  <CardTitle><strong>{this.props.auth.user.username}</strong></CardTitle>
                  <CardText className="text-center">Welcome to your profile</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col className="col-12 col-sm-8">
              <Card>
                <CardBody>
                  <CardTitle><h5>FAVOURITES</h5></CardTitle>
                    <ul style={{paddingLeft: "0"}}>
                    {
                      this.props.auth.user.favouritePlaces ?
                      this.props.auth.user.favouritePlaces.slice(this.getStartIndex(), this.getStartIndex()+9).map((place, index) => {
                        return <NavLink key={index} href={`/places/${place.yelpId}`} style={{paddingLeft: '0'}}>{(place.name).toUpperCase()}</NavLink>
                      }) : <div className="search-end"><img className="loading-animation" src={require('../images/loading.gif')}/></div>
                    }
                    </ul>
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </> : <div className="search-end"><img className="loading-animation" src={require('../images/loading.gif')} alt="loading" /></div>
      }
      </Container>
    )

  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {  })(Profile)
