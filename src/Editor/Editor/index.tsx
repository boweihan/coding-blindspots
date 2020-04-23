import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Language } from '../';
import style from './styles.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

interface EditorProps {
  text: string;
  language: Language;
  onChange?: any;
  onCursor?: any;
  onMount?: any;
  editable?: boolean;
  setRef?: (ref: any) => void;
}

const Editor = ({
  text,
  language,
  onChange = () => {},
  onCursor = () => {},
  onMount = () => {},
  editable = true,
  setRef = () => {},
}: EditorProps) => (
  <div className={style.container}>
    <CodeMirror
      ref={setRef}
      value={text}
      onBeforeChange={onChange}
      onCursor={onCursor}
      editorDidMount={onMount}
      options={{
        readOnly: !editable,
        mode: language,
        lineNumbers: true,
      }}
    />
  </div>
);

export default Editor;
