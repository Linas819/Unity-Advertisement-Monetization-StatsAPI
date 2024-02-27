import React, { Component } from 'react';
import './custom.css';
import 'semantic-ui-css/semantic.min.css'
import Home from './components/Home';
import Monetization from './components/Monetization/Monetization';
import Acquire from './components/Acquire/Acquire';
import { Route, Switch } from 'react-router-dom';
import ErrorModal from './components/ErrorModal/ErrorModal';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/monetization" component={Monetization} exact/>
          <Route path="/acquire" component={Acquire} exact/>
        </Switch>
        <ErrorModal/>
      </div>
    );
  }
}
