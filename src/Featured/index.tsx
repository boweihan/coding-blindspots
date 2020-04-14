import React, { useContext } from 'react';
import { List, Card } from 'antd';
import { store } from '../store';
import styles from './styles.css';
import 'antd/es/List/style';
import 'antd/es/Card/style';

// hacky but works for now
function isJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

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
            <Card title={snippet.title || 'Snippet'}>
              Language: {snippet.language}
              <div className={styles.snippet}>
                {isJson(snippet.text) ? JSON.parse(snippet.text) : snippet.text}
              </div>
            </Card>
          </List.Item>
        )}
      />
      ,
    </div>
  );
};

export default Submission;
