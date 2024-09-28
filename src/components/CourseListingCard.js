
import { Card, CardHeader, CardContent, Typography } from "@mui/material"

export default function CourseListingCard({course}) {
    return (
        <Card variant="outlined"> 
            <CardHeader title={course.number + " - " + course.title}>
            </CardHeader>
            <CardContent>
                <Typography>
                    {course.description}
                </Typography>
                <Typography>
                    Reviews: {course.reviews}
                </Typography>
                <Typography>
                    Rating: {course.rating}
                </Typography>
            </CardContent>
        </Card>
    )
}