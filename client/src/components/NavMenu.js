import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import '../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class NavMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false //modal
    };
  }

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <>
      {
        this.props.other.navbarShowing ?
        <Navbar className="navigation fixed-top py-4 " style={{width: '100vw', backgroundColor: '#ADD8E6'}} dark expand="lg">
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
                <NavLink href="/events" className="px-3" style={{color: 'white', fontWeight: 600}}>EVENTS</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/services" className="px-3" style={{color: 'white', fontWeight: 600}}>SERVICES</NavLink>
              </NavItem>
            </Nav>
            <Nav navbar className="ml-auto pr-4" style={{backgroundColor: '#ADD8E6'}}>
              <NavItem>
                <NavLink href="/login" className="px-3" style={{color: 'white', fontWeight: 600}}>LOGIN</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register" className="px-3" style={{color: 'white', fontWeight: 600}}>REGISTER</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
       : null
      }
      </>
    )
  }
}

NavMenu.propTypes = {
  other: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  other: state.other
});


export default connect(mapStateToProps)(NavMenu);
