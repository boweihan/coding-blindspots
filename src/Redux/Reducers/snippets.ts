import { Snippet } from '../../types';

interface State {}

export interface Context {
  dispatch: Function;
  state: State;
}

export const initialSnippetsState = {
  snippets: [],
};

export interface Action {
  type: string;
  payload: any;
}

const initialContext = {
  dispatch: () => {},
  state: initialSnippetsState,
};

export const SnippetReducer = (
  state = initialSnippetsState,
  action: Action
) => {
    console.log(action, "ACTION")
    // const {payload = {}} = action;
  switch (action.type) {
    case 'SET_SNIPPETS':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
