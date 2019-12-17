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
  Input
} from 'reactstrap';

import { register } from '../../actions/authActions'

class RegisterModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
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

  createAccount = () => {
    console.log(this.state)
    const { email, username, password, confirmPassword } = this.state;
    if (password != confirmPassword) {
      console.log("Wrong password")
    } else {
      var user = { email, username, password }
      this.props.register(user)
    }
  }

  render() {
    return (
      <div className="register-modal">
        <NavLink onClick={this.toggle} className="px-3" style={{color: 'white', fontWeight: 600}}>REGISTER</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="email-field">Email</Label>
                <Input type="email" name="email" id="email-field" onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Label for="username-field">Username</Label>
                <Input type="text" name="username" id="username-field" onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Label for="password-field">Password</Label>
                <Input type="password" name="password" id="password-field" onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Label for="confirm-password-field">Confirm Password</Label>
                <Input type="password" name="confirmPassword" id="confirm-password-field" onChange={this.onChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.createAccount}>Create Account</Button>{' '}
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

export default connect(mapStateToProps, { register })(RegisterModal)
