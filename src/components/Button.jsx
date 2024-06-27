import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

const CheckBP = () => {
  const navigate = useNavigate(); 

  const navigateToBatchProgress = () => {
    navigate('/batch-progress'); 
  };

  return (
    <Button 
    variant="contained" 
    style={{ 
      marginTop: '10%', 
      backgroundColor: '#467E18', 
      color: 'white', 
      borderRadius: '16px',
      width: '300px',
      textAlign: 'center'
    }} 
    onClick={navigateToBatchProgress}>
      Check Batch Progress
    </Button>
  );
};

export default CheckBP;
