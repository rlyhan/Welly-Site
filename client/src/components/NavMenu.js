import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import '../App.css'
import { connect } from 'react-redux'

import RegisterModal from './modals/RegisterModal'
import LoginModal from './modals/LoginModal'
import { logout } from '../actions/authActions'

class NavMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <>
      {
        this.props.other.navbarShowing ?
        <Navbar className="navigation fixed-top py-4" style={{width: '100vw', backgroundColor: '#ADD8E6'}} dark expand="lg">
          <NavbarBrand href="/" className="logo px-3">WELLY.</NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="pr-3" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar style={{backgroundColor: '#ADD8E6'}}>
              <NavItem>
                <NavLink href="/shops" className="px-3" style={{color: 'white', fontWeight: 600}}>SHOPS</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/eat" className="px-3" style={{color: 'white', fontWeight: 600}}>EAT</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/bars" className="px-3" style={{color: 'white', fontWeight: 600}}>BARS & NIGHTLIFE</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/search" className="px-3" style={{color: 'white', fontWeight: 600}}>BROWSE ALL</NavLink>
              </NavItem>
              {/*
              <NavItem>
                <NavLink href="/events" className="px-3" style={{color: 'white', fontWeight: 600}}>EVENTS</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/services" className="px-3" style={{color: 'white', fontWeight: 600}}>SERVICES</NavLink>
              </NavItem>
              */}
            </Nav>
            <Nav navbar className="ml-auto pr-4" style={{backgroundColor: '#ADD8E6'}}>
            {
              this.props.auth.loading ?
              null
              :
              <>
              {
                this.props.auth.authenticated ?
                <>
                  <NavItem className="profile-button">
                    <NavLink href="/profile" className="px-3" style={{color: 'white', fontWeight: 600}}>PROFILE</NavLink>
                  </NavItem>
                  <NavItem className="logout-button">
                    <NavLink className="px-3" style={{color: 'white', fontWeight: 600}} onClick={this.props.logout}>LOGOUT</NavLink>
                  </NavItem>
                </>
                :
                <>
                  <NavItem>
                    <LoginModal />
                  </NavItem>
                  <NavItem>
                    <RegisterModal />
                  </NavItem>
                </>
              }
              </>
            }
            </Nav>
          </Collapse>
        </Navbar>
       : null
      }
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  other: state.other
})


export default connect(mapStateToProps, { logout })(NavMenu)
