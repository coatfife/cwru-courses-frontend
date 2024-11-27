import React from 'react';
import './Stats.css';
import Visualizations from "./Visualization"; // Assuming you want to add custom styles for your header

const Stats = () => {
    return (
        <>
        <div className="stats-container">
            {/* Header */}
            <h1 className="header">Course Review Statistics</h1>
            {/* Subheader with embedded link */}
            <p className="subheader">
                Explore statistics and insights about CWRU course reviews
            </p>
        </div>
            <Visualizations/>
            </>
    );
};

export default Stats;
