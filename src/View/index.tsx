import React, { useContext } from 'react';
import { List, Card, Button } from 'antd';
import { Snippet } from '../types';
import styles from './styles.css';
import 'antd/es/List/style';
import 'antd/es/Card/style';
import 'antd/es/Button/style';

interface ViewProps {
  location: {
    state: {
      snippet: Snippet;
    };
  };
}

const View = ({ location: { state } }: ViewProps) => {
  const { snippet } = state;
  return <div className={styles.container}></div>;
};

export default View;
