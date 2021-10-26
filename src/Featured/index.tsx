import React, { useEffect, useState, useRef } from 'react';
import { Tooltip, List, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import PageLoad from '../PageLoad';
import RestClient from '../shared/rest';
import { parseIfJson } from '../shared/util';
import styles from './styles.css';
import { Snippet } from '../types';
import 'antd/es/list/style';
import 'antd/es/card/style';
import 'antd/es/button/style';
import 'antd/es/tooltip/style';
import { useContext } from 'react';
import { store } from '../store';

const Featured = () => {
  const storeContext = useContext(store);
  const c = storeContext.snippets;
  console.log(c, 'CHECK');
  const [loaded, setLoaded] = useState(false);
  // const [snippets, setSnippets] = useState<Array<Snippet>>([]);
  console.log('inside src/Featured/index.tsx');

  useEffect(() => {
    RestClient.get('/snippets/')
      .then((snippets) =>
        c.dispatch({ type: 'SET_SNIPPETS', payload: {snippets} })
      )
      // .then((snippets) => setSnippets(snippets))
      .then(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return <PageLoad text="Loading Snippets…" />;
  }

  const snippets = c.state || [];
  console.log(snippets, "SNIPPSS")
  return (
    <div className={styles.container}>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={snippets?.snippets || []}
        renderItem={(snippet: Snippet) => (
          <List.Item>
            <Card
              title={snippet.title || 'Snippet'}
              extra={snippet.language}
              hoverable={false}
              bodyStyle={{
                padding: '12px 24px 0 24px',
              }}
              actions={[
                <Link
                  to={{
                    pathname: '/review',
                    hash: `#${snippet.id}`,
                  }}
                >
                  Show review
                </Link>,
              ]}
            >
              <Link
                to={{
                  pathname: '/review',
                  hash: `#${snippet.id}`,
                }}
              >
                <Tooltip title="View Snippet 👁">
                  <div className={styles.snippetContainer}>
                    <div className={styles.snippet}>
                      {parseIfJson(snippet.text)}
                    </div>
                  </div>
                </Tooltip>
              </Link>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Featured;
