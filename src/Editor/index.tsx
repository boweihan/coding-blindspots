import Editor from './Editor';
import EditorOptions from './EditorOptions';
// Language Support
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/swift/swift';
import 'codemirror/mode/go/go';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/php/php';

enum Language {
  JAVA = 'java',
  PYTHON = 'python',
  JAVASCRIPT = 'javascript',
  RUBY = 'ruby',
  SWIFT = 'swift',
  GO = 'go',
  RUST = 'rust',
  PHP = 'php',
  CLIKE = 'clike',
}

export { Language, Editor, EditorOptions };
export default { Editor, EditorOptions, Language };
