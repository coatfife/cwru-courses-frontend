import CourseListingCard from './CourseListingCard'
import SearchBar from "./SearchBar"
import {useContext} from "react";
import {CourseContext} from "../contexts/CourseContext";

export default function CourseListings() {
    const {courses} = useContext(CourseContext);
    console.log(courses)
    const cards = courses.map((course) => <CourseListingCard key={course.courseId} course={course} />)
    return (
        <>
            <SearchBar />
            {cards}
        </>
    )
}