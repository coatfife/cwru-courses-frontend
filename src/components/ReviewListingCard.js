import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
} from "@mui/material";
import { useContext, useState } from "react";
import { CourseContext } from "../contexts/CourseContext";
import CreateCourseReview from "./CreateCourseReview";

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
    cardContent: {
        textAlign: "left",
        padding: "16px",
    },
    authorInfo: {
        display: "flex",
        color: "black",
        fontSize: "1rem",
        marginBottom: "8px",
    },
    authorLabel: {
        fontWeight: "bold",
        marginRight: "8px",
    },
    buttonGroup: {
        display: "flex",
        gap: "16px",
        marginTop: "16px",
    },
    editButton: {
        borderRadius: "100px",
        borderColor: "#003071",
        color: "#003071",
        fontWeight: "bold",
        textTransform: "uppercase",
        padding: "6px 12px",
        '&:hover': {
            backgroundColor: '#EDEDED',
            color: 'white',
            borderColor: '#003071',
        },
    },
    deleteButton: {
        borderRadius: "100px",
        backgroundColor: "#EB4B4B",
        color: "white",
        padding: "6px 12px",
        fontWeight: "bold",
        textTransform: "uppercase",
        '&:hover': {
            backgroundColor: "#e53935",
        },
    },
};

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function ReviewListingCard({ course, review }) {
    const { user, deleteReview, fetchCourses } = useContext(CourseContext);

    const handleDelete = async () => {
        await deleteReview(course.name, course.code, review.reviewId);
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
                <Box className="card-content" sx={{ display: "flex" }}>
                    {/* Left Section - Ratings */}
                    <Box sx={styles.ratingsSection}>
                        <Box sx={styles.ratingBadge}>
                            <Typography sx={styles.ratingValue}>{review.overall}</Typography>
                            <Typography sx={styles.ratingLabel}>Overall</Typography>
                        </Box>
                        <Box sx={styles.ratingBadge}>
                            <Typography sx={styles.ratingValue}>{review.difficulty}</Typography>
                            <Typography sx={styles.ratingLabel}>Difficulty</Typography>
                        </Box>
                        <Box sx={styles.ratingBadge}>
                            <Typography sx={styles.ratingValue}>{review.usefulness}</Typography>
                            <Typography sx={styles.ratingLabel}>Useful</Typography>
                        </Box>
                    </Box>

                    {/* Right Section - Review Content */}
                    <Box sx={styles.cardContent}>
                        <Box sx={styles.authorInfo}>
                            <Typography sx={styles.authorLabel}>Author:</Typography>
                            <Typography>{review.anonymous ? "Anonymous" : review.createdBy}</Typography>
                        </Box>
                        <Box sx={styles.authorInfo}>
                            <Typography sx={styles.authorLabel}>Tips:</Typography>
                            <Typography>{review.tips}</Typography>
                        </Box>
                        <Box sx={styles.authorInfo}>
                            <Typography sx={styles.authorLabel}>Major:</Typography>
                            <Typography>{review.major}</Typography>
                        </Box>

                        {/* Always rendered details */}
                        <Box sx={styles.authorInfo}>
                            <Typography sx={styles.authorLabel}>Additional Comments:</Typography>
                            <Typography>{review.additionalComments}</Typography>
                        </Box>
                        <Box sx={styles.authorInfo}>
                            <Typography sx={styles.authorLabel}>Created At:</Typography>
                            <Typography>{formatDate(review.createdAt)}</Typography>
                        </Box>

                        {user.email === review.createdBy && (
                            <Box sx={styles.buttonGroup}>
                                <Button
                                    onClick={handleOpenReviewModal}
                                    variant="outlined"
                                    sx={styles.editButton}
                                >
                                    Edit
                                </Button>

                                <Button
                                    onClick={handleDelete}
                                    variant="contained"
                                    sx={styles.deleteButton}
                                >
                                    Delete
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Card>

            {isReviewModalOpen && (
                <CreateCourseReview
                    setOpenModal={isReviewModalOpen}
                    onClose={handleCloseReviewModal}
                    course={course}
                    review={review}
                />
            )}
        </>
    );
}
