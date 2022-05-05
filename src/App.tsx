import React from 'react';
import logo from './logo.svg';
import './App.css';
import { WhoopApi } from './lib/whoopApi';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <div className="App">
      <Dashboard/>
    </div>
  );
}

export default App;
