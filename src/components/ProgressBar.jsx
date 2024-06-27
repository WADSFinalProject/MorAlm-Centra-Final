import React, { useState, useEffect } from 'react';
import {
  CircularProgressbar, buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  Paper, Button, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions
} from '@material-ui/core';
import api from '../api'; // Import the axios instance

const ProgressBar = ({ value, addLeaves, createBatch }) => {
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    const fetchWeeklyRawWeight = async () => {
      try {
        const response = await api.get('/weekly_raw_weight/');
        // Use response data to update the chart
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching weekly raw weight:', error);
      }
    };

    fetchWeeklyRawWeight();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const handleAddLeaves = async () => {
    try {
      const response = await api.post('/add_leaves/', { weight });
      addLeaves(weight);  // Update today's weight
      setWeight(0);  // Reset weight
      setOpen(false);  // Close the dialog
    } catch (error) {
      console.error('Error adding leaves weight:', error);
    }
  };

  const handleCreateBatch = async () => {
    if (value < 100) {
      setErrorOpen(true);  // Show error dialog if weight is below 100%
    } else {
      try {
        const response = await api.post('/create_batch/');
        createBatch(response.data);  // Update the batches with the new batch
      } catch (error) {
        console.error('Error creating batch:', error);
      }
    }
  };

  return (
    <Paper style={{
      padding: '20px',
      backgroundColor: '#CEDDC2',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '300px',
      height: '300px',
      borderRadius: '16px',
    }}>
      <h3 style={{
        fontWeight: '10',
      }}>Today's Leaves Info</h3>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          pathColor: '#467E18',
          textColor: '#467E18',
          trailColor: '#FFFFFF',
          rotation: 0.5,
          textSize: '20px'
        })}
      />
      <Button 
        variant="contained" 
        color="#467E18" 
        style={{ 
          marginTop: '5%', 
          backgroundColor: '#467E18', 
          color: 'white', 
          borderRadius: '10px',
          width: '200px',
          textAlign: 'center'
        }} 
        onClick={handleClickOpen}>
        Add Leaves
      </Button>
      <Button 
        variant="contained" 
        color="#467E18" 
        style={{ 
          marginTop: '5%', 
          backgroundColor: '#467E18', 
          color: 'white', 
          borderRadius: '10px',
          width: '200px',
          textAlign: 'center'
        }} 
        onClick={handleCreateBatch}>
        Create New Batch
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Leaves Data Form</DialogTitle>
        <DialogContent style={{ width: '400px' }}>
          <TextField
            autoFocus
            margin="dense"
            id="weight"
            label="Weight (kg)"
            type="number"
            fullWidth
            variant="outlined"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <Button onClick={handleClose} color="primary" style={{ color: '#4caf50', borderColor: '#4caf50' }}>
            Cancel
          </Button>
          <Button onClick={handleAddLeaves} color="primary" variant="contained" style={{ backgroundColor: '#467E18', color: 'white' }}>
            Add Leaves
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={errorOpen} onClose={handleErrorClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <p>The leaves are currently below 100%. Please add more leaves to create a new batch.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorClose} color="primary" variant="contained" style={{ backgroundColor: '#467E18', color: 'white' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProgressBar;
