import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  PlusCircleFilled,
  StarFilled,
  LoginOutlined,
  QuestionCircleFilled
} from '@ant-design/icons';
import { includes } from 'lodash';
import { Menu, Button } from 'antd';
import Media from 'react-media';
import styles from './styles.css';
import 'antd/es/menu/style';

interface AppHeader {
  location: {
    pathname: string;
  };
}

const getDefaultSelectedKeys = (pathname: string): Array<string> => {
  let defaultSelectedKeys: any = [];

  if (includes(pathname, 'create')) {
    defaultSelectedKeys.push('1');
  } else if (includes(pathname, 'public')) {
    defaultSelectedKeys.push('2');
  }

  return defaultSelectedKeys;
};

const AppHeader = ({ location: { pathname } }: AppHeader) => {
  return (
    <>
      <a href="/">
        <h1 className={styles.logo}>CodingBlindspots</h1>
      </a>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={getDefaultSelectedKeys(pathname)}
      >
        <Menu.Item key="1">
          <Link to="/create">
            <PlusCircleFilled />
            New submission
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/public">
            <StarFilled />
            Featured reviews
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/about">
            <QuestionCircleFilled />
            How it works
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/login">
            <LoginOutlined />
            Login/Signup
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default withRouter(AppHeader);
