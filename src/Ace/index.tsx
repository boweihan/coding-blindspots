import React, { useState, useContext } from 'react';
import AceEditor from 'react-ace';
import EditorOptions from './EditorOptions';
import { store } from '../store';

// Language Support
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-swift';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-scala';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-php';

import 'ace-builds/src-noconflict/theme-tomorrow';

export enum Language {
  CPP = 'c_cpp',
  JAVA = 'java',
  PYTHON = 'python',
  CSHARP = 'csharp',
  JAVASCRIPT = 'javascript',
  RUBY = 'ruby',
  SWIFT = 'swift',
  GO = 'golang',
  SCALA = 'scala',
  RUST = 'rust',
  PHP = 'php',
}

interface Props {
  readOnly?: boolean;
}

const Ace = ({ readOnly = false }: Props) => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState<Language>(Language.CPP);

  // const globalState = useContext(store);
  // console.log(globalState);

  return (
    <div>
      <EditorOptions language={language} setLanguage={setLanguage} />
      <AceEditor
        value={text}
        mode={language}
        theme="tomorrow"
        onChange={setText}
        name="ace"
        editorProps={{ $blockScrolling: true }}
        width="inherit"
        wrapEnabled
        readOnly={readOnly}
      />
    </div>
  );
};

export default Ace;
