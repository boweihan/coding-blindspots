import React, { createContext, useReducer } from 'react';

interface State {}

export interface Context {
  dispatch: Function;
  state: State;
}

const initialState = {};
const initialContext = {
  dispatch: () => {},
  state: initialState,
};

const store = createContext<Context>(initialContext);
const { Provider } = store;

console.log("inside src/store.tsx");
const StateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case 'EXAMPLE':
        return state;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
