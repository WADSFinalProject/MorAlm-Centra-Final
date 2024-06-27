import React, { useState, useEffect } from 'react';
import './modal.css';
import daunImage from '../assets/daun.png';

const Modal = ({ isActive, onClose, onConfirm, headerContent, buttonLabel, step, batch }) => {
  const [weight, setWeight] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [finalWeight, setFinalWeight] = useState(null);

  const handleInitialConfirm = () => {
    if (step === 1 || step === 2 || step === 3) {
      setShowProgress(true);
      setTimeout(() => {
        setShowProgress(false);
        setShowWeightInput(true);
      }, 2000); // simulate a delay for progress animation
    } else {
      onConfirm(weight);
      setFinalWeight(weight);
    }
  };

  const handleFinalConfirm = () => {
    setFinalWeight(weight);
    onConfirm(weight); // Complete the step with the inputted weight
  };

  useEffect(() => {
    if (!isActive) {
      setWeight('');
      setShowProgress(false);
      setShowWeightInput(false);
      setFinalWeight(null);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {(step === 1 || step === 2 || step === 3) ? (
          <>
            {!showProgress && !showWeightInput && finalWeight === null && (
              <>
                {headerContent && <div className="modal-header">{headerContent}</div>}
                <div className="modal-body">
                  <p>{step === 1 ? "Do you want to start the washing process?" : step === 2 ? "Do you want to start the drying process?" : "Do you want to start the flouring process?"}</p>
                </div>
                <div className="modal-footer">
                  <button onClick={onClose} className="close">CANCEL</button>
                  <button onClick={handleInitialConfirm} className="confirm-button">START</button>
                </div>
              </>
            )}
            {showProgress && (
              <div className="modal-body">
                <div className="loadingio-spinner-dual-ring-2by998twmg9">
                  <div className="ldio-yzaezf3dcml">
                    <div></div>
                    <div><div></div></div>
                  </div>
                </div>
                <img src={daunImage} alt="Loading" className="loading-image" />
                <p>{step === 1 ? "Wet leaves weight in progress......" : step === 2 ? "Dry leaves weight in progress......" : "Flour leaves weight in progress......"}</p>
              </div>
            )}
            {showWeightInput && finalWeight === null && (
              <>
                <div className="modal-header">{step === 1 ? "Enter the weight after wash" : step === 2 ? "Enter the weight after dry" : "Enter the weight after flouring"}</div>
                <div className="modal-body">
                  <div className="modal-field">
                    <label className="modal-label">{step === 1 ? "Weight after wash" : step === 2 ? "Weight after dry" : "Weight after flouring"}</label>
                    <input
                      type="number"
                      value={weight}
                      min={0}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="kg"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button onClick={onClose} className="close">CANCEL</button>
                  <button onClick={handleFinalConfirm} className="confirm-button">CONFIRM</button>
                </div>
              </>
            )}
            {finalWeight !== null && (
              <>
                <div className="modal-header">Weight Confirmed</div>
                <div className="modal-body">
                  <p>The {step === 1 ? "weight after wash" : step === 2 ? "weight after dry" : "weight after flouring"} is: {finalWeight} kg</p>
                </div>
                <div className="modal-footer">
                  <button onClick={onClose} className="confirm-button">DONE</button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {headerContent && <div className="modal-header">{headerContent}</div>}
            <div className="modal-body">
              {step !== 0 && step !== 4 && (
                <div className="modal-field">
                  <label className="modal-label">{step === 2 ? 'Weight after dry' : 'Final powder weight'}</label>
                  <input
                    type="number"
                    value={weight}
                    min={0}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="kg"
                  />
                </div>
              )}
              {step === 3 && (
                <div className="modal-field">
                  <label className="modal-label">Date obtained</label>
                  <input type="date" />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button onClick={onClose} className="close">CANCEL</button>
              <button onClick={() => onConfirm(weight)} className="confirm-button">{buttonLabel}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
