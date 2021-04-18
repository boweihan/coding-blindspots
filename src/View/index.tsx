import React, { useEffect, useState } from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Spin } from 'antd';
import PageLoad from '../PageLoad';
import NoSnippetFound from '../NoSnippetFound';
import RestClient from '../shared/rest';
import { parseIfJson } from '../shared/util';
import { addCommentLineWidget } from '../CommentWidget';
import { Editor, EditorOptions } from '../Editor';
import { Snippet, Comment } from '../types';
import styles from './styles.css';
import 'antd/es/spin/style';

interface ViewProps {
  location: {
    hash: string;
  };
}

const View = ({ location }: ViewProps) => {
  const [loaded, setLoaded] = useState(false);
  const [snippet, setSnippet] = useState<Snippet>();
  const [comments, setComments] = useState<Array<Comment>>([]);
  const snippetId = location.hash.slice(1);

  useEffect(() => {
    // todo use Promise.all
    RestClient.get(`/snippets/${snippetId}`)
      .then((snippet) => setSnippet(snippet))
      .then(() =>
        //RestClient.get(`/comments/`)
        RestClient.get(`/snippets/${snippetId}/comments`)
          .then((comments) => setComments(comments))
          .then(() => setLoaded(true))
      )
      .catch(() => {
        setLoaded(true);
      });
  }, []);

  const createCommentWidgets = (cm: any) => {
    comments?.forEach((comment) => addCommentLineWidget(cm, comment));
  };

  const statusContainer =
    !comments ||
    (comments.length <= 0 ? (
      <div className={styles.statusContainer}>
        <Spin size="small" />
        <span className={styles.loadingText}>Review pending</span>
      </div>
    ) : (
      <div className={styles.statusContainer}>
        <CheckCircleTwoTone twoToneColor="#52c41a" />
        <span className={styles.successText}>Review complete</span>
      </div>
    ));

  if (!loaded) {
    return <PageLoad text="Loading Snippets…" />;
  }

  if (!snippet) {
    return <NoSnippetFound />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        {snippet.title}
      </h2>
      <div className={styles.info}>
        {statusContainer}
        <div className={styles.tagContainer}>
          <span className={styles.tag}>{snippet.language}</span>
          <span className={styles.tag}>Public Snippet</span>
        </div>
      </div>
      <div className={styles.editorContainer}>
        <div className={styles.editor}>
          <Editor
            key={JSON.stringify(comments)}
            text={parseIfJson(snippet.text)}
            language={snippet.language}
            // setTimeout required to avoid JS Execution race condition with CodeMirror
            onMount={(cm: any) => setTimeout(() => createCommentWidgets(cm), 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default View;
