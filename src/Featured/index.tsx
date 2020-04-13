import React, { useContext } from 'react';
import { List, Card } from 'antd';
import { store } from '../store';
import styles from './styles.css';
import 'antd/es/List/style';
import 'antd/es/Card/style';

const Submission = () => {
  const context = useContext(store);
  const {
    state: { snippets },
  } = context;

  return (
    <div className={styles.container}>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          md: 2,
          lg: 3,
          xl: 4,
        }}
        dataSource={snippets}
        renderItem={(snippet) => (
          <List.Item>
            <Card title={snippet.title}>
              Language: {snippet.language} {snippet.text}
            </Card>
          </List.Item>
        )}
      />
      ,
    </div>
  );
};

export default Submission;
