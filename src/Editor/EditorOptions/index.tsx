import React from 'react';
import { Select } from 'antd';
import 'antd/es/select/style';
import { Language } from '../';
const { Option } = Select;

interface Props {
  language: Language;
  setLanguage?: (value: Language) => void;
  enabled?: boolean;
}

const languageToText = {
  clike: 'C/C++ or other languages',
  java: 'Java',
  python: 'Python',
  javascript: 'JavaScript',
  ruby: 'Ruby',
  swift: 'Swift',
  go: 'Go',
  rust: 'Rust',
  php: 'PHP',
};

const EditorOptions = ({ language, setLanguage, enabled }: Props) => (
  <Select
    defaultValue={language}
    style={{ width: '100%' }}
    onChange={setLanguage}
    disabled={!enabled}
  >
    {Object.values(Language).map((lang) => (
      <Option key={lang} value={lang}>
        {languageToText[lang]}
      </Option>
    ))}
  </Select>
);

export default EditorOptions;
