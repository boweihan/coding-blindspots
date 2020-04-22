import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { findIndex } from 'lodash';
import ReactMDE from 'react-mde';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Spin } from 'antd';
import * as Showdown from 'showdown';
import { store } from '../store';
import { Editor, EditorOptions } from '../Editor';
import { Comment } from '../types';
import styles from './styles.css';
import 'antd/es/spin/style';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

interface ViewProps {
  location: {
    state: {
      snippetId: string;
    };
  };
}

const View = ({ location: { state } }: ViewProps) => {
  const context = useContext(store);

  const { snippetId } = state;
  const {
    state: { snippets },
  } = context;

  const { title, language, text, comments } = snippets[
    findIndex(snippets, { id: snippetId })
  ];

  const commentWidget = (comment: Comment) => {
    return (
      <div className={styles.commentContainer}>
        <ReactMDE
          className="comment__textarea"
          value={comment.text}
          selectedTab={'preview'}
          readOnly
          classes={{
            toolbar: 'comment__toolbar',
          }}
          minPreviewHeight={10}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
      </div>
    );
  };

  const createCommentWidgets = (cm: any) => {
    comments?.forEach((comment) =>
      cm.addLineWidget(
        comment.line,
        ReactDOM.render(commentWidget(comment), document.createElement('div'))
      )
    );
  };

  return (
    <div className={styles.container}>
      {!comments ||
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
        ))}
      <h2 className={styles.heading}>{title}</h2>
      <p>Public Snippet</p>
      <div>
        <EditorOptions language={language} />
        <div className={styles.editor}>
          <Editor
            key={JSON.stringify(comments)}
            text={JSON.parse(text)}
            language={language}
            onMount={(cm: any) => setTimeout(() => createCommentWidgets(cm), 0)} // setTimeout required to avoid JS Execution race condition with CodeMirror
          />
        </div>
      </div>
    </div>
  );
};

export default View;
