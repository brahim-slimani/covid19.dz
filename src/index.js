import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

import 'primereact/resources/themes/luna-green/theme.css'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
