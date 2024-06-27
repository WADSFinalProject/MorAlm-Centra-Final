import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../App.css';

const BatchInfo = ({ batches }) => {
  const totalBatches = batches.length;

  const wetLeavesBatches = batches.filter(batch => batch.steps[1].completed && !batch.steps[2].completed).length;
  const dryLeavesBatches = batches.filter(batch => batch.steps[2].completed && !batch.steps[3].completed).length;
  const powderLeavesBatches = batches.filter(batch => batch.steps[3].completed).length;

  const wetLeavesProgress = totalBatches ? (wetLeavesBatches / totalBatches) * 100 : 0;
  const dryLeavesProgress = totalBatches ? (dryLeavesBatches / totalBatches) * 100 : 0;
  const powderLeavesProgress = totalBatches ? (powderLeavesBatches / totalBatches) * 100 : 0;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', backgroundColor: '#CEDDC2', borderRadius: '16px'}}>
      <Paper style={{ padding: '10px', backgroundColor: '#F5F5F5', borderRadius: '16px', margin: '0 10px', width: '30%', textAlign: 'center', border: '2px solid #467e18' }}>
        <Typography variant="h6" style={{fontWeight: '100', marginBottom: '10px', color: 'black'}}>
          Wet Leaves Progress
        </Typography>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <CircularProgressbar 
            value={wetLeavesProgress} 
            text={`${wetLeavesBatches}/${totalBatches}`} 
            styles={buildStyles({
              pathColor: '#467e18',
              textColor: '#467e18',
              trailColor: '#d6d6d6',
            })}
          />
        </div>
      </Paper>
      <Paper style={{ padding: '10px', backgroundColor: '#F5F5F5', borderRadius: '16px', margin: '0 10px', width: '30%', textAlign: 'center', border: '2px solid #467e18' }}>
        <Typography variant="h6" style={{fontWeight: '100', marginBottom: '10px', color: 'black'}}>
          Dry Leaves Progress
        </Typography>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <CircularProgressbar 
            value={dryLeavesProgress} 
            text={`${dryLeavesBatches}/${totalBatches}`} 
            styles={buildStyles({
              pathColor: '#467e18',
              textColor: '#467e18',
              trailColor: '#d6d6d6',
            })}
          />
        </div>
      </Paper>
      <Paper style={{ padding: '10px', backgroundColor: '#F5F5F5', borderRadius: '16px', margin: '0 10px', width: '30%', textAlign: 'center', border: '2px solid #467e18' }}>
        <Typography variant="h6" style={{fontWeight: '100', marginBottom: '10px', color: 'black'}}>
          Powder Leaves Progress
        </Typography>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <CircularProgressbar 
            value={powderLeavesProgress} 
            text={`${powderLeavesBatches}/${totalBatches}`} 
            styles={buildStyles({
              pathColor: '#467e18',
              textColor: '#467e18',
              trailColor: '#d6d6d6',
            })}
          />
        </div>
      </Paper>
    </div>
  );
};

export default BatchInfo;
