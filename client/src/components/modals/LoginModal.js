import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  Input,
  FormText
} from 'reactstrap';

import { login } from '../../actions/authActions'

class LoginModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      loginName: '',
      password: '',
      msg: null
    }
  }

  componentDidUpdate() {
    if (this.state.modal) {
      if (this.props.auth.authenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  loginAccount = () => {
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
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.loginAccount}>Login</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { login })(LoginModal)
