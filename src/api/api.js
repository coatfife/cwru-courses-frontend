const api_uri = 'https://tzui4wlphi.execute-api.us-east-1.amazonaws.com/prod/';

const sendRequest = async (data, method, endpoint = "courses/") => {
    try {
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (method === "POST" || method === "PUT") {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${api_uri}${endpoint}`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        return null;
    }
};

// Function to get all courses
export const getCourses = async () => {
    return await sendRequest({}, "GET", "courses");
};

// Function to get a specific course by courseId
export const getCourseById = async (courseId) => {
    return await sendRequest({}, "GET", `courses/?courseId=${courseId}`);
};

// Function to create a new course
export const createCourse = async (courseData) => {
    return await sendRequest(courseData, "POST", "courses");
};

// Function to update a course by courseId
export const updateCourse = async (courseId, updatedData) => {
    return await sendRequest(updatedData, "PUT", `courses/?courseId=${courseId}`);
};

// Function to delete a course by courseId
export const deleteCourse = async (courseId) => {
    return await sendRequest({}, "DELETE", `courses/?courseId=${courseId}`);
};

// Function to create a review for a course
export const createReview = async (courseId, reviewData) => {
    return await sendRequest(reviewData, "POST", `reviews/?courseId=${courseId}`);
};

// Function to update a review by reviewId
export const updateReview = async (courseId, reviewId, updatedData) => {
    return await sendRequest(updatedData, "PUT", `reviews/?courseId=${courseId}&reviewId=${reviewId}`);
};

// Function to delete a review by reviewId
export const deleteReview = async (courseId, reviewId) => {
    return await sendRequest({}, "DELETE", `reviews/?courseId=${courseId}&reviewId=${reviewId}`);
};
