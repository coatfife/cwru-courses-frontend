import {
    Modal,
    Card,
    CardContent,
    Typography,
    FormControl,
    FormLabel,
    TextField,
    Button,
    Slider,
    Checkbox,
    FormControlLabel,
    Box
} from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { CourseContext } from "../contexts/CourseContext";
import { createReview, updateReview } from "../api/api";
import { v4 as uuidv4 } from "uuid";
import {toast} from "react-toastify";

export default function CreateCourseReview({ onClose, course, review }) {
    const { user, fetchCourses, updateReview } = useContext(CourseContext);

    // State for form inputs
    const [anonymous, setAnonymous] = useState(false);
    const [overallRating, setOverallRating] = useState(5);
    const [difficultyRating, setDifficultyRating] = useState(5);
    const [usefulnessRating, setUsefulnessRating] = useState(5);
    const [major, setMajor] = useState("");
    const [additionalComments, setAdditionalComments] = useState("");
    const [tips, setTips] = useState("");
    const [professor, setProfessor] = useState("");

    // Effect to populate form if editing a review
    useEffect(() => {
        if (review) {
            setAnonymous(review.anonymous);
            setOverallRating(review.overall);
            setDifficultyRating(review.difficulty);
            setUsefulnessRating(review.usefulness);
            setMajor(review.major);
            setAdditionalComments(review.additionalComments);
            setTips(review.tips);
            setProfessor(review.professor);
        }
    }, [review]);

    const handleSubmit = async () => {
        // Helper function for formatting date
        const formatDate = (date) => {
            return new Intl.DateTimeFormat('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).format(date);
        };

        if (review) {
            const updatedReview = {
                reviewId: review.reviewId,
                createdBy: user.email,
                overall: overallRating,
                difficulty: difficultyRating,
                usefulness: usefulnessRating,
                major,
                anonymous,
                additionalComments,
                tips,
                createdAt: review.createdAt, // Keep the original createdAt for updates
                professor,
            };
            try{
                await updateReview(course.courseId, review.reviewId, updatedReview);
                toast.success("Review updated successfully!")
            }
            catch(e){
                toast.error("Failed to update review!")
            }


        } else {
            const newReview = {
                reviewId: uuidv4(),
                createdBy: user.email,
                overall: overallRating,
                difficulty: difficultyRating,
                usefulness: usefulnessRating,
                major,
                anonymous,
                additionalComments,
                tips,
                createdAt: formatDate(new Date()), // Use formatted date
                professor,
            };

            try{
                await createReview(course.courseId, newReview);
                toast.success("review submitted successfully!")
            }
            catch(e){
                toast.error("error creating review!", e.message)
            }

        }

        await fetchCourses();
        onClose();
    };

    return (
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={onClose}
        >
            <Card sx={{ maxWidth: 600, margin: 'auto', mt: 8, p: 3 }}>
                <CardContent sx={{ overflowY: 'auto', maxHeight: '80vh' }}>
                    <FormControl sx={{ width: '100%', mb: 2 }}>
                        <Typography variant='h6' mb={2}><b>{review ? "Edit Course Review" : "Create Course Review"}</b></Typography>

                        <FormControlLabel
                            control={<Checkbox checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />}
                            label="Post Anonymously?"
                            sx={{ mb: 2 }}
                        />

                        <FormLabel>Overall Rating (1 = worst, 10 = best):</FormLabel>
                        <Slider
                            value={overallRating}
                            onChange={(e, newValue) => setOverallRating(newValue)}
                            aria-labelledby="Overall Rating"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={10}
                        />

                        <FormLabel>Difficulty Rating (1 = easiest, 10 = hardest):</FormLabel>
                        <Slider
                            value={difficultyRating}
                            onChange={(e, newValue) => setDifficultyRating(newValue)}
                            aria-labelledby="Difficulty Rating"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={10}
                        />

                        <FormLabel>Usefulness Rating (1 = not useful, 10 = very useful):</FormLabel>
                        <Slider
                            value={usefulnessRating}
                            onChange={(e, newValue) => setUsefulnessRating(newValue)}
                            aria-labelledby="Usefulness Rating"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={10}
                        />

                        <FormLabel>Major:</FormLabel>
                        <TextField
                            value={major}
                            onChange={(e) => setMajor(e.target.value)}
                            fullWidth
                        />

                        <FormLabel>Additional Comments:</FormLabel>
                        <TextField
                            value={additionalComments}
                            onChange={(e) => setAdditionalComments(e.target.value)}
                            fullWidth
                            multiline
                            rows={4}
                        />

                        <FormLabel>Tips:</FormLabel>
                        <TextField
                            value={tips}
                            onChange={(e) => setTips(e.target.value)}
                            fullWidth
                        />

                        <FormLabel>Professor:</FormLabel>
                        <TextField
                            value={professor}
                            onChange={(e) => setProfessor(e.target.value)}
                            fullWidth
                        />

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                mt: 2,
                                backgroundColor: '#003071',
                                color: 'white !important',
                                '&:hover': {
                                    backgroundColor: '#054398'
                                },
                            }}
                        >
                            {review ? "Update Review" : "Submit Review"}
                        </Button>
                    </FormControl>
                </CardContent>
            </Card>
        </Modal>
    );
}
