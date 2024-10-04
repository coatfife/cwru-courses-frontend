import ReviewListingCard from "./ReviewListingCard"
import SearchBar from "./SearchBar"

export default function CoursePage({ course }) {
    const cards = course.reviews.map((review) => <ReviewListingCard key={review.id} review={review} />)
    return (
        <>
            <SearchBar />
            {cards}
        </>
    )
}