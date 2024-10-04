import { Typography } from "@mui/material"
import ReviewListingCard from "./ReviewListingCard"

export default function CoursePage({ course }) {
    let cards = course.reviews.map((review) => <ReviewListingCard key={review.id} review={review} />)
    if (cards.length === 0) cards = <Typography><i>No reviews yet. Click "Create Course Review" to create a review for this course.</i></Typography>
    return (
        <>
            <Typography variant='h6' mb={2}><b>{course.number} - {course.title}</b></Typography>
            <Typography>{course.description}</Typography>
            {cards}
        </>
    )
}