import React from 'react';
import AceEditor from 'react-ace';
import { Language } from '../';

interface Props {
  text: string;
  language: Language;
  onChange: (value: string) => void;
  editable?: boolean;
}

const Ace = ({ text, language, onChange, editable }: Props) => {
  return (
    <AceEditor
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
