import './App.css';
import * as React from 'react';
import NavBar from './components/NavBar';
import Landing from './components/Landing'
import CreateCourseListing from './components/CreateCourseListing';
import CourseListings from './components/CourseListings'
import { useState } from 'react';
import CoursePage from './components/CoursePage';
import PageContext from './contexts/PageContext';
import CreateCourseReview from './components/CreateCourseReview';


function App() {
  const [openModal, setOpenModal] = useState(null);
  const [page, setPage] = useState({
    Page: "CourseListings",
    Course: null
  })

  const getPage = () => {
    switch (page.Page) {
      case "Landing":
        return <Landing />
      case "CourseListings":
        return <CourseListings />
      case "CoursePage":
        return <CoursePage course={page.Course} />
      default:
        return <></>
    }
  }

  const getModal = () => {
    switch (openModal) {
      case "Review":
        return <CreateCourseReview open={openModal} setOpen={setOpenModal} />
      case "Listing":
        return <CreateCourseListing open={openModal} setOpen={setOpenModal} />
      default:
        return <></>
    }
  }

  return (
    <div className="App">
      <PageContext.Provider value={{ page, setPage }} >
        <NavBar setOpen={setOpenModal} />
        {getModal()}
        {getPage()}
      </PageContext.Provider>
    </div>
  );
}

export default App;
