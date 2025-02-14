// src/components/DebtEditForm.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';

const DebtEditForm = ({ debt, onUpdate, onCancel }) => {
  const [debtAmount, setDebtAmount] = useState(debt.debt_amount);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate({ ...debt, debt_amount: debtAmount });
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onCancel}
      contentLabel="Изменить долг"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <h3>Изменить долг</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Сумма долга:</label>
          <input
            type="number"
            value={debtAmount}
            onChange={(e) => setDebtAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Обновить</button>
        <button type="button" onClick={onCancel}>Отменить</button>
      </form>
    </Modal>
  );
};

export default DebtEditForm;