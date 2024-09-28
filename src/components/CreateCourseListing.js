import { Modal, Card, CardContent, Typography, FormControl, FormLabel, TextField, Button, Toolbar } from '@mui/material';

export default function CreateCourseListing({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={handleClose}
        >
          <Card sx={{ maxWidth:800, maxHeight: '90vh', overflow: 'hidden', margin: 'auto' }}> {/* Set fixed size */}
          <CardContent sx={{ overflowY: 'auto', maxHeight: '80vh' }}> {/* Allow for overflow */}
                    <FormControl sx={{ width: '100%' }}>
                        <Typography variant='h6' mb={2}><b>Create Course Listing</b></Typography>
                        <Typography mb={3}>Created by: abc123</Typography>
                        
                        <FormLabel>Name</FormLabel>
                        <TextField
                            placeholder='e.g. Programming Language Concepts'
                            multiline
                            fullWidth
                            sx={{ mb: 3 }}  // Adds spacing between fields
                        />

                        <FormLabel>Cross-Listings</FormLabel>
                        <TextField
                            placeholder="e.g. 'CSDS 132, ECSE 132'"
                            multiline
                            fullWidth
                            sx={{ mb: 3 }}
                        />

                        <FormLabel>Prerequisites</FormLabel>
                        <TextField
                            placeholder="e.g. prerequisites for...."
                            multiline
                            fullWidth
                            sx={{ mb: 3 }}
                        />

                        <FormLabel>Description</FormLabel>
                        <TextField
                            placeholder="You may copy and paste the course description from the CWRU course catalog"
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
