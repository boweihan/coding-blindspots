import React, {useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  PlusCircleFilled,
  StarFilled,
  LoginOutlined,
  LogoutOutlined,
  QuestionCircleFilled,
  MailOutlined
} from '@ant-design/icons';
import { includes } from 'lodash';
import { Menu, Button } from 'antd';
import styles from './styles.css';
import 'antd/es/menu/style';
import Cookies from 'universal-cookie';
import { Searchbar } from '../Searchbar';

interface AppHeader {
  location: {
    pathname: string;
  };
  // setIsSearched: (val: boolean) => void;
  
}

// type Props = {
// }

const getDefaultSelectedKeys = (pathname: string): Array<string> => {
  let defaultSelectedKeys: any = [];
  if (includes(pathname, 'public')) {
    defaultSelectedKeys.push('1');
  } else if (includes(pathname, 'about')) {
    defaultSelectedKeys.push('2');
  } else if (includes(pathname, 'create')) {
    defaultSelectedKeys.push('3');
  } else if (includes(pathname, 'login')) {
    defaultSelectedKeys.push('4');
  } else if (includes(pathname, 'waitlist')) {
    defaultSelectedKeys.push('5');
  }

  return defaultSelectedKeys;
};

const AppHeader = ({ location: { pathname } }: AppHeader) => {

console.log("inside src/AppHeader/index.tsx");
  const cookies = new Cookies();
  const userCookie = (cookies.get('user')); // Pacman
  console.log("in Submission/index.tsx cookie is " + userCookie);
  if (userCookie == null) {
      return (
        <>
          <a href="/">
            <h1 className={styles.logo}>CodingBlindspots</h1>
          </a>
      
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={getDefaultSelectedKeys(pathname)}
          >
            <Menu.Item key="1">
              <Link to="/public">
                <StarFilled />
                Featured reviews
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/about">
                <QuestionCircleFilled />
                How it works
              </Link>
            </Menu.Item>
            <Menu.Item key="3" className="menu-create">
              <Link to="/create">
                <PlusCircleFilled />
                New submission
              </Link>
            </Menu.Item>
            <Menu.Item key="">
        <Searchbar/>
        </Menu.Item>
            <Menu.Item key="4" className="menu-login">
              <Link to="/login">
                <LoginOutlined />
                Login/Signup
              </Link>
            </Menu.Item>
            <Menu.Item key="5" className="menu-waitlist">
          <Link to="/waitlist">
          <MailOutlined />
            Waitlist
          </Link>
        </Menu.Item>
          </Menu>
        </>
      )
  }

  return (
    <>
      <a href="/">
        <h1 className={styles.logo}>CodingBlindspots</h1>
      </a>

      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={getDefaultSelectedKeys(pathname)}
      >

        <Menu.Item key="1">
          <Link to="/public">
            <StarFilled />
            Featured reviews
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/about">
            <QuestionCircleFilled />
            How it works
          </Link>
        </Menu.Item>
        <Menu.Item key="3" className="menu-create">
          <Link to="/create">
            <PlusCircleFilled />
            New submission
          </Link>
        </Menu.Item>
        <Menu.Item key="">
        <Searchbar />
        </Menu.Item>
        <Menu.Item key="4" className="menu-login">
          <Link to="/logout">
           { userCookie + " " }
            <LogoutOutlined />
            Logout
          </Link>
        </Menu.Item>
        <Menu.Item key="5" className="waitlist">
          <Link to="/waitlist">
          <MailOutlined />
            Waitlist
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default withRouter(AppHeader);
