import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import CreateCourseReview from "./CreateCourseReview";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../contexts/CourseContext";
import "./CourseListingCard.css"

// Styles
const styles = {
    ratingsSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: "0 0 100px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
        gap: "12px",
    },
    ratingBadge: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "8px",
        width: "80px",
        textAlign: "center",
    },
    ratingValue: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "#1976d2",
    },
    ratingLabel: {
        fontSize: "0.85rem",
        color: "#666",
    },
};

export default function CourseListingCard({ course }) {
    const navigate = useNavigate();
    const { user } = useContext(CourseContext);
    const userHasReviewed = course?.reviews?.some((review) => review.createdBy === user?.email);

    const calculateRating = (ratingName) => {
        if (course.reviews.length === 0) return "--";
        let rating = 0;
        course.reviews.forEach((element) => (rating += element[ratingName]));
        rating /= course.reviews.length;
        return rating.toFixed(1);
    };

    const [isReviewModalOpen, setReviewModalOpen] = useState(false);

    const handleOpenReviewModal = () => {
        setReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setReviewModalOpen(false);
    };

    const handleClick = (e) => {
        navigate(`/courses/${course?.courseId}`);
    };

    return (
        <>
            <Card className="card" onClick={handleClick} sx={{ cursor: "pointer" }}>
                <Box className="card-content" sx={{ display: "flex" }}>
                    {/* Left Section - Ratings */}
                    <Box sx={styles.ratingsSection}>
                        <Box sx={styles.ratingBadge}>
                            <Typography sx={styles.ratingValue}>{calculateRating("overall")}</Typography>
                            <Typography sx={styles.ratingLabel}>Overall</Typography>
                        </Box>

                        <Box sx={styles.ratingBadge}>
                            <Typography sx={styles.ratingValue}>{calculateRating("difficulty")}</Typography>
                            <Typography sx={styles.ratingLabel}>Difficulty</Typography>
                        </Box>

                        <Box sx={styles.ratingBadge}>
                            <Typography sx={styles.ratingValue}>{calculateRating("usefulness")}</Typography>
                            <Typography sx={styles.ratingLabel}>Useful</Typography>
                        </Box>
                    </Box>

                    {/* Right Section - Course Content */}
                    <Box sx={{ flex: "1", textAlign: "left", padding: "16px" }}>
                        <CardContent>
                            <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold", marginBottom: "4px" }}>
                                {course.title}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    color: "#666",
                                    marginBottom: "8px",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    WebkitLineClamp: 3, // Limits the description to 3 lines
                                }}
                            >
                                {course.description}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: "bold", // Make the text bold
                                    color: "#1976d2", // Use a more noticeable color
                                    marginTop: "8px", // Add spacing for separation
                                }}
                            >
                                {course.reviews.length === 1
                                    ? `${course.reviews.length} review`
                                    : `${course.reviews.length} reviews`}
                            </Typography>
                            <br/>

                            {!userHasReviewed && (
                                <Button
                                    variant="contained"
                                    className="create-course-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenReviewModal();
                                    }}
                                >
                                    Add Review
                                </Button>
                            )}
                        </CardContent>
                    </Box>
                </Box>
            </Card>
            {isReviewModalOpen && (
                <CreateCourseReview
                    setOpenModal={isReviewModalOpen}
                    onClose={handleCloseReviewModal}
                    course={course}
                />
            )}
        </>
    );
}
