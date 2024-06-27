import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import CustomChart from './components/Chart';
import BatchInfo from './components/BatchInfo';
import BatchProgress from './components/BatchProgress';
import CheckBP from './components/Button';
import api from './api'

function App() {
  const totalWeightFor100Percent = 10;  // 10 kg corresponds to 100%
  const [todayWeight, setTodayWeight] = useState(0);  // Initial weight for today
  const [batches, setBatches] = useState([]); // Array to store batches

  const percentage = (todayWeight / totalWeightFor100Percent) * 100;

  const addLeaves = (weight) => {
    setTodayWeight(todayWeight + weight);  // Update today's weight
  };

  const createBatch = (newBatch) => {
    setBatches([...batches, newBatch]);
    setTodayWeight(0);  // Reset today's weight
  };

  const removeBatch = (batchId) => {
    setBatches(batches.filter(batch => batch.id !== batchId));
  };

  return (
    <Router>
      <div className="App">
        <Header batches={batches} removeBatch={removeBatch} />
        <Routes>
          <Route path="/" element={
            <main className="main-content">
              <div className="chart-section">
                <CustomChart />
              </div>
              <div className="dashboard">
                <div className="progress-section">
                  <ProgressBar value={percentage} addLeaves={addLeaves} createBatch={createBatch} />
                  <CheckBP />
                </div>
                <div className="batch-info-section">
                  <BatchInfo batches={batches} />
                </div>
              </div>
            </main>
          } />
          <Route path="/batch-progress/*" element={<BatchProgress batches={batches} setBatches={setBatches} />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
