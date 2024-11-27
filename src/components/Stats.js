import React, { useContext } from 'react';
import './Stats.css';
import Visualizations from "./Visualization";
import SearchBar from "./SearchBar";
import { CourseContext } from "../contexts/CourseContext";

const Stats = () => {
    const { courses } = useContext(CourseContext);

    // Get the total number of courses
    const courseCount = courses.length;

    // Get the titles of the first two courses if they exist
    const firstTwoCourses = courses.slice(0, 2).map(course => course.title);

    return (
        <>
            <SearchBar location={"stats"} />
            <div className="stats-container">
                {/* Header */}
                <h1 className="header">Course Review Statistics</h1>

                {/* Subheader with embedded link */}
                <p className="subheader">
                    Explore statistics and insights about CWRU course reviews
                </p>

                {/* Display statistics about courses */}
                <div className="course-stats">
                    <p>
                        This is statistics for <strong>{courseCount}</strong> courses
                        {courseCount > 0 && (
                            <>
                                , including{" "}
                                <strong>{firstTwoCourses[0]}</strong>
                                {courseCount > 1 && (
                                    <>
                                        {" "}and <strong>{firstTwoCourses[1]}</strong>
                                    </>
                                )}
                                .
                            </>
                        )}
                    </p>
                </div>
            </div>

            {/* Visualization Component */}
            <Visualizations />
        </>
    );
};

export default Stats;
