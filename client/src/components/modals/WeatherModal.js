import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col
} from 'reactstrap'

import '../../App.css'

class WeatherModal extends Component {

  state = {
    modal: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    return (
      <>
        <div className="weather-panel bg-transparent border-0 text-center" onClick={this.toggle}>
          <img className="weather-icon" src={require(`../../images/weather-icons/${this.props.weather.weatherIcon}.png`)} />
          <div className="weather-info text-white text-left">
            <h2>{this.props.weather.airvisualInfo.current.weather.tp}°C</h2>
          </div>
        </div>
        <Modal
          className="weather-modal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Weather</ModalHeader>
          <ModalBody className="weather-modal-content">
            <Row>
              <Col className="col-12">
                <Row className="justify-content-center">
                  <img className="weather-icon" src={require(`../../images/weather-icons/${this.props.weather.weatherIcon}.png`)} />
                </Row>
                <Row className="justify-content-center">
                  <h2>{this.props.weather.airvisualInfo.current.weather.tp}°C</h2>
                </Row>
              </Col>
              <Col className="col-12 weather-description">
                <div>
                  <h6>Wind: {this.props.weather.airvisualInfo.current.weather.ws}km</h6>
                  <h6>Humidity: {this.props.weather.airvisualInfo.current.weather.hu}%</h6>
                  <h6>Pressure: {this.props.weather.airvisualInfo.current.weather.pr}hPa</h6>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

export default WeatherModal
