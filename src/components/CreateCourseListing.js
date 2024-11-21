import {useContext, useState} from 'react';
import { Modal, Card, CardContent, Typography, FormControl, FormLabel, TextField, Button, Toolbar } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {CourseContext} from "../contexts/CourseContext";
import {toast} from "react-toastify";

export default function CreateCourseListing({ open, onClose }) {
    const {createSingleCourse, user} = useContext(CourseContext);
    // State to store form values
    const [formValues, setFormValues] = useState({
        name: '',
        crossListings: '',
        prerequisites: '',
        description: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form submission logic here (e.g., send formValues to backend)
        const alias = formValues.crossListings ? formValues.crossListings.split(',').map(item => item.trim()) : [];
        const prereq = formValues.prerequisites ? formValues.prerequisites.split(',').map(item => item.trim()) : [];
        const newCourse = {
            courseId: uuidv4(),
            title: formValues.name,
            createdBy: user?.email || "elm102@case.edu",
            description: formValues.description,
            aliases: alias,
            prerequisites: prereq,
            reviews: []
        };
        try{
            await createSingleCourse(newCourse)
            onClose();  // Close modal after submission
            toast.success("Course created successfully!")
        }
        catch(e){
            toast.error("Failed to create course")
        }
    };

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={onClose}
        >
            <Card sx={{ maxWidth: 800, maxHeight: '90vh', overflow: 'hidden', margin: 'auto' }}>
                <CardContent sx={{ overflowY: 'auto', maxHeight: '80vh' }}>
                    <FormControl component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
                        <Typography variant='h6' mb={2}><b>Create Course Listing</b></Typography>
                        <Typography mb={3}>Created by: abc123</Typography>

                        <FormLabel>Name</FormLabel>
                        <TextField
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            placeholder='e.g. Programming Language Concepts'
                            multiline
                            fullWidth
                            sx={{ mb: 3 }}
                        />

                        <FormLabel>Cross-Listings</FormLabel>
                        <TextField
                            name="crossListings"
                            value={formValues.crossListings}
                            onChange={handleChange}
                            placeholder="e.g. 'CSDS 132, ECSE 132'"
                            multiline
                            fullWidth
                            sx={{ mb: 3 }}
                        />

                        <FormLabel>Prerequisites</FormLabel>
                        <TextField
                            name="prerequisites"
                            value={formValues.prerequisites}
                            onChange={handleChange}
                            placeholder="e.g. prerequisites for...."
                            multiline
                            fullWidth
                            sx={{ mb: 3 }}
                        />

                        <FormLabel>Description</FormLabel>
                        <TextField
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            placeholder="You may copy and paste the course description from the CWRU course catalog"
                            multiline
                            fullWidth
                            sx={{ mb: 3, maxHeight: '150px', overflowY: 'auto' }}
                        />

                        <Toolbar sx={{ justifyContent: 'flex-end' }}>
                            <Button color="inherit" sx={{ padding: '20px' }} onClick={onClose}>Close</Button>
                            <Button type="submit" className="create-course-button" sx={{ padding: '8px 16px' }}>
                                Submit
                            </Button>
                        </Toolbar>
                    </FormControl>
                </CardContent>
            </Card>
        </Modal>
    );
}
