import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    createReview,
    updateReview,
    deleteReview,
    searchCourse
} from '../api/api';
import { getCurrentUser } from "../firebase/firebase";

// Create a context for courses
export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState(() => {
        // Retrieve courses from local storage if available
        const storedCourses = localStorage.getItem('courses');
        return storedCourses ? JSON.parse(storedCourses) : [];
    });

    const [user, setUser] = useState(() => {
        // Retrieve user from local storage if available, otherwise get the current user from Firebase
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : getCurrentUser();
    });

    const createSingleCourse = async (course) => {
        await createCourse(course);
        await fetchCourses();
    };

    const fetchCourses = async () => {
        try{
            const res = await getCourses();
            setCourses(res);
        }
        catch(e){
            console.log(e);
        }

    };

    const search = async (query) => {
        try{
            const res = await searchCourse(query);
            setCourses(res);
        }
        catch(e){
            setCourses([]);
            throw new Error("no course found")
        }

    };

    // Update local storage whenever the user state changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Update local storage whenever the courses state changes
    useEffect(() => {
        localStorage.setItem('courses', JSON.stringify(courses));
    }, [courses]);

    useEffect(() => {
        fetchCourses().then(r => null);
    }, []);

    return (
        <CourseContext.Provider
            value={{
                courses,
                createSingleCourse,
                createCourse,
                fetchCourses,
                user,
                setUser,
                search,
                createReview,
                deleteReview,
                updateReview,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};

export const useStateContext = () => {
    return useContext(CourseContext);
};

export default CourseProvider;
