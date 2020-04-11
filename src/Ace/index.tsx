import React, { useState, useContext } from 'react';
import AceEditor from 'react-ace';
import { store } from '../store';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';

const Ace = () => {
  const [text, setText] = useState('');

  const globalState = useContext(store);
  console.log(globalState);

  return (
    <AceEditor
      value={text}
      mode="java"
      theme="github"
      onChange={setText}
      name="ace-editor"
      editorProps={{ $blockScrolling: true }}
    />
  );
};

export default Ace;
