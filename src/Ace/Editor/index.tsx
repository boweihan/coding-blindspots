import React from 'react';
import AceEditor from 'react-ace';
import { Language } from '../';

interface Props {
  text: string;
  language: Language;
  onChange?: (value: string) => void;
  editable?: boolean;
  setRef?: (ref: any) => void;
}

const Ace = ({ text, language, onChange, editable, setRef }: Props) => {
  return (
    <AceEditor
      ref={setRef}
      value={text}
      mode={language}
      theme="tomorrow"
      onChange={onChange}
      name="ace"
      editorProps={{ $blockScrolling: true }}
      width="inherit"
      wrapEnabled
      readOnly={!editable}
    />
  );
};

export default Ace;
