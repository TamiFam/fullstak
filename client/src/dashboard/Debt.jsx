// src/components/Debts.jsx
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const Debts = ({ debts, onUpdateDebt, onDeleteDebt }) => {
  const debtColDefs = [
    { field: "debt_amount", headerName: "Долг(и)", sortable: true, filter: true },
    { field: "issue_date", headerName: "Дата выдачи", sortable: true, filter: true },
    { field: "due_date", headerName: "Срок оплаты", sortable: true, filter: true },
    {
      headerName: "Действия",
      cellRenderer: (params) => (
        <div>
          <button style={{ marginRight: '5px' }} onClick={() => onUpdateDebt(params.data)}>
            Изменить
          </button>
          <button onClick={() => onDeleteDebt(params.data)}>
            Удалить
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className='ag-theme-quartz-dark' style={{ height: 400, width: '100%' }}>
      <AgGridReact 
        rowData={debts} 
        columnDefs={debtColDefs}
        animateRows={true}
      />
    </div>
  );
};

export default Debts;