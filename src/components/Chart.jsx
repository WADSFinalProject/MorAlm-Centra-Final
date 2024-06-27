import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ZAxis
} from 'recharts';

// All dummy data
const data = [
  { weight: 35 },
  { weight: 20 },
  { weight: 10 },
  { weight: 11 },
  { weight: 37 },
  { weight: 30 },
  { weight: 10 },
];

const styles = {
  chartContainer: {
    width: '90%',
    height: '300px',
    margin: '0 auto', // Center the chart horizontally
    paddingBottom: '45px',
    
  },
  chartTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '20px',
    ZAxis: '1',
    fontWeight: '100',
  },
  pageTitle: {
    textAlign: 'left',
    marginTop: '20px', 
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '35px',
    fontWeight: '100',
  },
  yAxisLabel: {
    textAnchor: 'middle',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 'bold'
  },
};

const Chart = () => (
  <div style={styles.chartContainer}>
    <h2 style={styles.pageTitle}>Centra [Location]</h2>
    <h3 style={styles.chartTitle}>Weekly Raw Leaves Weight (Kg)</h3>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 13, right: 30, left: 40, bottom: 0 }} // Adjust left and right margins

      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" label={{ position: 'insideBottom', style: styles.yAxisLabel }} />
        <YAxis label={{ position: 'insideLeft', style: styles.yAxisLabel }} />
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke="#467E18" strokeWidth={3} activeDot={{ r: 8, strokeWidth: 6 }} /> {/* Increase the line thickness */}
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default Chart;
