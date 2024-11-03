import { Modal, Card, CardContent, Typography, FormControl, FormLabel, Button, Toolbar, Slider, CardActionArea } from '@mui/material';
import { useContext } from 'react';
import ModalContext from '../contexts/ModalContext';

export default function CourseReview({ review }) {
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
                        <Typography mb={3}>Created by: abc123</Typography>
                        
                        <FormLabel>Overall</FormLabel>
                        <Slider defaultValue={review.overall} step={1} marks min={1} max={10} disabled />
                        <FormLabel>Difficulty</FormLabel>
                        <Slider defaultValue={review.difficulty} step={1} marks min={1} max={10} disabled />
                        <FormLabel>Difficulty</FormLabel>
                        <Slider defaultValue={review.usefulness} step={1} marks min={1} max={10} disabled />
                        <Typography>Tips: {review.tips}</Typography>
                        <Typography>Additional Comments: {review.additionalComments}</Typography>
                        <Toolbar sx={{ justifyContent: 'flex-end' }}>
                            <Button color="inherit" sx={{ padding: '20px' }} onClick={handleClose}>Close</Button>
                        </Toolbar>
                    </FormControl>
                </CardContent>
            </Card>
        </Modal>
 
    );

}