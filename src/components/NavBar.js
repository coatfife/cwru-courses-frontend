import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';
import { useContext, useState } from 'react';
import CreateCourseListing from './CreateCourseListing';
import { logout } from '../firebase/firebase';
import { CourseContext } from '../contexts/CourseContext';
import { toast } from "react-toastify";

export default function NavBar() {
    const navigate = useNavigate();
    const { fetchCourses } = useContext(CourseContext);
    const location = useLocation();

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

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("User logged out successfully!");
        } catch (error) {
            toast.error("Error during logout:", error);
        }
    };

    const handleStats = () => {
        navigate("/stats");
    };

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ boxShadow: 'none', backgroundColor: '#ffffff' }}>
                <Toolbar sx={{ justifyContent: 'flex-end', gap: '20px' }}>
                    <h3
                        className={`nav-item ${isActive('/') ? 'active' : ''}`}
                        onClick={handleHome}
                    >
                        Home
                    </h3>
                    <h3
                        className={`nav-item ${isActive('/courses') ? 'active' : ''}`}
                        onClick={handleCourses}
                    >
                        Courses
                    </h3>
                    <h3
                        className={`nav-item ${isActive('/stats') ? 'active' : ''}`}
                        onClick={handleStats}
                    >
                        Stats
                    </h3>
                    <h3
                        className="nav-item"
                        onClick={handleOpenModal}
                    >
                        Create Course
                    </h3>
                    <h3
                        className="nav-item"
                        onClick={handleLogout}
                    >
                        Logout
                    </h3>
                    <CreateCourseListing open={modalOpen} onClose={handleCloseModal} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
