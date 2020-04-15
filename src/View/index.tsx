import React, { useContext } from 'react';
import { List, Card, Button } from 'antd';
import { Snippet } from '../types';
import styles from './styles.css';
import 'antd/es/list/style';
import 'antd/es/card/style';
import 'antd/es/button/style';

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
