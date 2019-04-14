import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PageNotFound from './components/PageNotFound';
import FindPlaces from './containers/FindPlaces';
import Layout from './components/Layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path={'/'} exact component={LandingPage} />
          <Route path={'/findplaces'} exact component={FindPlaces} />
          <Route path={'*'} component={PageNotFound} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
