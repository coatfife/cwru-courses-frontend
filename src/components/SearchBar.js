import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Popover from '@mui/material/Popover';
import { CourseContext } from "../contexts/CourseContext";
import { toast } from "react-toastify";
import './SearchBar.css';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { search, courses } = useContext(CourseContext);

    const handleSearch = async () => {
        try {
            await search(searchQuery);
            navigate(`/courses`);
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'course-popover' : undefined;

    const handleCourseClick = (courseId) => {
        // Navigate to the course details page or perform any other action
        navigate(`/courses/${courseId}`);
    };

    return (
        <div className="search-bar-container">
            <Paper
                variant="outlined"
                sx={{
                    width: '800px',
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: 'none',
                    borderRadius: '50px'
                }}
            >
                <IconButton
                    sx={{ p: '10px' }}
                    aria-label="menu"
                    onClick={handlePopoverOpen}
                >
                    <MenuIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search a course to get started (e.g. CHEM 111)"
                    inputProps={{ 'aria-label': 'search for courses' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                />
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={handleSearch}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div style={{ padding: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                    {courses.map(course => (
                        <div
                            key={course.courseId}
                            onClick={() => handleCourseClick(course.courseId)}
                            style={{ padding: '8px', cursor: 'pointer' }}
                        >
                            {course.title}
                        </div>
                    ))}
                </div>
            </Popover>
        </div>
    );
}

export default SearchBar;
