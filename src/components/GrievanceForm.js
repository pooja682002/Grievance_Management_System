/*
import React, { useState } from 'react';
import { Button, TextField, MenuItem, Box, Typography } from '@mui/material';

const categories = ['Delivery issue', 'Quality issue', 'Payment issue', 'Technical issue'];

const GrievanceForm = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // Submit grievance API call
    console.log({ category, description });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5} sx={{ backgroundColor: '#e3f2fd', p: 5, borderRadius: 3 }}>
      <Typography variant="h4" mb={3} color="#1976d2">Submit Grievance</Typography>
      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
        InputLabelProps={{ style: { color: '#1976d2' } }}
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 3, width: '300px' }}
        InputLabelProps={{ style: { color: '#1976d2' } }}
      />
      <Button
        variant="contained"
        sx={{
          width: '300px',
          bgcolor: '#1976d2',
          '&:hover': { bgcolor: '#1256a2' },
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default GrievanceForm;

not able to submit grievance(not logged in)
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';

const GrievanceForm = ({ loggedInUser }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const submitGrievance = async () => {
    // Check if the user is logged in and has an ID
    if (!loggedInUser || !loggedInUser.id) {
      alert('You must be logged in to submit a grievance.');
      return;
    }

    // Validate category and description fields
    if (category && description) {
      try {
        // Send POST request to the backend with user info
        const response = await axios.post('http://localhost:8080/api/grievances', {
          category,
          description,
          status: 'Unassigned',
          userId: loggedInUser.id, // Associate the grievance with the logged-in user
        });

        if (response.status === 200) {
          alert('Grievance submitted successfully!');
          // Optionally reset fields after successful submission
          setCategory('');
          setDescription('');
        }
      } catch (error) {
        console.error('Error submitting grievance:', error);
        alert('Failed to submit grievance. Please try again.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" mb={3}>Submit Grievance</Typography>
      <TextField
        label="Category"
        variant="outlined"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <Button
        variant="contained"
        onClick={submitGrievance}
        sx={{ width: '300px' }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default GrievanceForm;


import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';

const GrievanceForm = ({ loggedInUser }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const submitGrievance = async () => {
    if (category && description) {
      if (!loggedInUser || !loggedInUser.id) {
        alert('You must be logged in to submit a grievance');
        return; // Exit early if user is not logged in
      }

      try {
        // Send POST request to the backend with user info
        const response = await axios.post('http://localhost:8080/api/grievances', {
          category,
          description,
          status: 'Unassigned',
          userId: loggedInUser.id, // Associate the grievance with the logged-in user
        });

        if (response.status === 200) {
          alert('Grievance submitted successfully!');
          // Clear form after successful submission
          setCategory('');
          setDescription('');
        }
      } catch (error) {
        console.error('Error submitting grievance:', error);
        alert('Failed to submit grievance. Please try again.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" mb={3}>Submit Grievance</Typography>
      <TextField
        label="Category"
        variant="outlined"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <Button
        variant="contained"
        onClick={submitGrievance}
        sx={{ width: '300px' }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default GrievanceForm;

*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';

const GrievanceForm = ({ loggedInUser }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Debugging statement to check the loggedInUser prop
  useEffect(() => {
    console.log('Logged In User in GrievanceForm:', loggedInUser);
  }, [loggedInUser]);

  const submitGrievance = async () => {
    if (!loggedInUser || !loggedInUser.id) {
      alert('You must be logged in to submit a grievance');
      return;
    }

    if (category && description) {
      try {
        const response = await axios.post('http://localhost:8080/api/grievances', {
          user: {
            id: loggedInUser.id, // Ensure user ID is populated correctly
          },
          category,
          description,
          status: 'Pending', // Use "Pending" or appropriate initial status
        });

        if (response.status === 200) {
          alert('Grievance submitted successfully!');
          // Reset form fields after submission
          setCategory('');
          setDescription('');
        }
      } catch (error) {
        console.error('Error submitting grievance:', error);
        setError('Failed to submit grievance. Please try again.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" mb={3}>Submit Grievance</Typography>
      <TextField
        label="Category"
        variant="outlined"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <Button
        variant="contained"
        onClick={submitGrievance}
        sx={{ width: '300px' }}
      >
        Submit
      </Button>
      {error && <Typography color="red">{error}</Typography>} {/* Display error message if exists */}
    </Box>
  );
};

export default GrievanceForm;


