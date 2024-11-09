import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';
import { useContext, useState } from 'react';
import CreateCourseListing from './CreateCourseListing';
import { logout } from '../firebase/firebase';
import { CourseContext } from '../contexts/CourseContext';

export default function NavBar() {
    const navigate = useNavigate();
    const { setUser, fetchCourses } = useContext(CourseContext);
    const location = useLocation();  // Get current location

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleHome = async () => {
        await fetchCourses();
        navigate('/');
    };

    const handleCourses = async () => {
        await fetchCourses();
        navigate('/courses');
    };

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    // Helper function to determine if the button should be active
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/'; // Exact match for the home page
        }
        return location.pathname.startsWith(path);  // Check for any path starting with '/courses'
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ boxShadow: 'none' }}>
                <Toolbar sx={{ justifyContent: 'flex-end' }}>
                    <Button
                        className={`nav-button ${isActive('/') ? 'active' : ''}`}  // Add active class for exact match
                        onClick={handleHome}
                    >
                        Home
                    </Button>

                    <Button
                        className={`nav-button ${isActive('/courses') ? 'active' : ''}`}  // Add active class for /courses path and its children
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
                        className="logout-button"
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
