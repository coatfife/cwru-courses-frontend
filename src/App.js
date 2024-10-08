import './App.css';
import * as React from 'react';
import NavBar from './components/NavBar';
import Landing from './components/Landing'
import CreateCourseListing from './components/CreateCourseListing';
import CourseListings from './components/CourseListings'
import {useEffect, useState} from 'react';
import CoursePage from './components/CoursePage';
import PageContext from './contexts/PageContext';
import CreateCourseReview from './components/CreateCourseReview';
import ModalContext from './contexts/ModalContext';
import CourseReview from './components/CourseReview';
import { getCourses, createCourse, updateCourse, deleteCourse, createReview, updateReview, deleteReview } from "./api/api"


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

  // Fetch the courses from the API and log them
  useEffect(() => {
    // Fetch the courses when the component mounts
    const fetchCourses = async () => {
      const course = {
        "courseId": "makoye",
        "title": "Introduction to Software Engineering",
        "description": "This course covers the fundamental concepts of software engineering, including design patterns, development methodologies, and project management.",
        "createdBy": "professor123",
        "aliases": ["SE101", "SoftwareEng"],
        "prerequisites": ["CS101", "CS102"],
        "reviews": []
      }
      const res = await createCourse(course);
      console.log(res);
    };

    fetchCourses().then(() => console.log("Courses fetched"));
  }, []);



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
