import React from 'react';
import './assets/css/style.css';
import Dashboard from "./dashboard/Dashboard";
import { CustomFooter } from "./component/CustomFooter";
import CustomHeader from './component/CustomHeader';

function App() {

  return (
    <div>
      <CustomHeader />
      <Dashboard />
      <CustomFooter />
    </div>

  );
}

export default App;
