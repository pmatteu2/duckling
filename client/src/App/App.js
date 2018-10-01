import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import Buisiness from './pages/Buisiness';

class App extends Component {
  //<Route exact path='/' component={Home}/>
  // <Route path='/list' component={List}/>
  render() {
    const App = () => (
      <div>
        <Switch>
          
          <Route exact path='/' component={List}/>
          <Route path='/buisiness/:bid' component={Buisiness}/>
          
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
