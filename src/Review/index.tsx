import React, { useState } from 'react';
import { List, Card, Button } from 'antd';
import { Editor, EditorOptions } from '../Editor';
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
const addLineWidget = (ref: any) => {
  var msg = document.createElement('div');
  msg.className = 'test';
  msg.style.color = 'blue';
  msg.appendChild(document.createTextNode('boop'));
  ref.editor.addLineWidget(0, msg);
  console.log('added line widget', msg);
};

const Review = ({ location: { state } }: ReviewProps) => {
  const [ref, setRef] = useState(null);

  if (ref) addLineWidget(ref);

  const { snippet } = state;
  const { language, text } = snippet;
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Submit Question and Code</h2>
      <div>
        <EditorOptions language={language} />
        <Editor text={JSON.parse(text)} language={language} setRef={setRef} />
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
