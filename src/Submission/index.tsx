import React, { useState } from 'react';
import { Tooltip, Button } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Editor, EditorOptions, Language } from '../Ace';
import styles from './styles.css';
import 'antd/es/Button/style';

const Submission = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState<Language>(Language.JAVASCRIPT);

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
          <EditorOptions language={language} setLanguage={setLanguage} />
          <Editor text={text} language={language} onChange={setText} editable />
          <div className={styles.submit}>
            <Button type="primary" onClick={() => console.log(text)}>
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
    </>
  );
};

export default Submission;
