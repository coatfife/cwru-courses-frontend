import { Card, CardContent, Typography, Box, CardActionArea } from "@mui/material";
import './CourseListingCard.css';
import { useContext } from "react";
import PageContext from "../contexts/PageContext";
import { Link, redirect } from "react-router-dom";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
export default function CourseListingCard({ course }) {

    const calculateRating = (ratingName) => {
        if (course.reviews.length === 0) return "--";
        let rating = 0;
        course.reviews.forEach((element) => rating += element[ratingName])
        rating /= course.reviews.length
        return rating.toFixed(1)
    }

    return (
        <Card className="card">
            <CardActionArea href = {`/pages/${course.id}`}>
                <Box className="card-content">
                    <Box className="rating-badge">
                        <Typography>{calculateRating("overall")}</Typography>
                        <Typography className="rating-label">Overall</Typography>
                    </Box>
                    <Box className="rating-badge">
                        <Typography>{calculateRating("difficulty")}</Typography>
                        <Typography className="rating-label">Difficulty</Typography>
                    </Box>
                    <Box className="rating-badge">
                        <Typography>{calculateRating("usefulness")}</Typography>
                        <Typography className="rating-label">Useful</Typography>
                    </Box>
                    <CardContent sx={{ textAlign: 'left' }}>
                        <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '4px' }}>
                            {course.number} - {course.title}
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', color: '#666', marginBottom: '8px' }}>
                            {course.description}
                        </Typography>
                        <Typography sx={{ fontSize: '0.85rem', color: '#999' }}>
                            {course.reviews.length === 1 ? '1 review' : course.reviews.length + " reviews"} 
                        </Typography>
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card>
    );
}
