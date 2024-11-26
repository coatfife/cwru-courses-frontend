import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import CourseListingCard from "./CourseListingCard";
import SearchBar from "./SearchBar";
import { CourseContext } from "../contexts/CourseContext";

export default function CourseListings() {
    const { courses } = useContext(CourseContext);
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page
    const coursesPerPage = 15; // Number of courses to display per page

    // Reset currentPage to 1 when courses change
    useEffect(() => {
        setCurrentPage(1);
    }, [courses]);

    // Calculate the index range for courses on the current page
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const currentCourses = courses.slice(startIndex, endIndex);

    const totalPages = Math.ceil(courses.length / coursesPerPage);

    // Function to handle page navigation
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
    };

    // Check if courses is empty or null and display a message
    if (!courses?.length) {
        return (
            <>
                <SearchBar />
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="50vh"
                    bgcolor="background.default"
                    color="text.secondary"
                >
                    <Typography variant="h5">
                        No Courses Found! Click the 'Create Course Listing' button to create one.
                    </Typography>
                </Box>
            </>
        );
    }

    // Render the courses and pagination controls
    return (
        <>
            <SearchBar />
            {currentCourses.map((course) => (
                <CourseListingCard key={course.courseId} course={course} />
            ))}
            <Stack direction="row" justifyContent="center" spacing={2} marginTop={2}>
                <Button
                    variant="contained"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    sx={{
                        marginLeft: '8px',
                        color: '#fff',
                        backgroundColor: '#1976d2',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                        '&:disabled': {
                            backgroundColor: '#e0e0e0',
                            color: '#9e9e9e',
                        },
                    }}
                >
                    Previous
                </Button>
                <Typography variant="body1">
                    Page {currentPage} of {totalPages}
                </Typography>
                <Button
                    variant="contained"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    sx={{
                        marginLeft: '8px',
                        color: '#fff',
                        backgroundColor: '#1976d2',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                        '&:disabled': {
                            backgroundColor: '#e0e0e0',
                            color: '#9e9e9e',
                        },
                    }}
                >
                    Next
                </Button>
            </Stack>
            <br />
        </>
    );
}
