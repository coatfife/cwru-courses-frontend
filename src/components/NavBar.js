import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import './NavBar.css';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
       <AppBar position="static" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Courses</Button>
          <Button className="create-course-button"> {/* Add a class for styling */}
            Create Course Listing
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
