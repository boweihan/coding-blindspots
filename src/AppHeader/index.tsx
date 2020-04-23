import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { PlusCircleFilled, ProfileFilled } from '@ant-design/icons';
import { includes } from 'lodash';
import { Menu } from 'antd';
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
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={getDefaultSelectedKeys(pathname)}
              >
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
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={getDefaultSelectedKeys(pathname)}
              >
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
};

export default withRouter(AppHeader);
