import {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    createReview,
    updateReview,
    deleteReview
} from "./api";

// 1. Get all courses
const getAllCoursesExample = async () => {
    const response = await getCourses();
    console.log("All Courses:", response);
};

// 2. Get a specific course by courseId
const getCourseByIdExample = async (courseId) => {
    //course ID should be a string
    const response = await getCourses(courseId);
    console.log(`Course ${courseId}:`, response);
};

// 3. Create a new course
const createCourseExample = async () => {
    //make sure all the below values are provide. if no aliases, prerequisites, or reviews provide an empty array []
    const newCourse = {
        courseId: "CDSE3030",
        title: "Advanced Programming",
        createdBy: "professor3",
        description: "A deep dive into advanced programming techniques.",
        aliases: ["COMP303"],
        prerequisites: ["CDSE1013"],
        reviews: []
    };

    const response = await createCourse(newCourse);
    console.log("Create Course Response:", response);
};

// 4. Update a course by courseId
const updateCourseExample = async () => {
    const courseId = "CDSE3030";
    const updatedCourseData = {
        title: "Advanced Programming Techniques",
        description: "Updated description for advanced programming.",
        aliases: ["COMP303A"]
    };

    const response = await updateCourse(courseId, updatedCourseData);
    console.log(`Update Course ${courseId} Response:`, response);
};

// 5. Delete a course by courseId
const deleteCourseExample = async () => {
    const courseId = "CDSE3030";  // Example course ID to delete
    const response = await deleteCourse(courseId);
    console.log(`Delete Course ${courseId} Response:`, response);
};

// 6. Create a review for a course
const createReviewExample = async () => {
    const courseId = "CDSE1013";  // Example course ID to add review to
    const newReview = {
        reviewId: "review123",
        author: "student1",
        content: "This course was challenging and insightful.",
        rating: 5
    };

    const response = await createReview(courseId, newReview);
    console.log(`Create Review for Course ${courseId} Response:`, response);
};

// 7. Update a review by reviewId
const updateReviewExample = async () => {
    const courseId = "CDSE1013";
    const reviewId = "review123";  // Example review ID to update
    const updatedReviewData = {
        content: "Updated review content for the course.",
        rating: 4
    };

    const response = await updateReview(courseId, reviewId, updatedReviewData);
    console.log(`Update Review ${reviewId} for Course ${courseId} Response:`, response);
};

// 8. Delete a review by reviewId
const deleteReviewExample = async () => {
    const courseId = "CDSE1013";
    const reviewId = "review123";  // Example review ID to delete
    const response = await deleteReview(courseId, reviewId);
    console.log(`Delete Review ${reviewId} for Course ${courseId} Response:`, response);
};

