import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import classNames from 'classnames';
import { StateProvider } from './store';
import { Layout } from 'antd';
import 'antd/es/Layout/style';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Submission from './Submission';
import styles from './styles.css';
const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <StateProvider>
      <Router>
        <Layout className={classNames('Layout', styles.layout)}>
          <Header>
            <AppHeader />
          </Header>
          <Content>
            <Switch>
              <Route path="/create">
                <Submission />
              </Route>
              <Route path="/public">Featured Snippets</Route>
              <Route path="/">
                <Submission />
              </Route>
            </Switch>
          </Content>
          <Footer>
            <AppFooter />
          </Footer>
        </Layout>
      </Router>
    </StateProvider>
  );
};

export default hot(App);
