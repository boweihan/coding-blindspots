import React, { useReducer } from 'react';
import { Input } from 'antd';
import styles from './styles.css';
import { useHistory } from 'react-router-dom';

const { Search } = Input;

type State = {
  searchInput: string;
  isError: boolean;
};

const initialState: State = {
  searchInput: '',
  isError: false,
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
  let history = useHistory();
  console.log(`location`, location);
  const resetToHome = (q: string) => {
    history.push(`/?q=${q}`);
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('inside src/Searchbar/input.tsx');

  const handleOnSearch = async () => {
    try {
      resetToHome(state.searchInput);

      dispatch({
        type: 'submitSearchInputSuccess',
        payload: 'Submitted!',
      });
    } catch (error) {
      dispatch({
        type: 'submitSearchInputFailed',
        payload: 'Submission Failed.',
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const enterKey = 13;
    if (event.keyCode === enterKey || event.which === enterKey) {
      handleOnSearch();
    }
  };

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> =
    async (event) => {
      const { value } = event.target;
      console.log(`value`, value);
      dispatch({
        type: 'submitSearchInput',
        payload: value,
      });
      // if (!value) {
      //   setPageLoading(true);
      //   // const snippets = await getSnippets();
      //   setSnippets(snippets);
      //   setPageLoading(false);
      // }
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
