import React from 'react';
import './Stats.css'; // Assuming you want to add custom styles for your header

const Stats = () => {
    return (
        <div className="stats-container">
            {/* Header */}
            <h1 className="header">Course Review Statistics</h1>

            {/* Subheader with embedded link */}
            <p className="subheader">
                Explore statistics and insights about CWRU course reviews <a 
                    href="https://long-fire-3158.ploomberapp.io/"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="statistics-link"
                >
                    here
                </a>.
            </p>

            {/* Image */}
            <img 
                src="https://media.istockphoto.com/id/1276762724/vector/tiny-analysts-working-with-data-on-dashboard.jpg?s=612x612&w=0&k=20&c=PAdH2MDIJlUacGprOQN_3p5yfHzUPH6Fx4dw80088hk=" 
                alt="Data Trend Cartoon"
                className="stats-image"
            />
        </div>
    );
};

export default Stats;
