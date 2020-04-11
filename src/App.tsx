import React from 'react';
import { hot } from 'react-hot-loader/root';
import Ace from './Ace';
import { StateProvider } from './store';

const App = () => {
  return (
    <StateProvider>
      <Ace />
    </StateProvider>
  );
};

export default hot(App);
