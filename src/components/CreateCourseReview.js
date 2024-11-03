import { Modal, Card, CardContent, Typography, FormControl, FormLabel, TextField, Button, Toolbar, Slider, Checkbox, FormControlLabel, CardActionArea } from '@mui/material';
import ModalContext from '../contexts/ModalContext';
import { useContext } from 'react';

export default function CreateCourseReview() {
    const handleClose = () => {
        setOpenModal({
            Modal: null,
            Review: null,
        });
    };

    const { setOpenModal } = useContext(ModalContext);

    return (
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={handleClose}
        >
            <Card sx={{ maxWidth: 600, margin: 'auto' }}>
                <CardContent sx={{ overflowY: 'auto', maxHeight: '80vh' }}>
                    <FormControl sx={{ width: '100%', mb: 2 }}> {/* Set to 100% width */}
                        <Typography variant='h6' mb={2}><b>Create Course Review</b></Typography>

                        <FormControlLabel
                            control={<Checkbox />}
                            label="Post Anonymously?"
                            sx={{ mb: 2 }}  // Optional margin bottom, comment placed outside the sx prop
                        />



                        <FormLabel>Overall Rating (1 = worst, 10 = best):</FormLabel>
                        <Slider
                            aria-label="Overall"
                            defaultValue={5}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={10}
                        />

                        <FormLabel>Difficulty Rating (1 = easiest, 10 = hardest):</FormLabel>
                        <Slider
                            aria-label="Difficulty"
                            defaultValue={5}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={10}
                        />

                        <FormLabel>Useful Rating (1 = not useful, 10 = very useful):</FormLabel>
                        <Slider
                            aria-label="Useful"
                            defaultValue={5}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={10}
                        />

                        <FormLabel>Tips:</FormLabel>
                        <TextField
                            placeholder="What tips would you give to students who want to take this course?"
                            multiline
                            fullWidth
                            sx={{
                                mb: 3,
                                maxHeight: '100px', // Set maximum height
                                overflowY: 'auto',  // Allow scrolling
                            }}
                        />

                        <FormLabel>Additional Comments:</FormLabel>
                        <TextField
                            placeholder="Any anecdote or interesting comments about the course"
                            multiline
                            fullWidth
                            sx={{
                                mb: 3,
                                maxHeight: '100px', // Set maximum height
                                overflowY: 'auto',  // Allow scrolling
                            }}
                        />

                        <Toolbar sx={{ justifyContent: 'flex-end' }}>
                            <Button color="inherit" sx={{ padding: '8px 16px' }} onClick={handleClose}>Close</Button>
                            <Button className="create-course-button" sx={{ padding: '8px 16px' }}>
                                Submit
                            </Button>
                        </Toolbar>
                    </FormControl>
                </CardContent>
            </Card>
        </Modal>
    );
}
