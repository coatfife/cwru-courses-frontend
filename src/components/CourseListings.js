import CourseListingCard from './CourseListingCard'
import SearchBar from "./SearchBar"

const courses = [
    {
        title: "Introduction to Data Structures",
        number: "CSDS 233",
        description: "Some description",
        reviews: 30,
        rating: 4.1,
        id: 1
    },
    {
        title: "Algorithms",
        number: "CSDS 310",
        description: "Algorithms description",
        reviews: 20,
        rating: 2.0,
        id: 2
    },
    {
        title: "Introducing Islam",
        number: "RLGN 172",
        description: "Introducing Islam description",
        reviews: 12,
        rating: 4.5,
        id: 3
    },
    {
        title: "Introduction to Data Structures",
        number: "CSDS 233",
        description: "Some discription",
        reviews: 30,
        rating: 4.1,
        id: 4
    }
] //example of courses retrieved from the server

export default function CourseListings() {
    const cards = courses.map((course) => <CourseListingCard key={course.id} course={course} />)
    return (
        <>
            <SearchBar />
            {cards}
        </>
    )
}