import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { findIndex } from 'lodash';
import { Input, Button } from 'antd';
import { store } from '../store';
import { Editor, EditorOptions } from '../Editor';
import { Comment } from '../types';
import styles from './styles.css';
import 'antd/es/input/style';
import 'antd/es/button/style';
import 'antd/es/modal/style';

const { TextArea } = Input;

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

  const { language, text, comments } = snippets[
    findIndex(snippets, { id: snippetId })
  ];

  const commentWidget = (comment: Comment) => (
    <div className={styles.commentContainer}>
      <TextArea className="comment__textarea" value={comment.text} autoSize />
    </div>
  );

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
      <h2 className={styles.heading}>View Feedback</h2>
      <div>
        <EditorOptions language={language} />
        <Editor
          key={JSON.stringify(comments)}
          text={JSON.parse(text)}
          language={language}
          onMount={(cm: any) => setTimeout(() => createCommentWidgets(cm), 0)} // setTimeout required to avoid JS Execution race condition with CodeMirror
        />
      </div>
    </div>
  );
};

export default View;
