import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App'
import { AliveScope } from 'react-activation'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AliveScope>
            <App />
          </AliveScope>
);

reportWebVitals();
