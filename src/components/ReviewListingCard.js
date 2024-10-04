import { Card, CardContent, Typography, Box } from "@mui/material";
import './CourseListingCard.css';
import { useContext } from "react";
import ModalContext from "../contexts/ModalContext";

export default function ReviewListingCard({ review }) {
    const {setOpenModal} = useContext(ModalContext)

    const handleClick = () => {
        setOpenModal({
            Modal: "ViewReview",
            Review: review
        })
    }
    return (
        <Card className="card" onClick={handleClick}>
            <Box className="card-content">
                <Box className="rating-badge">
                    <Typography>{review.overall}</Typography>
                    <Typography className="rating-label">Overall</Typography>
                </Box>
                <Box className="rating-badge">
                    <Typography>{review.difficulty}</Typography>
                    <Typography className="rating-label">Difficulty</Typography>
                </Box>
                <Box className="rating-badge">
                    <Typography>{review.usefulness}</Typography>
                    <Typography className="rating-label">Useful</Typography>
                </Box>
                <CardContent sx={{ textAlign: 'left' }}>
                    <Typography sx={{ fontSize: '1rem', color: '#666', marginBottom: '8px' }}>
                        Tips from Author: {review.tips}
                    </Typography>
                    <Typography sx={{ fontSize: '0.85rem', color: '#999' }}>
                        Click to view more
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
}