import React, { createContext, useReducer } from 'react';
import { some, findIndex } from 'lodash';
import { Snippet } from './types';

interface State {
  snippets: Array<Snippet>;
}

export interface Context {
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

const setSnippets = (state: State, action: any) => {
  const { snippets } = action.payload;
  let newState = { ...state };
  newState.snippets = snippets;
  return newState;
};

const addSnippet = (state: State, action: any) => {
  const { id } = action.payload;
  let newState = { ...state };
  if (!some(newState.snippets, { id })) {
    newState.snippets.push(action.payload);
  }
  return newState;
};

const addComment = (state: State, action: any) => {
  const { snippetId, comment } = action.payload;
  let newState = { ...state };
  const snippetIndex = findIndex(newState.snippets, { id: snippetId });
  if (snippetIndex > -1) {
    // snippet exists
    const comments = newState.snippets[snippetIndex].comments;
    const commentIndex = findIndex(comments, { line: comment.line });

    if (comments) {
      if (commentIndex > -1) {
        // comment exists on that line, lets overwrite the comment for now
        comments[commentIndex] = comment;
      } else {
        comments.push(comment);
      }
    }
  }
  return newState;
};

const StateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case 'SET_SNIPPETS':
        return setSnippets(state, action);
      case 'ADD_SNIPPET':
        return addSnippet(state, action);
      case 'ADD_COMMENT':
        return addComment(state, action);
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
