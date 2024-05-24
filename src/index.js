
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 React.createElement(BrowserRouter, null, React.createElement(App)),
 document.getElementById('root')
);

