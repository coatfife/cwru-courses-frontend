import CourseListingCard from './CourseListingCard'
import SearchBar from "./SearchBar"

const courses = [
    {
        title: "Introduction to Data Structures",
        number: "CSDS 233",
        description: "Data structures description",
        reviewCount: 30,
        id: 1,
        reviews: [
            {
                author: "abc123",
                id: 1,
                overall: 10,
                difficulty: 8,
                usefulness: 6,
                tips: "watch lecture",
                additionalComments: "i love this class",
                major: "Computer Science",
            }
        ]
    },
    {
        title: "Algorithms",
        number: "CSDS 310",
        description: "Algorithms description",
        id: 2,
        reviews: [
            {
                author: "abc123",
                id: 1,
                overall: 1,
                difficulty: 7,
                usefulness: 2,
                tips: "do the homework",
                additionalComments: "i hate this class",
                major: "Computer Science",
            }
        ]
    },
    {
        title: "Introducing Islam",
        number: "RLGN 172",
        description: "Introducing Islam description",
        id: 3,
        reviews: [
        ]
    },
    {
        title: "Physiology-Biophysics",
        number: "EBME 201",
        description: "ebme 201 description",
        id: 4,
        reviews: [
            {
                author: "abc123",
                id: 1,
                overall: 10,
                difficulty: 10,
                usefulness: 10,
                tips: "watch lecture",
                additionalComments: "i love this class",
                major: "Computer Science",
            }
        ]
    }
] //example of courses retrieved from the server

export default function CourseListings({ setPage }) {
    const cards = courses.map((course) => <CourseListingCard key={course.id} course={course} />)
    return (
        <>
            <SearchBar />
            {cards}
        </>
    )
}