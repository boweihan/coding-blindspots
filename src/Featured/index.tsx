import React, { useEffect, useState } from 'react';
import { Tooltip, List, Card, Badge } from 'antd';
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

const Featured = () => {
  console.log('inside src/Featured/index.tsx');
  const [languages, setLanguages] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const storeContext = useContext(store);
  const {
    snippets: { data: snippets, setSnippets },
    loading: { data: pageLoading, setPageLoading },
  } = storeContext;
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

  const displayedSnips = selectedLanguage
    ? snippets.filter((s: Snippet) => s.language === selectedLanguage)
    : snippets;

  return (
    <div className={styles.container}>
      {location.search ? (
        <div>
          <h2>{displayedSnips.length} results found</h2>
          <div className={styles.languagesCount}>
            {languages.map((lang) => (
              <div
                className={styles.badge}
                onClick={() => setSelectedLanguage(lang.language)}
                key={lang.language}
              >
                <Badge
                  style={{
                    backgroundColor:
                      lang.language === selectedLanguage
                        ? '#52c41a'
                        : '#ff4d4f',
                  }}
                  key={lang.language}
                  count={`${lang.language} ${lang.count}`}
                />
              </div>
            ))}
            <div
              onClick={() => setSelectedLanguage('')}
              className={styles.badge}
            >
              <Badge
                style={{ backgroundColor: '#000000' }}
                count={`reset`}
              ></Badge>
            </div>
          </div>
        </div>
      ) : //todo: add code for result no + language filter for featured
      null}

      <List
        grid={{
          gutter: 16,
          xs: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={displayedSnips || []}
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
