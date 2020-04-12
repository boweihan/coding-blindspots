import React from 'react';
import { Select } from 'antd';
import 'antd/es/Select/style';
import styles from './styles.css';
import { Language } from '../';
const { Option } = Select;

interface Props {
  language: Language;
  setLanguage: (value: Language) => void;
}

const languageToText = {
  c_cpp: 'C++',
  java: 'Java',
  python: 'Python',
  csharp: 'C#',
  javascript: 'JavaScript',
  ruby: 'Ruby',
  swift: 'Swift',
  golang: 'Go',
  scala: 'Scala',
  rust: 'Rust',
  php: 'PHP',
};

const EditorOptions = ({ language, setLanguage }: Props) => (
  <div className={styles.container}>
    <Select
      defaultValue={language}
      style={{ width: 120 }}
      onChange={setLanguage}
    >
      {Object.values(Language).map((lang) => (
        <Option key={lang} value={lang}>
          {languageToText[lang]}
        </Option>
      ))}
    </Select>
  </div>
);

export default EditorOptions;
