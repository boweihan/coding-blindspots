import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { findIndex } from 'lodash';
import { Input, Button, message } from 'antd';
import { store } from '../store';
import { Editor, EditorOptions } from '../Editor';
import { Comment } from '../types';
import styles from './styles.css';
import 'antd/es/input/style';
import 'antd/es/button/style';
import 'antd/es/modal/style';

const { TextArea } = Input;

interface ReviewProps {
  location: {
    state: {
      snippetId: string;
    };
  };
}

const widgets: any = [];

const Review = ({ location: { state } }: ReviewProps) => {
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

  const addComment = (comment: Comment) =>
    context.dispatch({
      type: 'SAVE_COMMENT',
      payload: {
        snippetId,
        comment,
      },
    });

  const removeInputWidgets = (cm: any) => {
    for (let i = 0; i < widgets.length; i++) {
      cm.removeLineWidget(widgets[i]);
    }
  };

  const createInputWidget = (cm: any, line: number) => {
    return (
      <div className={styles.widgetContainer}>
        <TextArea className="review__textarea" rows={3} />
        <div className={styles.widgetButtons}>
          <Button type="dashed" onClick={() => removeInputWidgets(cm)}>
            Cancel
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              addComment({
                id: String(new Date().getTime()),
                line,
                text: document.getElementsByClassName('review__textarea')[0]
                  .innerHTML,
              });
              message.success('Comment added!');
            }}
          >
            Add Comment
          </Button>
        </div>
      </div>
    );
  };

  const addInputLineWidget = (cm: any, event: any) => {
    console.log(cm);
    removeInputWidgets(cm);
    const line = event.line;
    widgets.push(
      cm.addLineWidget(
        line,
        ReactDOM.render(
          createInputWidget(cm, line),
          document.createElement('div')
        )
      )
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Submit Question and Code</h2>
      <div>
        <EditorOptions language={language} />
        <Editor
          key={JSON.stringify(comments)}
          text={JSON.parse(text)}
          language={language}
          onKeyDown={addInputLineWidget}
          onMount={(cm: any) => setTimeout(() => createCommentWidgets(cm), 0)} // setTimeout required to avoid JS Execution race condition with CodeMirror
        />
        <div className={styles.submit}>
          <Button type="primary" onClick={() => {}}>
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Review;
