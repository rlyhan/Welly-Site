import React, { Component } from 'react'

import NavMenu from './components/NavMenu'
import Body from './components/Body'
import Footer from './components/Footer'

import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends Component {

  constructor() {
    super()
  }

  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
        {
          store.getState().auth.authenticated ?
          <div className="search-end"><img className="loading-animation" src={require('./images/loading.gif')}/></div>
          :
          <>
            <NavMenu />
            <Body />
            <Footer />
          </>
        }
        </div>
      </Provider>
    )
  }
}

export default App
