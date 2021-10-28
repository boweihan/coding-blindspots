import React, { useEffect, useState } from 'react';
import { Tooltip, List, Card, Badge, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import PageLoad from '../PageLoad';
import { parseIfJson } from '../shared/util';
import styles from './styles.css';
import { Snippet } from '../types';
import 'antd/es/list/style';
import 'antd/es/card/style';
import 'antd/es/button/style';
import 'antd/es/tooltip/style';
import 'antd/es/badge/style';
import { useContext } from 'react';
import { store } from '../store';
import { getSnippets } from '../services/api/snippets';
import { searchSnippets } from '../services/api/search';
import filterArray from '../shared/utils/group-by';

//add selectedLanguage state
//add filteredSnippet state
//do useEffect for selectedLanguage
//filter out snippets for selected language
//setFilteredSnippets

const Featured = () => {
  const [languages, setLanguages] = useState<any[]>([]);
  const storeContext = useContext(store);
  const {
    snippets: { data: snippets, setSnippets },
    loading: { data: pageLoading, setPageLoading },
  } = storeContext;
  console.log('inside src/Featured/index.tsx');
  let location = useLocation();

  useEffect(() => {
    fetchSnippets();
  }, [location.search]);

  const fetchSnippets = async () => {
    setPageLoading(true);
    let snippetResp = [];
    let groupedLanguages: any[] = [];
    if (location.search) {
      let params = new URLSearchParams(location.search);
      const q = params.get('q');
      snippetResp = await searchSnippets(q || '');
      const groupedSnippets = filterArray(snippetResp, 'language');
      groupedLanguages = Object.keys(groupedSnippets).map((k) => ({
        language: k,
        count: groupedSnippets[k].length,
      }));
    } else {
      snippetResp = await getSnippets();
    }
    setSnippets(snippetResp);
    setLanguages(groupedLanguages);
    setPageLoading(false);
  };

  if (pageLoading) {
    return <PageLoad text="Loading Snippets…" />;
  }

  console.log(languages, 'languages');
  console.log(`location.search`, location.search);

  //selectedLanguages ? filteredSnippets : snippets
  return (
    <div className={styles.container}>
      {location.search ? (
        <div>
          <h2>{snippets.length} results found</h2>
          <div className={styles.languagesCount}>
            {languages.map((lang) => (
              <Badge key={lang.id} count={`${lang.language} ${lang.count}`} />
            ))}
          </div>
        </div>
      ) : null}

      <List
        grid={{
          gutter: 16,
          xs: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={snippets || []}
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
