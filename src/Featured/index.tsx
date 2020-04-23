import React, { useEffect, useState } from 'react';
import { Tooltip, List, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import RestClient from '../shared/rest';
import { parseIfJson } from '../shared/util';
import styles from './styles.css';
import { Snippet } from '../types';
import 'antd/es/list/style';
import 'antd/es/card/style';
import 'antd/es/button/style';
import 'antd/es/tooltip/style';

const Featured = () => {
  const [loaded, setLoaded] = useState(false);
  const [snippets, setSnippets] = useState<Array<Snippet>>([]);

  useEffect(() => {
    RestClient.get('/snippets')
      .then((snippets) => setSnippets(snippets))
      .then(() => setLoaded(true));
  }, []);

  return (
    <div className={styles.container}>
      <List
        loading={!loaded}
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
              extra={snippet.language}
              actions={[
                <Link
                  to={{
                    pathname: '/review',
                    hash: `#${snippet.id}`,
                  }}
                >
                  <Button>Review</Button>
                </Link>,
              ]}
            >
              <Link
                to={{
                  pathname: '/view',
                  hash: `#${snippet.id}`,
                }}
              >
                <Tooltip title="View Snippet">
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
