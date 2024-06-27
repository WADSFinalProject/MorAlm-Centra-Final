import React from 'react';
import './confirmationDialog.css';

const ConfirmationDialog = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="confirmation-dialog-actions">
          <button className="confirmation-cancel-button" onClick={onCancel}>
            CANCEL
          </button>
          <button className="confirmation-confirm-button" onClick={onConfirm}>
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
