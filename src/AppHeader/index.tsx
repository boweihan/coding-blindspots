import React from 'react';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import styles from './styles.css';
import 'antd/es/Menu/style';

const AppHeader = () => (
  <>
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
  </>
);

export default AppHeader;
