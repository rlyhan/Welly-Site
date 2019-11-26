import React, { Component } from 'react';

import NavMenu from './components/NavMenu';
import Body from './components/Body'
import Footer from './components/Footer';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <NavMenu />
          <Body />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
