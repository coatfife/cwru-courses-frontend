import { Typography } from "@mui/material"
import ReviewListingCard from "./ReviewListingCard"
import {useContext} from "react";
import {CourseContext} from "../contexts/CourseContext";
import {useNavigate, useParams} from "react-router-dom";

export default function CoursePage() {
    const {courses} = useContext(CourseContext);
    const {id} = useParams();
    const navigate = useNavigate();

    const course = courses.find((c)=> c.courseId === id)

    if(!course){
        navigate('/');
    }

    console.log("course being looked at ", course)

    let cards = course.reviews.map((review) => <ReviewListingCard key={review.reviewId} review={review} course={course} />)
    if (cards.length === 0) cards = <Typography><i>No reviews yet. Click "Create Course Review" to create a review for this course.</i></Typography>
    return (
        <>
            <Typography variant='h6' mb={2}><b>{course.number} - {course.title}</b></Typography>
            <Typography>{course.description}</Typography>
            {cards}
        </>
    )
}