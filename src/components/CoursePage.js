import { Typography, Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import { CourseContext } from "../contexts/CourseContext";
import { useNavigate, useParams } from "react-router-dom";
import ReviewListingCard from "./ReviewListingCard";

export default function CoursePage() {
    const { courses } = useContext(CourseContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const course = courses.find((c) => c.courseId === id);

    if (!course) {
        navigate('/');
    }

    console.log("course being looked at ", course);

    // Pagination setup
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 8;

    // Calculate the indexes for slicing the reviews
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = course.reviews.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(course.reviews.length / reviewsPerPage);

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0); // Scroll to the top
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0); // Scroll to the top
        }
    };

    let cards = currentReviews.map((review) => <ReviewListingCard key={review.reviewId} review={review} course={course} />);
    if (cards.length === 0) {
        cards = (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '50vh',
                }}
            >
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    No reviews yet! Go back and click "Add Review" to create a review for this course.
                </Typography>
            </Box>
        );
    }

    const [expanded, setExpanded] = useState(false);

    const handleToggleDescription = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Typography variant="h5" mb={2}>
                <b>{course.number} {course.title}</b>
            </Typography>

            {/* Course Description */}
            <Typography
                variant="h6"
                mb={2}
                sx={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: expanded ? 'none' : 3,
                }}
            >
                {course.description}
            </Typography>

            <Button
                onClick={handleToggleDescription}
                sx={{
                    marginBottom: '16px',
                    color: '#1976d2',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        color: '#1565c0',
                    },
                }}
            >
                {expanded ? 'Show Less' : 'Show More'}
            </Button>

            {cards}

            {/* Pagination Buttons */}
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '16px'}}>
                <Button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    sx={{
                        marginRight: '8px',
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
                <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
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

            </Box>
            <br/>
        </>
    );
}
