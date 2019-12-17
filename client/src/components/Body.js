import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './Home'
import Profile from './Profile'
import Category from './Category'
import PlacePage from './PlacePage'
import GeneralSearch from './GeneralSearch'
import InfoLoaded from './InfoLoaded'

class Body extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {


  }

  render() {
    return (
      <div className="page-content">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ () => <Home /> } />
            <Route exact path="/profile" render={ () => localStorage.getItem('token') != null ? <Profile /> : <Redirect to={{ pathname: '/' }} /> } />
            <Route exact path="/search" render={ () => <InfoLoaded page="generalSearch"><GeneralSearch /></InfoLoaded> } />
            <Route exact path="/shops" render={ () => <InfoLoaded page="category" categoryType="shopping"><Category categoryName="shopping" categoryType="shopping" /></InfoLoaded> } />
            <Route exact path="/eat" render={ () => <InfoLoaded page="category" categoryType="restaurants"><Category categoryName="restaurants" categoryType="restaurants" /></InfoLoaded> } />
            <Route exact path="/bars" render={ () => <InfoLoaded page="category" categoryType="bars,nightlife"><Category categoryName="nightlife" categoryType="bars,nightlife" /></InfoLoaded> } />
  {/*              <Route exact path="/services" render={ () => <Category categoryName="services" categoryType="
                  need new reducer to deal with large categories" /> } />*/}
            <Route exact path="/places/:id" render={ ({match}) => <InfoLoaded id={match.params.id} page="place-page"><PlacePage url={match.params.id} /></InfoLoaded> } />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});


export default connect(mapStateToProps, {})(Body)
