import { Typography } from "@mui/material"
import ReviewListingCard from "./ReviewListingCard"
import { useLoaderData } from "react-router-dom"
import { Link } from "react-router-dom";

export default function CoursePage() {
    const course = useLoaderData();
    let cards = course.reviews.map((review) => <ReviewListingCard key={review.id} review={review} />)
    if (cards.length === 0) cards = <Typography><i>No reviews yet. Click "Create Course Review" to create a review for this course.</i></Typography>
    return (
        <>
            <Typography variant='h6' mb={2}><b>{course.number} - {course.title}</b></Typography>
            <Typography>{course.description}</Typography>
            <Link to={"/courses"}>Back to course listings...</Link>
            {cards}
        </>
    )
}