import { Modal, Card, CardContent, Typography, FormControl, FormLabel, TextField, Button, Toolbar, Slider } from '@mui/material';
import ModalContext from '../contexts/ModalContext';
import { useContext } from 'react';

export default function CreateCourseReview() {
    const handleClose = () => {
        setOpenModal({
            Modal: null,
            Review: null,
        });
    }

    const {setOpenModal} = useContext(ModalContext);

    return (
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={handleClose}
        >
          <Card sx={{ maxWidth:800, maxHeight: '90vh', overflow: 'hidden', margin: 'auto' }}> {/* Set fixed size */}
          <CardContent sx={{ overflowY: 'auto', maxHeight: '80vh' }}> {/* Allow for overflow */}
                    <FormControl sx={{ width: '100%' }}>
                        <Typography variant='h6' mb={2}><b>Create Course Review</b></Typography>
                        <FormLabel>Post Anonymously?</FormLabel>
                        {/* I will put a cehckbox here */}
                        
                        <FormLabel>Overall Rating (1 = worst, 10 = best):</FormLabel>
                        <Slider
                        aria-label="Overall"
                        defaultValue={30}
                        valueLabelDisplay="auto"
                        shiftStep={30}
                        step={1}
                        marks
                        min={1}
                        max={10}
                        />

                        <FormLabel>Difficulty Rating (1 = easiest, 10 = hardest):</FormLabel>
                        <Slider
                        aria-label="Overall"
                        defaultValue={30}
                        valueLabelDisplay="auto"
                        shiftStep={30}
                        step={1}
                        marks
                        min={1}
                        max={10}
                        />      

                        <FormLabel>Useful Rating (1 = not useful, 10 = very useful):</FormLabel>
                        <Slider
                        aria-label="Useful"
                        defaultValue={30}
                        valueLabelDisplay="auto"
                        shiftStep={30}
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
                            sx={{ mb: 3, maxHeight: '150px', overflowY: 'auto' }} // Set max height and overflow
                        />

                        <FormLabel>Additional Comments:</FormLabel>
                        <TextField
                            placeholder="Any anecdote or interesting comments about the course"
                            multiline
                            fullWidth
                            sx={{ mb: 3, maxHeight: '150px', overflowY: 'auto' }} // Set max height and overflow
                        />

                        <Toolbar sx={{ justifyContent: 'flex-end' }}>
                            <Button color="inherit" sx={{ padding: '20px' }} onClick={handleClose}>Close</Button>
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
