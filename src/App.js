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
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stats from "./components/Stats";
import ForgotPasswordPage from "./components/ForgotPasswordPage";

function App() {
    const {user} = useContext(CourseContext);

  return (
      <div className="App">
              <BrowserRouter>
                  {user && <NavBar/>}
                  <Routes>
                      <Route path="/" element={user ? <Landing/> : <AuthPage/>}/>
                      <Route path="/courses" element={<CourseListings/>}/>
                      <Route path="/courses/:id" element={<CoursePage/>}/>
                      <Route path="/stats" element={<Stats/>}/>
                      <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                  </Routes>
              </BrowserRouter>
          <ToastContainer position="bottom-right" />
      </div>
  );
}

export default App;
