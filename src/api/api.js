const api_uri = 'https://26yopz6jrb.execute-api.us-east-1.amazonaws.com/prod/';

const sendRequest = async (data, method, endpoint = "courses/", queryParams = "") => {
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

        // Add query parameters to the endpoint
        const url = `${api_uri}${endpoint}${queryParams ? `?${queryParams}` : ""}`;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw new Error(error);
    }
};

// Function to get all courses
export const getCourses = async () => {
    return await sendRequest({}, "GET", "courses");
};

// Function to get a specific course by name and code
export const getCourseByNameAndCode = async (name, code) => {
    const queryParams = `name=${name}&code=${code}`;
    return await sendRequest({}, "GET", "courses", queryParams);
};

// Function to create a new course
export const createCourse = async (courseData) => {
    return await sendRequest(courseData, "POST", "courses");
};

// Function to update a course by name and code
export const updateCourse = async (name, code, updatedData) => {
    const queryParams = `name=${name}&code=${code}`;
    return await sendRequest(updatedData, "PUT", "courses", queryParams);
};

// Function to delete a course by name and code
export const deleteCourse = async (name, code) => {
    const queryParams = `name=${name}&code=${code}`;
    return await sendRequest({}, "DELETE", "courses", queryParams);
};

// Function to create a review for a course
export const createReview = async (name, code, reviewData) => {
    const queryParams = `name=${name}&code=${code}`;
    return await sendRequest(reviewData, "POST", "reviews", queryParams);
};

// Function to update a review by reviewId
export const updateReview = async (name, code, reviewId, updatedData) => {
    const queryParams = `name=${name}&code=${code}&reviewId=${reviewId}`;
    return await sendRequest(updatedData, "PUT", "reviews", queryParams);
};

// Function to delete a review by reviewId
export const deleteReview = async (name, code, reviewId) => {
    const queryParams = `name=${name}&code=${code}&reviewId=${reviewId}`;
    return await sendRequest({}, "DELETE", "reviews", queryParams);
};

// Function to search for courses matching a query
export const searchCourse = async (query) => {
    return await sendRequest({ query }, "POST", "search");
};
