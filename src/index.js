import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignUpForm from "./components/SignUpForm";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SignUpForm />
  </React.StrictMode>
);