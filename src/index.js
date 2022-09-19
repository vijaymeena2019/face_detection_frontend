import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './containers/App';
import 'tachyons';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Dobule Call of componentDidMount

  //  Multiple componentDidMount calls may be caused by using <React.StrictMode> around your component. After removing it double calls are gone.
  // This is intended behavior to help detect unexpected side effects. You can read more about it in the docs. It happens only in development environment, while in production componentDidMount is called only once even with <React.StrictMode>.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

