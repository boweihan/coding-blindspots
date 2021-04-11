import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import classNames from 'classnames';
import { StateProvider } from './store';
import { Layout } from 'antd';
import 'antd/es/layout/style';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Submission from './Submission';
import Featured from './Featured';
import Review from './Review';
import About from './About';
import View from './View';
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
          <Content className={styles.content}>
            <Switch>
              <Route path="/create" component={Submission} />
              <Route path="/public" component={Featured} />
              <Route path="/review" component={Review} />
              <Route path="/view" component={View} />
              <Route path="/about" component={About} />
              <Route path="*" component={Submission} />
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
