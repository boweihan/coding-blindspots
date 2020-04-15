import React from 'react';
import { Select } from 'antd';
import 'antd/es/select/style';
import styles from './styles.css';
import { Language } from '../';
const { Option } = Select;

interface Props {
  language: Language;
  setLanguage?: (value: Language) => void;
  enabled?: boolean;
}

const languageToText = {
  clike: 'Java',
  python: 'Python',
  javascript: 'JavaScript',
  ruby: 'Ruby',
  swift: 'Swift',
  go: 'Go',
  rust: 'Rust',
  php: 'PHP',
};

const EditorOptions = ({ language, setLanguage, enabled }: Props) => (
  <div className={styles.container}>
    <Select
      defaultValue={language}
      style={{ width: 120 }}
      onChange={setLanguage}
      disabled={!enabled}
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
