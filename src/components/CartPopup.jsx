import React, { useEffect, useState } from 'react';
import './cartPopup.css';
import ConfirmationDialog from './ConfirmationDialog';
import api from '../api'; // Import the axios instance

const CartPopup = ({ batches, removeBatch, onClose }) => {
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [expedition, setExpedition] = useState('Expedition 1'); // Default expedition

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedBatches(batches.map(batch => batch.id));
    } else {
      setSelectedBatches([]);
    }
  };

  const handleSelectBatch = (batchId) => {
    setSelectedBatches(prevSelected =>
      prevSelected.includes(batchId)
        ? prevSelected.filter(id => id !== batchId)
        : [...prevSelected, batchId]
    );
  };

  const handleDeliverClick = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmDeliver = async () => {
    try {
      const response = await api.post('/deliver_batches/', { batch_ids: selectedBatches, expedition });
      selectedBatches.forEach(batchId => removeBatch(batchId));
      setIsConfirmationOpen(false);
      setSelectedBatches([]);
      onClose();
    } catch (error) {
      console.error('Error delivering batches:', error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <div className="cart-popup-overlay" onClick={onClose}>
      <div className="cart-popup" onClick={e => e.stopPropagation()}>
        <div className="cart-popup-header">
          <h2>Deliver to MorAlm</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="cart-popup-table-container">
          <table className="cart-popup-table">
            <thead>
              <tr>
                <th className="select-column">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedBatches.length === batches.length}
                  />
                </th>
                <th>Batch ID</th>
                <th>Weight</th>
                <th className="expedition-column">Expedition</th>
                <th className="eta-column">ETA</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch.id}>
                  <td className="select-column">
                    <input
                      type="checkbox"
                      checked={selectedBatches.includes(batch.id)}
                      onChange={() => handleSelectBatch(batch.id)}
                    />
                  </td>
                  <td>{batch.id}</td>
                  <td>{batch.weight} KG</td>
                  <td>
                    <select className="expedition-select" value={expedition} onChange={(e) => setExpedition(e.target.value)}>
                      <option>Expedition 1</option>
                      <option>Expedition 2</option>
                      <option>Expedition 3</option>
                      <option>Expedition 4</option>
                    </select>
                  </td>
                  <td>18-07-2024</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="deliver-selected-button"
          onClick={handleDeliverClick}
          disabled={selectedBatches.length === 0}
        >
          Deliver
        </button>
      </div>
      {isConfirmationOpen && (
        <ConfirmationDialog
          title="Confirm Delivery"
          message={`Are you sure you want to deliver ${selectedBatches.length > 1 ? 'these batches' : 'this batch'}?`}
          onCancel={handleCloseConfirmation}
          onConfirm={handleConfirmDeliver}
        />
      )}
    </div>
  );
};

export default CartPopup;
