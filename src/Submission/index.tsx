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
// @ts-ignore
import Infographic from '../assets/infographic.png';

const Submission = () => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState<Language>(Language.JAVASCRIPT);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    console.log(`count changed to ${submitting}`);
  }, [submitting]);

  const handleSubmission = (payload: Snippet) => {
    const { id, title, text } = payload;
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
    RestClient.post('/snippets', payload)
      .then(() => {
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
        <h2 className={styles.heading}>
          Submit Question and Code
          <Tooltip
            title="
            In order for us to give you feedback on your code, please ensure that you submit the complete
            question along with your solution. Submissions with inadequate context will be ignored.
            "
          >
            <QuestionCircleTwoTone className={styles.tooltip} />
          </Tooltip>
        </h2>
        <div>
          <EditorOptions
            language={language}
            setLanguage={setLanguage}
            enabled
          />
          <div className={styles.editor}>
            <Editor
              text={text}
              language={language}
              onChange={(editor: any, data: any, value: string) => {
                setText(value);
              }}
              editable
            />
          </div>
          <div className={styles.submit}>
            <Input
              className={styles.title}
              onChange={(title) => setTitle(title.currentTarget.value)}
              placeholder="Snippet Title"
            />
            <Button
              loading={submitting}
              type="primary"
              onClick={() =>
                handleSubmission({
                  id: String(new Date().getTime()),
                  title,
                  text: JSON.stringify(text),
                  language,
                  comments: [],
                })
              }
            >
              Submit Snippet
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.secondaryHeading}>Your Previous Submissions</p>
        <p>Please login to view previous submissions.</p>
        <Button type="primary">Login</Button>&nbsp;
        <Button type="default">Signup</Button>
      </div>
      <div className={styles.infographicContainer}>
        <img
          className={styles.infographic}
          src={Infographic}
          alt="CodingBlindspots infographic"
        />
      </div>
    </>
  );
};

export default Submission;
