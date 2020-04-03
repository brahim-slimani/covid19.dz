import React from 'react';
import './style/App.css';
import Dashboard from "./dashboard/Dashboard";
import {CustomFooter} from "./component/CustomFooter";

function App() {
  return (
      <body>
        <Dashboard/>
        <CustomFooter/>
      </body>

  );
}

export default App;
