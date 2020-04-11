import * as React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';

interface Props {}

class Ace extends React.Component<Props> {
  onChange(newValue: string) {
    console.log('change', newValue);
  }

  render() {
    return (
      <AceEditor
        mode="java"
        theme="github"
        onChange={this.onChange}
        name="ace-editor"
        editorProps={{ $blockScrolling: true }}
      />
    );
  }
}

export default Ace;
