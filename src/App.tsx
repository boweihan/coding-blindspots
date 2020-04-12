import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import classNames from 'classnames';
import { Layout } from 'antd';
import 'antd/es/Layout/style';

import { StateProvider } from './store';
import Nav from './Nav';
import styles from './styles.css';

const App = () => {
  return (
    <StateProvider>
      <Router>
        <Layout className={classNames('Layout', styles.layout)}>
          <Nav />
          <Switch>
            <Route path="/create">Create New Snippet</Route>
            <Route path="/public">Featured Snippets</Route>
            <Route path="/">Create New Snippet</Route>
          </Switch>
        </Layout>
      </Router>
    </StateProvider>
  );
};

export default hot(App);
