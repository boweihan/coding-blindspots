import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from "react-cookie";

import App from './App';

var mountNode = document.getElementById('app');
console.log("inside src/index.tsx");
ReactDOM.render(  <CookiesProvider><App />  </CookiesProvider>, mountNode);
