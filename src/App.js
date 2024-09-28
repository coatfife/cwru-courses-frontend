import './App.css';
import * as React from 'react';
import NavBar from './components/NavBar';
import Landing from './components/Landing'
import CreateCourseListing from './components/CreateCourseListing';
import { useState } from 'react';

function App() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="App">
      <NavBar setOpen={setOpenModal} /> 
      <CreateCourseListing open={openModal} setOpen={setOpenModal} />
      <div className="content-container">
        <Landing />
      </div>
    </div>
  );
}

export default App;
