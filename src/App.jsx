'use strict';
import React, { Component } from 'react'
import { observer } from 'mobx-react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import PongContainer from './PongContainer';
import pongStore from './PongStore';

class App extends Component {
  render() {

    var PongContainerWithStore = React.createClass({
      render: function() {
        console.log("Creating a pong game connected to the MobX store");
        return <PongContainer store={pongStore} router={this.props.router} />
      }
    })

    return (
      <Router history={hashHistory}>
        <Route path='/' component={PongContainerWithStore} />
      </Router>
    )
  }
}

export default App