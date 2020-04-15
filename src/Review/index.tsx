import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Input, Card, Button } from 'antd';
import { Editor, EditorOptions } from '../Editor';
import { Snippet } from '../types';
import styles from './styles.css';
import 'antd/es/Input/style';
import 'antd/es/Button/style';

const { TextArea } = Input;

interface ReviewProps {
  location: {
    state: {
      snippet: Snippet;
    };
  };
}

const widgets: any = [];

const removeInputWidgets = (cm: any) => {
  for (let i = 0; i < widgets.length; i++) {
    cm.removeLineWidget(widgets[i]);
  }
};
const createInputWidget = (cm: any) => (
  <div className={styles.widgetContainer}>
    <TextArea rows={3} />
    <div className={styles.widgetButtons}>
      <Button type="dashed" onClick={() => removeInputWidgets(cm)}>
        Cancel
      </Button>
      &nbsp;
      <Button onClick={() => {}}>Add Comment</Button>
    </div>
  </div>
);

const addInputLineWidget = (cm: any, event: any) => {
  removeInputWidgets(cm);
  const line = event.line;
  widgets.push(
    cm.addLineWidget(
      line,
      ReactDOM.render(createInputWidget(cm), document.createElement('div'))
    )
  );
};

const Review = ({ location: { state } }: ReviewProps) => {
  const { snippet } = state;
  const { language, text } = snippet;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Submit Question and Code</h2>
      <div>
        <EditorOptions language={language} />
        <Editor
          text={JSON.parse(text)}
          language={language}
          onKeyDown={addInputLineWidget}
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
