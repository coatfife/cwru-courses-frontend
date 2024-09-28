import './App.css';
import * as React from 'react';
import NavBar from './components/NavBar';
import Landing from './components/Landing'
import CreateCourseListing from './components/CreateCourseListing';
import CourseListings from './components/CourseListings'
import { useState } from 'react';

function App() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="App">
      <NavBar setOpen={setOpenModal} /> 
      <CreateCourseListing open={openModal} setOpen={setOpenModal} />
      <div className="content-container">
        {true ? <Landing /> : <CourseListings />} 
        {/* NOTE TO ALICE: Change true to false in line 16 to see some example course listings. */}
      </div>
    </div>
  );
}

export default App;
