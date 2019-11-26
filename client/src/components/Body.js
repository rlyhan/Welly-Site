import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Category from './Category';
import PlacePage from './PlacePage';
import InfoLoaded from './InfoLoaded';

class Body extends Component {

  constructor(props) {
    super(props);
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
            <Route exact path="/shops" render={ () => <Category categoryName="shopping" categoryType="shopping" /> } />
            <Route exact path="/eat" render={ () => <Category categoryName="restaurants" categoryType="restaurants" /> } />
            <Route exact path="/bars" render={ () => <Category categoryName="nightlife" categoryType="bars,nightlife" /> } />
  {/*              <Route exact path="/services" render={ () => <Category categoryName="services" categoryType="
                  need new reducer to deal with large categories" /> } />*/}
            <Route exact path="/places/:id" render={ ({match}) => <InfoLoaded id={match.params.id}><PlacePage /></InfoLoaded> } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Body;
