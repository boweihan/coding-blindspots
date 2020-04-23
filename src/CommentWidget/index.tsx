import React from 'react';
import ReactDOM from 'react-dom';
import ReactMDE from 'react-mde';
import * as Showdown from 'showdown';
import { Comment } from '../types';
import styles from './styles.css';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

interface ViewProps {
  comment: Comment;
}

const CommentWidget = ({ comment }: ViewProps) => {
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

export const addCommentLineWidget = (cm: any, comment: Comment) => {
  const anchor = document.createElement('div');
  ReactDOM.render(<CommentWidget comment={comment} />, anchor);
  cm.addLineWidget(comment.line, anchor);
};

export default CommentWidget;
