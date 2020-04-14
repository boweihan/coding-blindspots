import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Language } from '../';
import style from './styles.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

interface Props {
  text: string;
  language: Language;
  onChange?: any;
  editable?: boolean;
  setRef?: (ref: any) => void;
}

const Editor = ({ text, language, onChange, editable, setRef }: Props) => {
  return (
    <div className={style.container}>
      <CodeMirror
        ref={setRef}
        value={text}
        onBeforeChange={onChange}
        options={{
          readOnly: !editable,
          mode: language,
          lineNumbers: true,
        }}
      />
    </div>
  );
};

export default Editor;
