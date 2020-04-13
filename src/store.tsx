import React, { createContext, useReducer } from 'react';
import { some } from 'lodash';
import { Snippet } from './types';

interface State {
  snippets: Array<Snippet>;
}

interface Context {
  dispatch: Function;
  state: State;
}

const initialState = {
  snippets: [],
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
        const { id, text, language } = action.payload;
        const snippet: Snippet = {
          id,
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
