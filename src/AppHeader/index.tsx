import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleFilled, ProfileFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import Media from 'react-media';
import styles from './styles.css';
import 'antd/es/menu/style';

const AppHeader = () => (
  <>
    <h1 className={styles.logo}>CodingBlindspots</h1>
    <Media
      queries={{
        small: '(max-width: 600px)',
        large: '(min-width: 601px)',
      }}
    >
      {(matches) => (
        <>
          {matches.small && (
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/create" className={styles.smallIconLink}>
                  <PlusCircleFilled />
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/public" className={styles.smallIconLink}>
                  <ProfileFilled />
                </Link>
              </Menu.Item>
            </Menu>
          )}
          {matches.large && (
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/create">
                  <PlusCircleFilled />
                  Submit
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/public">
                  <ProfileFilled />
                  Featured
                </Link>
              </Menu.Item>
            </Menu>
          )}
        </>
      )}
    </Media>
  </>
);

export default AppHeader;
