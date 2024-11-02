import './App.css';
import * as React from 'react';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import CreateCourseListing from './components/CreateCourseListing';
import CourseListings from './components/CourseListings';
import {useContext, useEffect, useState} from 'react';
import CoursePage from './components/CoursePage';
import PageContext from './contexts/PageContext';
import CreateCourseReview from './components/CreateCourseReview';
import ModalContext from './contexts/ModalContext';
import CourseReview from './components/CourseReview';
import { getCourses, createCourse, updateCourse, deleteCourse, createReview, updateReview, deleteReview } from "./api/api";
import AuthPage from './components/AuthPage';
import SearchCoursesPage from './components/SearchCoursesPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CourseContext} from "./contexts/CourseContext";

function App() {
    const {user} = useContext(CourseContext);

  return (
      <div className="App">
          {!user ? <AuthPage/> :
      <BrowserRouter>
          <NavBar/>
          <Routes>
              <Route path="/" element={<Landing/>} />
              <Route path="/courses" element={<CourseListings />} />
              <Route path="/courses/:id" element={<CoursePage />} />
          </Routes>
      </BrowserRouter>
          }
      </div>
  );
}

export default App;
