import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { searchCourse } from '../api/api'; // Make sure the searchCourse function is imported

export default function SearchCoursesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle course search
    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await searchCourse(searchQuery);
            if (response && response.length > 0) {
                setCourses(response);
            } else {
                setCourses([]);
                setError('No courses found for the given search query.');
            }
        } catch (err) {
            console.error('Error searching for courses:', err);
            setError('An error occurred while searching for courses.');
        }
        setLoading(false);
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Search for Courses
            </Typography>

            {/* Search Input */}
            <TextField
                label="Search Courses"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 2 }}
            />

            {/* Search Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={loading || !searchQuery}
            >
                {loading ? 'Searching...' : 'Search'}
            </Button>

            {/* Error message */}
            {error && (
                <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}

            {/* Course List */}
            {courses.length > 0 && (
                <List sx={{ mt: 2 }}>
                    {courses.map((course) => (
                        <ListItem key={course.courseId} sx={{ borderBottom: '1px solid #ddd' }}>
                            <ListItemText
                                primary={course.title}
                                secondary={`Description: ${course.description}`}
                            />
                        </ListItem>
                    ))}
                </List>
            )}

            {/* No results message */}
            {!loading && courses.length === 0 && !error && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Enter a query to search for courses.
                </Typography>
            )}
        </Box>
    );
}
