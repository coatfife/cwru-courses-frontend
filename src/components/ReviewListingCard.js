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
    const [showMore, setShowMore] = useState(false);
    const { user, deleteReview, fetchCourses } = useContext(CourseContext);

    const handleToggle = () => {
        setShowMore(!showMore);
    };

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
                        <Box sx={{ display: "flex", color: "black", fontSize: "1rem", mb: 1 }}>
                            <Typography sx={{ fontWeight: "bold", mr: 1 }}>Author:</Typography>
                            <Typography>{review.anonymous ? "Anonymous" : review.createdBy}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", color: "black", fontSize: "1rem", mb: 1 }}>
                            <Typography sx={{ fontWeight: "bold", mr: 1 }}>Tips:</Typography>
                            <Typography>{review.tips}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", color:"black", fontSize: "1rem", mb: 1 }}>
                            <Typography sx={{ fontWeight: "bold", mr: 1 }}>Major:</Typography>
                            <Typography>{review.major}</Typography>
                        </Box>

                        {showMore && (
                            <>
                                <Box sx={{ display: "flex", color: "black", fontSize: "1rem", mb: 1 }}>
                                    <Typography sx={{ fontWeight: "bold", mr: 1 }}>Additional Comments:</Typography>
                                    <Typography>{review.additionalComments}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", color: "black", fontSize: "1rem", mb: 1 }}>
                                    <Typography sx={{ fontWeight: "bold", mr: 1 }}>Created At:</Typography>
                                    <Typography>{formatDate(review.createdAt)}</Typography>
                                </Box>
                            </>
                        )}

                        <IconButton onClick={handleToggle}>
                            {showMore ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>

                        {user.email === review.createdBy && (
                            <Box>
                               <Button
                                    onClick={handleOpenReviewModal}
                                    variant="outlined" // Use outlined variant for Edit button
                                    sx={{
                                        borderRadius: '100px', // Rounded corners with 100px radius
                                        borderColor: '#003071', // Blue border for the Edit button
                                        color: '#003071', // Blue text color for the Edit button
                                        marginRight: '16px', // Spacing between Edit and Delete
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        padding: '6px 12px',
                                        transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'EDEDED', 
                                            color: 'white', // White text on hover
                                            borderColor: '#003071', // Blue border on hover
                                        }
                                    }}
                                >
                                    Edit
                                </Button>

                                <Button
                                    onClick={handleDelete}
                                    variant="contained" // Keep "contained" for Delete button (solid background)
                                    sx={{
                                        borderRadius: '100px', // Rounded corners with 100px radius
                                        backgroundColor: '#EB4B4B', // Red background for the Delete button
                                        color: 'white' , // White text for the Delete button
                                        padding: '6px 12px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        transition: 'background-color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: '#e53935', // Darker red on hover
                                        }
                                    }}
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
                    review={review}
                />
            )}
        </>
    );
}
