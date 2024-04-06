import React from 'react';
import ReactDOM from 'react-dom/client';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import reportWebVitals from './reportWebVitals';
import themes from './themes';
import App from './App';
import './index.css';

import 'video-react/dist/video-react.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <CssVarsProvider theme={themes}>
    <App />,
  </CssVarsProvider>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
