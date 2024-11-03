import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import './NavBar.css';
import PageContext from '../contexts/PageContext';
import { useContext } from 'react';
import ModalContext from '../contexts/ModalContext';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const { setOpenModal } = useContext(ModalContext);
  const { page, setPage } = useContext(PageContext);
  const isCoursePage = page.Page === "CoursePage";

  const handleOpen = () => {
    let modal = "Listing";
    if (isCoursePage) modal = "Review";
    setOpenModal({
      Modal: modal,
      Review: null,
    });
  };

  const handleHome = () => {
    setPage({
      Page: "Landing",
      Course: null,
    });
  };

  const handleCourses = () => {
    setPage({
      Page: "CourseListings",
      Course: null,
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          {/* Add class based on active page */}
          <Button
            className={page.Page === 'Landing' ? 'nav-button active' : 'nav-button'}
            onClick={handleHome}
          >
            <Link to={"/"}>Home</Link>
          </Button> 
          

          <Button
            className={page.Page === 'CourseListings' ? 'nav-button active' : 'nav-button'}
            onClick={handleCourses}
          >
            <Link to={"/courses"}>Courses</Link>
          </Button>

          <Button
            className="create-course-button"
            onClick={handleOpen}
          >
            Create {isCoursePage ? 'Review' : 'Course Listing'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
