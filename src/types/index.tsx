import { Language } from '../Editor';

export type Comment = {
  id: string;
  line: number;
  text: string;
};

export type Snippet = {
  id: string;
  title: string;
  text: string;
  language: Language;
  comments?: Array<Comment>;
};
