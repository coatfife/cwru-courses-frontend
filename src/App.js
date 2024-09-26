import './App.css';
import * as React from 'react';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content-container">
        <h1>Rate CWRU Courses</h1>
        <SearchBar />
      </div>
    </div>
  );
}

export default App;
