import React, { createContext, useReducer } from 'react';
import {
  initialSnippetsState,
  SnippetReducer,
} from './Redux/Reducers/snippets';

interface State {
  state?: any;
  dispatch: Function;
}

export interface Context {
  snippets: State;
}

// const initialState = {};
const initialContext = {
  snippets: {
    dispatch: () => ({}),
  },
};

const store = createContext<Context>(initialContext);
const { Provider } = store;

console.log('inside src/store.tsx');
const StateProvider = ({ children }: any) => {
  const [snippetState, snippetDispatch] = useReducer(
    SnippetReducer,
    initialSnippetsState
  );

  const value = {
    snippets: { state: snippetState, dispatch: snippetDispatch },
  };
  // const [state, dispatch] = useReducer((state: any, action: any) => {
  //   switch (action.type) {
  //     case 'EXAMPLE':
  //       return state;
  //     default:
  //       throw new Error();
  //   }
  // }, initialState);

  return <Provider value={value}>{children}</Provider>;
};

export { store, StateProvider };

// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';

// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import Reducers from './Redux/Reducers';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, Reducers);

// export const makeStore = (initialState = {}) => {
//   return createStore(
//     persistedReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(thunkMiddleware))
//   );
// };
