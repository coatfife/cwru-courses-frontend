import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { courses } from './components/CourseListings';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App page={{
      Page: "Landing"
    }} />
  },
  {
    path: "courses",
    element: <App page={{
      Page: "CourseListings"
    }} />,
  },
  {
    path: "pages/:id",
    element: <App page={{
      Page: "CoursePage"
    }} />,
    loader: ({params}) => {
      console.log(params.id)
      return courses.find((element) => {
        return element.id == params.id
      })
    }
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
