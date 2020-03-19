import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

import '../../App.css'

import { login, clearAuthError } from '../../actions/authActions'

class LoginModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      loginName: '',
      password: '',
      warningShowing: false
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.modal) {
      if (this.props.auth.authenticated) {
        this.toggle()
      }
    }

    if (this.props.auth.error && this.props.auth.error !== prevProps.auth.error) {
      this.setState({ warningShowing: true })
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  loginAccount = () => {
    this.props.clearAuthError()
    const { loginName, password } = this.state
    this.props.login({loginName, password})
  }

  render() {
    return (
      <div className="login-modal">
        <NavLink onClick={this.toggle} className="px-3" style={{color: 'white', fontWeight: 600}}>LOGIN</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="login-name-field">Username</Label>
                <Input type="text" name="loginName" id="login-name-field" onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Label for="password-field">Password</Label>
                <Input type="password" name="password" id="password-field" onChange={this.onChange} />
              </FormGroup>
              { this.state.warningShowing && <p className="text-danger">Login failed.</p> }
              <FormGroup>
                <img className="facebook-logo" src={require('../../images/facebook.png')}></img>
                <a href="http://localhost:5000/api/auth/facebook"><Label for="facebook-login" className="facebook-link">&nbsp;&nbsp;Login with Facebook</Label></a>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.loginAccount}>Login</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { login, clearAuthError })(LoginModal)
