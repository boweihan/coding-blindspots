import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import Ace from './Ace';

interface Props {}

class App extends React.Component<Props> {
  render() {
    return <Ace />;
  }
}

export default hot(App);
