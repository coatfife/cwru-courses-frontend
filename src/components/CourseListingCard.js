import { Card, CardContent, Typography, Box } from "@mui/material";
import './CourseListingCard.css';

export default function CourseListingCard({ course }) {
    return (
        <Card className="card">
            <Box className="card-content">
                <Box className="rating-badge">
                    <Typography>{course.rating}</Typography>
                    <Typography className="rating-label">Overall</Typography>
                </Box>
                <CardContent sx={{ textAlign: 'left' }}>
                    <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '4px' }}>
                        {course.number} - {course.title}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', color: '#666', marginBottom: '8px' }}>
                        {course.description}
                    </Typography>
                    <Typography sx={{ fontSize: '0.85rem', color: '#999' }}>
                        {course.reviews} reviews
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
}
