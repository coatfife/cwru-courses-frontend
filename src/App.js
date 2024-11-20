import './App.css';
import * as React from 'react';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import CourseListings from './components/CourseListings';
import {useContext} from 'react';
import CoursePage from './components/CoursePage';
import AuthPage from './components/AuthPage';
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
                  {!user ? <AuthPage/> :
                      <>
                  <NavBar/>
                  <Routes>
                      <Route path="/" element={<Landing/>}/>
                      <Route path="/courses" element={<CourseListings/>}/>
                      <Route path="/courses/:id" element={<CoursePage/>}/>
                      <Route path="/stats" element={<Stats/>}/>
                      <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                  </Routes>
                      </>
                  }
              </BrowserRouter>
          <ToastContainer position="bottom-right" />
      </div>
  );
}

export default App;
