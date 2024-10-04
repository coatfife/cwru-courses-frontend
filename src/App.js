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
import ModalContext from './contexts/ModalContext';
import CourseReview from './components/CourseReview';


function App() {
  const [openModal, setOpenModal] = useState({
    Modal: null,
    Review: null
  });
  const [page, setPage] = useState({
    Page: "Landing",
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
    switch (openModal.Modal) {
      case "Review":
        return <CreateCourseReview />
      case "Listing":
        return <CreateCourseListing />
      case "ViewReview":
        return <CourseReview review={openModal.Review} />
      default:
        return <></>
    }
  }

  return (
    <div className="App">
      <PageContext.Provider value={{ page, setPage }} >
        <ModalContext.Provider value={{openModal, setOpenModal}} >
          <NavBar />
          {getModal()}
          {getPage()}
        </ModalContext.Provider>
      </PageContext.Provider>
    </div>
  );
}

export default App;
