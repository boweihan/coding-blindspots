import React from 'react';
import { Link } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import 'antd/es/Layout/style';
import 'antd/es/Menu/style';

import styles from './styles.css';

const { Header } = Layout;

const Nav = () => {
  return (
    <Header>
      <h1 className={styles.logo}>CIF</h1>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/create">
            <PlusOutlined />
            Submit
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/public">Featured</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Nav;
