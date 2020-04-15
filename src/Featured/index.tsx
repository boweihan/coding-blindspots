import React, { useContext } from 'react';
import { List, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { store } from '../store';
import styles from './styles.css';
import 'antd/es/list/style';
import 'antd/es/card/style';
import 'antd/es/button/style';

// // hacky but works for now
// function isJson(str: string) {
//   try {
//     JSON.parse(str);
//   } catch (e) {
//     return false;
//   }
//   return true;
// }

const Featured = () => {
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
            <Card
              title={snippet.title || 'Snippet'}
              actions={[
                <Link
                  to={{
                    pathname: '/view',
                    hash: `#${snippet.id}`,
                    state: { snippet },
                  }}
                >
                  <Button>View</Button>
                </Link>,
                <Link
                  to={{
                    pathname: '/review',
                    hash: `#${snippet.id}`,
                    state: { snippetId: snippet.id },
                  }}
                >
                  <Button>Review</Button>
                </Link>,
              ]}
            >
              Language: {snippet.language}
              {/* <div className={styles.snippet}>
                {isJson(snippet.text) ? JSON.parse(snippet.text) : snippet.text}
              </div> */}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Featured;
