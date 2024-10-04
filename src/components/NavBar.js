import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import './NavBar.css';
import PageContext from '../contexts/PageContext';
import { useContext } from 'react';
import ModalContext from '../contexts/ModalContext';

export default function NavBar() {
  const {setOpenModal} = useContext(ModalContext);
  const isCoursePage = React.useContext(PageContext).page.Page === "CoursePage"
  const handleOpen = () => {
    let modal = "Listing"
    if (isCoursePage) modal = "Review"
    setOpenModal({
      Modal: modal,
      Review: null
    })
  }

  const { setPage } = useContext(PageContext);

  const handleHome = () => {
    setPage({
      Page: "Landing",
      Course: null
    })
  }

  const handleCourses = () => {
    setPage({
      Page: "CourseListings",
      Course: null
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Button color="inherit" sx={{ padding: '20px' }} onClick={handleHome}>Home</Button>
          <Button color="inherit" sx={{ padding: '20px' }} onClick={handleCourses}>Courses</Button>
          <Button className="create-course-button" sx={{ padding: '8px 12px' }} onClick={handleOpen}>
            Create Course {isCoursePage ? "Review" : "Listing"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
