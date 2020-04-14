import React, { useState } from 'react';
import { List, Card, Button } from 'antd';
import { Editor, EditorOptions } from '../Ace';
import { Snippet } from '../types';
import styles from './styles.css';
import 'antd/es/List/style';
import 'antd/es/Card/style';
import 'antd/es/Button/style';

interface ReviewProps {
  location: {
    state: {
      snippet: Snippet;
    };
  };
}

const Review = ({ location: { state } }: ReviewProps) => {
  const [ref, setRef] = useState(null);
  const { snippet } = state;
  const { language, text } = snippet;
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Submit Question and Code</h2>
      <div>
        <EditorOptions language={language} />
        <Editor text={text} language={language} setRef={setRef} />
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
