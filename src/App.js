import './App.css';
import * as React from 'react';

import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
        <NavBar />
        <h1>Rate CWRU Courses</h1>
        <SearchBar />
    </div>
  );
}

export default App;
