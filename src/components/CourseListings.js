import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import CourseListingCard from "./CourseListingCard";
import SearchBar from "./SearchBar";
import { CourseContext } from "../contexts/CourseContext";

export default function CourseListings() {
    const { courses } = useContext(CourseContext);

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
                    <Typography variant="h5">No Courses Found!</Typography>
                </Box>
            </>
        );
    }

    // Map courses to display CourseListingCard components
    return (
        <>
            <SearchBar />
            {courses.map((course) => (
                <CourseListingCard key={course.courseId} course={course} />
            ))}
        </>
    );
}
