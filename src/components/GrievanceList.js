import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, MenuItem, TextField, Grid } from '@mui/material';
import axios from 'axios';

const departments = ['Logistics', 'Quality Control', 'Finance', 'Technical'];

const GrievanceList = ({ loggedInUser }) => {
  const [grievances, setGrievances] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState({});

  // Fetch grievances from the backend API
  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const url = loggedInUser.role === 'User'
          ? `http://localhost:8080/api/grievances/user/${loggedInUser.id}`
          : 'http://localhost:8080/api/grievances';
        const response = await axios.get(url);
        setGrievances(response.data);
      } catch (error) {
        console.error('Error fetching grievances:', error);
      }
    };

    fetchGrievances();
  }, [loggedInUser]);

  const handleAssign = async (grievanceId) => {
    const department = selectedDepartment[grievanceId];
    if (!department) {
      alert('Please select a department before assigning.');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/grievances/assign/${grievanceId}`, {
        assignedTo: department,
        status: 'Assigned', // Update status as well
      });

      // Update the local grievances state after successful assignment
      setGrievances((prevGrievances) =>
        prevGrievances.map((g) =>
          g.id === grievanceId ? { ...g, assignedTo: department, status: 'Assigned' } : g
        )
      );

      alert(`Grievance ${grievanceId} has been successfully assigned to ${department}.`);
    } catch (error) {
      console.error('Error assigning department:', error);
      alert('Failed to assign grievance. Please try again.');
    }
  };

  return (
    <Box mt={5} bgcolor="#f5f5f5" p={5} borderRadius={3}>
      <Typography variant="h4" mb={3} color="#1976d2">
        {loggedInUser.role === 'Supervisor' ? 'All Grievances Details' : 'Your Grievances'}
      </Typography>
      <List>
        {grievances.length > 0 ? (
          grievances.map((grievance) => (
            <ListItem key={grievance.id} divider>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <ListItemText primary={grievance.category} secondary={grievance.description} />
                </Grid>

                {/* Show username and userID */} 
                <Grid item xs={3}>
                  <Typography><strong>User Name:</strong> {grievance.user ? grievance.user.name : 'N/A'}</Typography>
                  <Typography><strong>User ID:</strong> {grievance.user ? grievance.user.id : 'N/A'}</Typography>
                </Grid>

                {/* Show assignment section for Assigner role */}
                {loggedInUser.role === 'Assigner' && (
                  <>
                    <Grid item xs={3}>
                      <TextField
                        select
                        label="Select Department"
                        value={selectedDepartment[grievance.id] || ''}
                        onChange={(e) => setSelectedDepartment({
                          ...selectedDepartment,
                          [grievance.id]: e.target.value,
                        })}
                        sx={{ width: '100%' }}
                      >
                        {departments.map((dept) => (
                          <MenuItem key={dept} value={dept}>
                            {dept}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1256a2' } }}
                        onClick={() => handleAssign(grievance.id)}
                      >
                        Assign
                      </Button>
                    </Grid>
                  </>
                )}

                {/* Supervisor can only view, no assign option */}
                {loggedInUser.role === 'Supervisor' && (
                  <Grid item xs={3}>
                    <Typography><strong>Assigned Department:</strong> {grievance.assignedTo || 'Not Assigned'}</Typography>
                    <Typography><strong>Status:</strong> {grievance.status}</Typography>
                  </Grid>
                )}
              </Grid>
            </ListItem>
          ))
        ) : (
          <Typography>No grievances found.</Typography>
        )}
      </List>
    </Box>
  );
};

export default GrievanceList;
