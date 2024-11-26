import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, InputBase, IconButton, Popover } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
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

    const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
    const handlePopoverClose = () => setAnchorEl(null);
    const handleCourseClick = (courseId) => navigate(`/courses/${courseId}`);

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
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <div className="popover-content">
                    {courses.map((course) => (
                        <div
                            key={course.courseId}
                            className="popover-item"
                            onClick={() => handleCourseClick(course.courseId)}
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
