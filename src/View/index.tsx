import React, { useContext } from 'react';
import { findIndex } from 'lodash';
import { Redirect } from 'react-router-dom';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Spin } from 'antd';
import { parseIfJson } from '../shared/util';
import { addCommentLineWidget } from '../CommentWidget';
import { store } from '../store';
import { Editor, EditorOptions } from '../Editor';
import styles from './styles.css';
import 'antd/es/spin/style';

interface ViewProps {
  location: {
    hash: string;
  };
}

const View = ({ location }: ViewProps) => {
  const context = useContext(store);

  // get snippet from location and context
  const snippetId = location.hash.slice(1);
  const {
    state: { snippets },
  } = context;
  const snippet = snippets[findIndex(snippets, { id: snippetId })];

  if (!snippet) {
    // redirect to create page if snippet not found
    return <Redirect to="/create" />;
  }

  const { title, language, text, comments } = snippet;

  const createCommentWidgets = (cm: any) => {
    comments?.forEach((comment) => addCommentLineWidget(cm, comment));
  };

  const statusContainer =
    !comments ||
    (comments.length <= 0 ? (
      <div className={styles.statusContainer}>
        <Spin size="small" />
        <span className={styles.loadingText}>pending review</span>
      </div>
    ) : (
      <div className={styles.statusContainer}>
        <CheckCircleTwoTone twoToneColor="#52c41a" />
        <span className={styles.successText}>review complete</span>
      </div>
    ));

  return (
    <div className={styles.container}>
      {statusContainer}
      <h2 className={styles.heading}>{title}</h2>
      <p>Public Snippet</p>
      <div>
        <EditorOptions language={language} />
        <div className={styles.editor}>
          <Editor
            key={JSON.stringify(comments)}
            text={parseIfJson(text)}
            language={language}
            // setTimeout required to avoid JS Execution race condition with CodeMirror
            onMount={(cm: any) => setTimeout(() => createCommentWidgets(cm), 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default View;
