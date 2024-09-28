
import { Modal, Card, CardContent, Typography, FormControl, FormLabel, TextField, Button, Toolbar} from '@mui/material';

export default function CreateCourseListing({open, setOpen}) {
    const handleClose = () => {
      setOpen(false)
    }
    return (
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
      <Card>
        <CardContent>
          <FormControl>
            <Typography variant='h6'><b>Create Course Listing</b></Typography>
            <Typography>Created by: abc123</Typography>
            <FormLabel>Name</FormLabel>
            <TextField placeholder='e.g. Programming Language Concepts' multiline></TextField>
            <FormLabel>Cross-Listings</FormLabel>
            <TextField placeholder={"e.g. 'CSDS 132, ECSE 132'"} multiline></TextField>
            <FormLabel>Prerequesites</FormLabel>
            <TextField placeholder={"e.g. prerequesites for...."} multiline></TextField>
            <FormLabel>Description</FormLabel>
            <TextField placeholder={"You may copy and paste the course description from the CWRU course catalog"} multiline></TextField>
            
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
              <Button color="inherit" sx={{ padding: '20px' }} onClick={handleClose}>Close</Button>
              <Button className="create-course-button" sx={{ padding: '8px 12px' }}>
                Submit
              </Button>
            </Toolbar>
          </FormControl>
        </CardContent>
      </Card>
      </Modal>
    );
  }
  