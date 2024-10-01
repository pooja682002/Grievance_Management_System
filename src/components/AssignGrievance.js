import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';
import axios from 'axios';

const departments = ['Logistics', 'Quality Control', 'Finance', 'Technical'];

const AssignGrievance = ({ loggedInUser }) => {
  const [grievances, setGrievances] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState({});

  // Fetch grievances from the backend
  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/grievances');
        setGrievances(response.data);
      } catch (error) {
        console.error('Error fetching grievances:', error);
      }
    };

    fetchGrievances();
  }, []);

  // Handle assigning a grievance to a department (only for assigners)
  const handleAssign = async (grievanceId) => {
    const department = selectedDepartment[grievanceId];
    if (!department) {
      alert('Please select a department before assigning.');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/grievances/assign/${grievanceId}`, {
        assignedTo: department,
        status: 'Assigned',
      });

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
        {loggedInUser.role === 'Supervisor' ? 'All Grievances Details' : 'Assign Grievances'}
      </Typography>
      <List>
        {grievances.length > 0 ? (
          grievances.map((grievance) => (
            <ListItem key={grievance.id} divider>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <ListItemText primary={grievance.category} secondary={grievance.description} />
                </Grid>
                <Grid item xs={3}>
                  <Typography><strong>User Name:</strong> {grievance.user ? grievance.user.name : 'N/A'}</Typography>
                  <Typography><strong>User ID:</strong> {grievance.user ? grievance.user.id : 'N/A'}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography><strong>Assigned To:</strong> {grievance.assignedTo || 'Not Assigned'}</Typography>
                  <Typography><strong>Status:</strong> {grievance.status}</Typography>
                </Grid>
                <Grid item xs={3}>
                  {loggedInUser.role === 'Assigner' && grievance.status !== 'Assigned' && (
                    <>
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
                      <Button
                        variant="contained"
                        sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1256a2' } }}
                        onClick={() => handleAssign(grievance.id)}
                      >
                        Assign
                      </Button>
                    </>
                  )}

                  {/* Supervisor can only view the grievance details, not assign */}
                  {loggedInUser.role === 'Supervisor' && (
                    <Typography><strong>Assigned Department:</strong> {grievance.assignedTo || 'Not Assigned'}</Typography>
                  )}
                </Grid>
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

export default AssignGrievance;

