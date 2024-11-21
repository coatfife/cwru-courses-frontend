import * as React from 'react';
import SearchBar from './SearchBar';
import './NavBar.css';
import './Landing.css';

export default function Landing() {
  return (
    <>    
      <h1 className="heading">Rate CWRU Courses</h1>
      <p className="subheading">Find and share course reviews to help students like you.</p>
      <div className="divider"></div>
      <SearchBar />
      
      {/* Add the image under the heading and search bar */}
      <img 
        src="https://static.vecteezy.com/system/resources/previews/007/158/453/non_2x/creative-team-working-together-in-office-company-employees-busy-business-people-cartoon-characters-communicating-and-cooperating-at-work-flat-illustration-free-vector.jpg" 
        alt="People working together" 
        style={{
          width: '45%',       // Ensures the image spans the full width of the page
          height: 'auto',      // Maintains the aspect ratio of the image
          minHeight: '50vh',    // Ensures the image doesn't get too small (50% of the viewport height)
          objectFit: 'cover',  // Ensures the image covers the available space without stretching
        }} 
      />
    </>
  );
}
