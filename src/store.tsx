import React, { createContext, useReducer } from 'react';
import { some } from 'lodash';
import { Snippet } from './types';
import { Language } from './Editor';

interface State {
  snippets: Array<Snippet>;
}

interface Context {
  dispatch: Function;
  state: State;
}

const initialState = {
  snippets: [
    {
      id: '1',
      title: 'Typescript Interface',
      text: JSON.stringify(
        'interface ReviewProps {\n  location: {\n    state: {\n      snippet: Snippet;\n    };\n  };\n}'
      ),
      language: Language.JAVASCRIPT,
    },
  ],
};
const initialContext = {
  dispatch: () => {},
  state: initialState,
};
const store = createContext<Context>(initialContext);
const { Provider } = store;

const StateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case 'SAVE_SNIPPET':
        const { id, title, text, language } = action.payload;
        const snippet: Snippet = {
          id,
          title,
          text,
          language,
        };
        let newState = { ...state };
        if (!some(newState.snippets, { id })) {
          newState.snippets.push(snippet);
        }
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
