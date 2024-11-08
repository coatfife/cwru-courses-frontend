import {
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    Button,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useContext, useState } from "react";
import "./CourseListingCard.css";
import { CourseContext } from "../contexts/CourseContext";
import CreateCourseReview from "./CreateCourseReview";

export default function ReviewListingCard({ course, review }) {
    const [showMore, setShowMore] = useState(false);
    const { user, deleteReview, fetchCourses } = useContext(CourseContext); // Assuming deleteReview is available in the context

    const handleToggle = () => {
        setShowMore(!showMore); // Toggle the visibility of additional info
    };

    const handleDelete = async () => {
        // Logic to delete the review
        await deleteReview(course.courseId, review.reviewId); // Ensure you have the review ID to delete
        await fetchCourses();
    };


    const [isReviewModalOpen, setReviewModalOpen] = useState(false);

    const handleOpenReviewModal = () => {
        setReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setReviewModalOpen(false);
    };

    return (
        <>
        <Card className="card" sx={{ cursor: "pointer" }}>
            <Box className="card-content">
                <Box className="rating-badge">
                    <Typography>{review.overall}</Typography>
                    <Typography className="rating-label">Overall</Typography>
                </Box>
                <Box className="rating-badge">
                    <Typography>{review.difficulty}</Typography>
                    <Typography className="rating-label">Difficulty</Typography>
                </Box>
                <Box className="rating-badge">
                    <Typography>{review.usefulness}</Typography>
                    <Typography className="rating-label">Useful</Typography>
                </Box>
                <CardContent sx={{ textAlign: "left" }}>
                    <Typography
                        sx={{ fontSize: "1rem", color: "#666", marginBottom: "8px" }}
                    >
                        Author: {review.anonymous ? "Anonymous" : review.createdBy}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", color: "#666" }}>
                        Tips: {review.tips}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", color: "#666" }}>
                        Major: {review.major}
                    </Typography>

                    {/* Show more info if toggled */}
                    {showMore && (
                        <>
                            <Typography sx={{ fontSize: "1rem", color: "#666" }}>
                                Additional Comments: {review.additionalComments}
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", color: "#666" }}>
                                Created At: {review.createdAt}
                            </Typography>
                        </>
                    )}

                    {/* Toggle button for showing more info */}
                    <IconButton onClick={handleToggle}>
                        {showMore ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>

                    {/* Conditionally render Edit and Delete buttons */}
                    {user.email === review.createdBy && (
                        <Box>
                            <Button
                                onClick={handleOpenReviewModal}
                                variant="contained"
                                className="create-course-button"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={handleDelete}
                                variant="contained"
                                className="create-course-button"
                            >
                                Delete
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Box>
        </Card>
            {isReviewModalOpen && (
                <CreateCourseReview
                    setOpenModal={isReviewModalOpen}
                    onClose={handleCloseReviewModal}
                    course={course}
                    review = {review}
                />
            )}
            </>
    );
}
