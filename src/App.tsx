import React, {useState, useEffect} from 'react';
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
import Login from './View/login';
import Logout from './View/logout';
import SubmitMail from './View/submitMail';
import styles from './styles.css';
const { Header, Content, Footer } = Layout;
import MobileWarning from './MobileWarning';


const App = () => {
  const [showMobileWarning, setShowMobileWarning] = useState<boolean>(false)

useEffect(() => {
  const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
  let visitedBefore = sessionStorage.getItem('isNewSession');
  if(isMobile && !visitedBefore) 
    setShowMobileWarning(true)
}, [])

console.log("inside src/App.tsx");

    { if (showMobileWarning == true) {

      return(
      <MobileWarning 
      setShowMobileWarning={setShowMobileWarning}
      />
      )} 
    
    else {
      return(
      <>
      <StateProvider>
        <Router>
          <Layout className={classNames('Layout', styles.layout)}>
            <Header>
              <AppHeader />
            </Header>
            <Content className={styles.content}>
              <Switch>
                <Route path="/public" component={Featured} />
                <Route path="/create" component={Submission} />
                <Route path="/review" component={Review} />
                <Route path="/view" component={View} />
                <Route path="/submit-mail" component={SubmitMail} />
                <Route path="/about" component={About} /> 
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="*" component={Featured} />
              </Switch>
            </Content>
            <Footer>
              <AppFooter />
            </Footer>
          </Layout>
        </Router>
      </StateProvider>
      </>
    )
    }
  }
};

export default hot(App);
