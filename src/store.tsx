import React, { createContext, useReducer } from 'react';
import { some, findIndex } from 'lodash';
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
      comments: [
        {
          id: '11',
          line: 1,
          text: String(
            "## HTML block below\n\n<blockquote>\n  This blockquote will change based on the HTML settings above.\n</blockquote>\n\n## How about some code?\n```js\nvar React = require('react');\nvar Markdown = require('react-markdown');\n\nReact.render(\n  <Markdown source=\"# Your markdown here\" />,\n  document.getElementById('content')\n);"
          ),
        },
        {
          id: '11',
          line: 2,
          text: 'This is a **neat** *line* of code!',
        },
      ],
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
    let newState;
    switch (action.type) {
      case 'SAVE_SNIPPET':
        const { id } = action.payload;
        newState = { ...state };
        if (!some(newState.snippets, { id })) {
          newState.snippets.push(action.payload);
        }
        return newState;
      case 'SAVE_COMMENT':
        const { snippetId, comment } = action.payload;
        newState = { ...state };
        const snippetIndex = findIndex(newState.snippets, { id: snippetId });
        if (snippetIndex > -1) {
          // snippet exists
          const comments = newState.snippets[snippetIndex].comments;
          const commentIndex = findIndex(comments, { line: comment.line });
          if (commentIndex > -1) {
            // comment exists on that line, lets overwrite the comment for now
            comments[commentIndex] = comment;
          } else {
            comments.push(comment);
          }
        }
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
