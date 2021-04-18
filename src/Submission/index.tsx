import React, { useState, useEffect } from 'react';
import { Tooltip, Button, Input, Modal, message } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Editor, EditorOptions, Language } from '../Editor';
import RestClient from '../shared/rest';
import { Snippet } from '../types';
import styles from './styles.css';
import 'antd/es/button/style';
import 'antd/es/input/style';
import 'antd/es/modal/style';
import 'antd/es/message/style';

const Submission = () => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [position, setPosition] = useState('');
  const [language, setLanguage] = useState<Language>(Language.JAVASCRIPT);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmission = (payload: Snippet) => {
    const { title, text } = payload;
    let parsedText = JSON.parse(text);
    if (!title || !parsedText) {
      if (!title && !parsedText) {
        message.error('Snippet / Title must not be empty!');
        return;
      }
      if (!title) {
        message.error('Title must not be empty!');
      }
      if (!parsedText) {
        message.error('Snippet must not be empty!');
      }
      return;
    }
    setSubmitting(true);
    RestClient.post('/snippets/', payload)
      .then(({ id }) => {
        setSubmitting(false);
        Modal.success({
          title: 'Submission Success',
          content: (
            <p>
              Thank you for submitting your snippet. Your submission ID is {id}.
              To view your submission, click <a href={`/view#${id}`}>here.</a>
            </p>
          ),
        });
      })
      .catch(() => setSubmitting(false));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.editorContainer}>

          <div className={styles.editorContainerColumnLeft}>
            <div className={styles.editorContainerInput}>
              <span className={styles.secondaryHeading}>
                Title
              </span>
              <Input
                onChange={(title) => setTitle(title.currentTarget.value)}
                placeholder="Choose a short descriptive title"
              />
            </div>
            <div className={styles.editorContainerInput}>
              <span className={styles.secondaryHeading}>
                Description
              </span>
              <Input
                onChange={(description) => setPosition(description.currentTarget.value)}
                placeholder="Describe your question here"
              />
            </div>
            <div className={styles.editor}>
              <span className={styles.secondaryHeading}>
                Solution
              </span>
              <Editor
                text={text}
                language={language}
                onChange={(editor: any, data: any, value: string) => {
                  setText(value);
                }}
                editable
              />
            </div>
          </div>

          <div className={styles.editorContainerColumnRight}>
            <div className={styles.editorContainerInput}>
              <span className={styles.secondaryHeading}>
                Language
              </span>
              <EditorOptions
                language={language}
                setLanguage={setLanguage}
                enabled
              />
            </div>
            <div className={styles.editorContainerInput}>
              <span className={styles.secondaryHeading}>
                Position
              </span>
              <Input
                onChange={(position) => setPosition(position.currentTarget.value)}
                placeholder="Which position are you interviewing for?"
                type="textarea"
              />
            </div>

            <p className={styles.info}>
              In order for us to give you feedback on your code, please ensure that you submit the complete question along with your solution. Submissions with inadequate context will be ignored.
            </p>

            <Tooltip
              title="Make sure everything is filled out as you intended. You won’t be able to make any changes after submitting the snippet."
            >
              <Button
                loading={submitting}
                type="primary"
                onClick={() =>
                  handleSubmission({
                    title,
                    text: JSON.stringify(text),
                    language,
                  })
                }
              >
                Submit snippet
              </Button>
            </Tooltip>
          </div>
        </div>

      </div>
    </>
  );
};

export default Submission;
