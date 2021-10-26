import { combineReducers } from 'redux';

import { SnippetReducer } from './snippets';

export default combineReducers({
  snippets: SnippetReducer,
});
