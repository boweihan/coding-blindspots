import React, { useContext, useReducer } from 'react';
import { Input } from 'antd';
import styles from './styles.css';
import RestClient from '../shared/rest';
import { useState } from 'react';
import { store } from '../store';

const { Search } = Input;

type State = {
  searchInput: string;
  isError: boolean;
  isSearched: boolean;
};

const initialState: State = {
  searchInput: '',
  isError: false,
  isSearched: false,
};

type Action =
  | { type: 'submitSearchInput'; payload: string }
  | { type: 'submitSearchInputSuccess'; payload: string }
  | { type: 'submitSearchInputFailed'; payload: string }
  | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'submitSearchInput':
      return {
        ...state,
        searchInput: action.payload,
      };
    case 'submitSearchInputSuccess':
      console.log(state);
      console.log(action);
      return {
        ...state,
        isError: false,
      };
    case 'submitSearchInputFailed':
      return {
        ...state,
        isError: true,
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload,
      };
  }
};

export const Searchbar = () => {
  const storeContext = useContext(store);
  const c = storeContext.snippets;
  const snippets = c.state || [];

  const [isSearched, setIsSearched] = useState<boolean>(false);

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('inside src/Searchbar/input.tsx');

  const handleOnSearch = () => {
    var credential = {
      searchInput: state.searchInput,
    };
    var searchUrl = '/search/' + '?q=' + state.searchInput;
    RestClient.get(searchUrl)
      .then((response) => {
        console.log(
          'response from django search server: ' + JSON.stringify(response)
        );
        c.dispatch({ type: 'SET_SNIPPETS', payload: { snippets: response } });
        dispatch({
          type: 'submitSearchInputSuccess',
          payload: 'Submitted!',
        });
        setIsSearched(true);
      })
      .catch(() => {
        console.log('failed');
        dispatch({
          type: 'submitSearchInputFailed',
          payload: 'Submission Failed.',
        });
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      handleOnSearch();
    }
  };

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'submitSearchInput',
      payload: event.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <Search
          placeholder="search"
          onSearch={handleOnSearch}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
          enterButton
        />
      </div>
    </div>
  );
};
