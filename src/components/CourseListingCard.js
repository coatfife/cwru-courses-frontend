import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import './CourseListingCard.css';
import {useContext, useState} from "react";
import PageContext from "../contexts/PageContext";
import CreateCourseReview from "./CreateCourseReview";
import {useNavigate} from "react-router-dom";
import {CourseContext} from "../contexts/CourseContext";

export default function CourseListingCard({ course }) {
    const navigate = useNavigate();
    const {user} = useContext(CourseContext);
    const userHasReviewed = course?.reviews?.some((review)=>review.createdBy === user?.email);
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
        navigate(`/courses/${course?.courseId}`)
    };

    return (
        <>
        <Card className="card" onClick={handleClick} sx={{ cursor: 'pointer' }}>
            <Box className="card-content">
                <Box className="rating-badge">
                    <Typography>{calculateRating("overall")}</Typography>
                    <Typography className="rating-label">Overall</Typography>
                </Box>
                <Box className="rating-badge">
                    <Typography>{calculateRating("difficulty")}</Typography>
                    <Typography className="rating-label">Difficulty</Typography>
                </Box>
                <Box className="rating-badge">
                    <Typography>{calculateRating("usefulness")}</Typography>
                    <Typography className="rating-label">Useful</Typography>
                </Box>
                <CardContent sx={{ textAlign: 'left' }}>
                    <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '4px' }}>
                        {course.title}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', color: '#666', marginBottom: '8px' }}>
                        {course.description}
                    </Typography>
                    <Typography sx={{ fontSize: '0.85rem', color: '#999', marginBottom: '16px' }}>
                        {course.reviews.length === 1 ? `${course.reviews.length} review` : `${course.reviews.length} reviews`}
                    </Typography>
                    {!userHasReviewed &&
                    <Button
                        variant="contained"
                        className='create-course-button'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleOpenReviewModal();
                        }}
                    >
                        Add Review
                    </Button>
                    }
                </CardContent>
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
