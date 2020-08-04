import React from 'react';
import logo from './logo.svg';
import Scene from './Scene';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Scene/>
    </div>
  );
}

export default App;
