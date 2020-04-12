import Editor from './Editor';
import EditorOptions from './EditorOptions';

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

enum Language {
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

export { Language, Editor, EditorOptions };
export default { Editor, EditorOptions, Language };
