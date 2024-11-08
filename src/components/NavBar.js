import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import './NavBar.css';
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import CreateCourseListing from "./CreateCourseListing";
import {logout} from '../firebase/firebase';
import {CourseContext} from "../contexts/CourseContext";

export default function NavBar() {
    const navigate = useNavigate();
    const {setUser, fetchCourses} = useContext(CourseContext);

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleOpen = () => {

    };

    const handleHome = async() => {
        await fetchCourses()
       navigate('/');
    };

    const handleCourses = async () => {
        await fetchCourses()
        navigate('/courses');
    };

    const handleLogout = ()=>{
        logout();
        setUser(null);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ boxShadow: 'none' }}>
                <Toolbar sx={{ justifyContent: 'flex-end' }}>
                    {/* Add class based on active page */}
                    <Button
                        className='nav-button'
                        onClick={handleHome}
                    >
                        Home
                    </Button>

                    <Button
                        className='nav-button'
                        onClick={handleCourses}
                    >
                        Courses
                    </Button>

                    <Button
                        className="create-course-button"
                        onClick={handleOpenModal}
                    >
                        Create Course Listing
                    </Button>
                    <Button
                        className="create-course-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    <CreateCourseListing open={modalOpen} onClose={handleCloseModal} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}