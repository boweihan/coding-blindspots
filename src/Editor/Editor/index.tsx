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
  onKeyDown?: any;
  editable?: boolean;
  setRef?: (ref: any) => void;
}

const Editor = ({
  text,
  language,
  onChange = () => {},
  onKeyDown = () => {},
  editable = true,
  setRef = () => {},
}: Props) => {
  return (
    <div className={style.container}>
      <CodeMirror
        ref={setRef}
        value={text}
        onBeforeChange={onChange}
        onCursor={onKeyDown}
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
