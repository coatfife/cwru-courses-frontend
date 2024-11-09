import { Typography, Box } from "@mui/material";
import ReviewListingCard from "./ReviewListingCard";
import { useContext } from "react";
import { CourseContext } from "../contexts/CourseContext";
import { useNavigate, useParams } from "react-router-dom";

export default function CoursePage() {
  const { courses } = useContext(CourseContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.courseId === id);

  if (!course) {
    navigate('/');
  }

  console.log("course being looked at ", course);

  let cards = course.reviews.map((review) => <ReviewListingCard key={review.reviewId} review={review} course={course} />);
  if (cards.length === 0) {
    cards = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh', // 50% of the viewport height (adjust as needed)
        }}
      >
        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
          No reviews yet! Go back and click "Add Review" to create a review for this course.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography variant='h5' mb={2}><b>{course.number} {course.title}</b></Typography> {/* Largest */}
      <Typography variant='h6' mb={2}>{course.description}</Typography> {/* Slightly smaller */}
      {cards}
    </>
  );
}
