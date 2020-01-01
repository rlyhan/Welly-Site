import React, { Component } from 'react'

import NavMenu from './components/NavMenu'
import Body from './components/Body'
import '../App.css'

import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
        {
          store.getState().auth.authenticated ?
          <div className="search-end"><img className="loading-animation" src={require('./images/loading.gif')} alt="loading"/></div>
          :
          <>
            <NavMenu />
            <Body />
          </>
        }
        </div>
      </Provider>
    )
  }
}

export default App
