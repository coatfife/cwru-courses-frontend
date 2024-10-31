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
} from '../api/api'
import {getCurrentUser} from "../firebase/firebase";

// Create a context for calendars
export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourse] = useState([]);
    const [user, setUser] = useState(getCurrentUser());

    const createSingleCourse = async (course)=>{
        await createCourse(course)
        await fetchCourses()
    }

    const fetchCourses = async ()=>{
       const res =  await getCourses()
        setCourse(res)
    }

    const search = async (query)=>{
        const res = await searchCourse(query)
        setCourse(res);
    }

    useEffect(()=>{
        const fetch = async ()=>{
            await fetchCourses();
        }

        fetch();
    }, [user])

    return (
        <CourseContext.Provider
            value={{
                courses,
                createSingleCourse,
                createCourse,
                fetchCourses,
                user,
                setUser,
                search
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