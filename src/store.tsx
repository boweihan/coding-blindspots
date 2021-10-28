import React, { createContext, useState } from 'react';
import { Snippet } from './types';

interface State {
  data: any;
  [key: string]: any;
}

export interface Context {
  snippets: State;
  loading?: any;
}

const initialContext = {
  snippets: {
    data: [],
    setSnippets: () => ({}),
  },
  loading: { data: false },
};

const store = createContext<Context>(initialContext);
const { Provider } = store;

console.log('inside src/store.tsx');
const StateProvider = ({ children }: any) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const [pageLoading, setPageLoading] = useState(false);

  const value = {
    loading: { data: pageLoading, setPageLoading },
    snippets: { data: snippets, setSnippets },
  };

  return <Provider value={value}>{children}</Provider>;
};

export { store, StateProvider };
