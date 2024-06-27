import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './batchprogress.css';
import Modal from './Modal';
import BackButton from '../assets/backbutton3.png';
import ThreeDots from '../assets/dots.png'; // Import the three dots icon
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import api from '../api'; // Import the axios instance

function createSteps(weight) {
    return [
        { step: 'Gather Leaves', completed: true, details: { weight: weight } },
        { step: 'Wet Leaves', completed: false, details: { weight: 0 } },
        { step: 'Dry Leaves', completed: false, details: { weight: 0 } },
        { step: 'Flour Leaves', completed: false, details: { weight: 0 } }
    ];
}

function BatchProgress({ batches, setBatches }) {
    const [modalActive, setModalActive] = useState(false);
    const [onConfirm, setOnConfirm] = useState(null);
    const [headerContent, setHeaderContent] = useState('');
    const [buttonLabel, setButtonLabel] = useState('Confirm');
    const [modalStep, setModalStep] = useState(null);
    const [modalBatch, setModalBatch] = useState(null);
    const [errorOpen, setErrorOpen] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await api.get('/batch/');
                setBatches(response.data);
            } catch (error) {
                console.error('Error fetching batches:', error);
            }
        };

        fetchBatches();
    }, [setBatches]);

    const handleStepClick = (batchId, stepIndex, step) => {
        if (stepIndex > 0 && !batches.find(b => b.id === batchId).steps[stepIndex - 1].completed) {
            setErrorOpen(true);
            return;
        }

        let header = '';
        let buttonLabel = 'Confirm';

        if (stepIndex === 0) {
            header = `Gather Leaves Weight: ${step.details.weight} kg`;
        } else if (stepIndex === 1) {
            header = 'Wet Leaves';
            buttonLabel = 'Start';
        } else if (stepIndex === 2) {
            header = 'Dry Leaves';
            buttonLabel = 'Start';
        } else if (stepIndex === 3) {
            header = 'Flour / Powder Record';
            buttonLabel = 'Start';
        }

        setHeaderContent(header);
        setOnConfirm(() => (data) => completeStep(batchId, stepIndex, parseFloat(data)));
        setModalActive(true);
        setButtonLabel(buttonLabel);
        setModalStep(stepIndex);
        setModalBatch(batches.find(b => b.id === batchId));
    };

    const completeStep = async (batchId, stepIndex, weight) => {
        try {
            const step = ["gather", "wet", "dry", "powder"][stepIndex];
            const response = await api.post(`/complete_process/${batchId}/${step}`, { weight });
            const newBatches = batches.map(batch => {
                if (batch.id === batchId) {
                    const newSteps = batch.steps.map((step, idx) => {
                        if (idx === stepIndex) {
                            return { ...step, completed: true, details: { ...step.details, weight } };
                        }
                        return step;
                    });
                    return { ...batch, steps: newSteps };
                }
                return batch;
            });

            setBatches(newBatches); // Update the state correctly
            setModalActive(false);
        } catch (error) {
            console.error('Error completing step:', error);
        }
    };

    const handleErrorClose = () => {
        setErrorOpen(false);
    };

    const toggleDropdown = (batchId) => {
        setDropdownVisible(dropdownVisible === batchId ? null : batchId);
    };

    const handleDeleteBatch = async (batchId) => {
        try {
            await api.delete(`/batch/${batchId}`);
            setBatches(batches.filter(batch => batch.id !== batchId));
            setDropdownVisible(null);
        } catch (error) {
            console.error('Error deleting batch:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(null);
        }
    };

    useEffect(() => {
        if (dropdownVisible !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownVisible]);

    return (
        <div className="container">
            <Link to="/" className="back-button">
                <img src={BackButton} alt="BackButton" className="BackButton" />
            </Link>
            <div className="content">
                <h2 className="BP-title">Current Batch Progress of Centra [Location]</h2>
                <Routes>
                    <Route path="/" element={
                        batches.length === 0 ? (
                            <p>No batches created yet.</p>
                        ) : (
                            batches.map(batch => (
                                <div key={batch.id} className="batch-row">
                                    <div className="batch-title">
                                        <div className="batch-name">{`Batch ${batch.id}`}</div>
                                        <div className="three-dots" onClick={() => toggleDropdown(batch.id)}>
                                            <img src={ThreeDots} alt="Three Dots" />
                                            {dropdownVisible === batch.id && (
                                                <div className="dropdown" ref={dropdownRef}>
                                                    <div className="dropdown-item" onClick={() => handleDeleteBatch(batch.id)}>Delete Batch</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="batch-content">
                                        {batch.steps.map((step, index) => (
                                            <div key={index} className={`step-container ${step.completed ? 'completed' : ''}`}
                                                onClick={() => handleStepClick(batch.id, index, step)}>
                                                <div className="step-circle">{index + 1}</div>
                                                <div className="step-name">{step.step}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )
                    } />
                </Routes>
            </div>
            <Modal
                isActive={modalActive}
                onClose={() => setModalActive(false)}
                onConfirm={onConfirm}
                headerContent={headerContent}
                buttonLabel={buttonLabel}
                step={modalStep}
                batch={modalBatch}
            />
            <Dialog open={errorOpen} onClose={handleErrorClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent
                    style={{
                        width: '400px'
                    }}>
                    <p>Please complete the previous steps first.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleErrorClose} color="primary" variant="contained" style={{ backgroundColor: '#467E18', color: 'white' }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BatchProgress;
