import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, provideGlobalGridOptions } from 'ag-grid-community';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import DebtEditForm from './DebtEditForm';

ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: "legacy" });

const Debtors = () => {
  
  const [debtors, setDebtors] = useState([]);
  const [selectedDebtorDebts, setSelectedDebtorDebts] = useState([]);
  const [editingDebt, setEditingDebt] = useState(null);
  const [newDebt, setNewDebt] = useState({
    debt_amount: '',
    issue_date: '',
    due_date: '',
    debtor_phone: '', // Телефон должника
  });
  const gridRef = useRef(null);
  const gridRefDebts = useRef(null);

  // Колонки для таблицы дебиторов
  const debtorColDefs = [
    { field: 'first_name', headerName: 'Имя', sortable: true, filter: true },
    { field: 'last_name', headerName: 'Фамилия', sortable: true, filter: true },
    { field: 'phone_number', headerName: 'Номер телефона', sortable: true, filter: true },
    {
      headerName: 'Посмотреть долг',
      cellRenderer: (params) => (
        <button onClick={() => handleViewDebts(params.data.Debts)}>Посмотреть долг</button>
      ),
    },
  ];

  // Источник данных для Infinite Row Model
  const dataSource = {
    getRows: async (params) => {
      const { startRow, endRow } = params;
      const limit = endRow - startRow;
      const offset = startRow;

      try {
        const response = await axios.get('http://localhost:5000/api/debtors', {
          params: { limit, offset },
        });

        params.successCallback(response.data.rows, response.data.totalCount);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        params.failCallback();
      }
    },
  };

  const gridOptions = {
    rowModelType: 'infinite',
    datasource: dataSource,
    rowBuffer: 10,
    cacheBlockSize: 20,
    maxBlocksInCache: 5,
    infiniteInitialRowCount: 100,
  };

  // Обработчик для просмотра долгов
  const handleViewDebts = (debts) => {
    setSelectedDebtorDebts(debts.map((debt) => ({ ...debt })));
  };

  // Обработчик для изменения данных в форме добавления долга
  const handleNewDebtChange = (e) => {
    const { name, value } = e.target;
    setNewDebt((prevDebt) => ({
      ...prevDebt,
      [name]: value,
    }));
  };

  // Обработчик для создания нового долга
  const handleCreateDebt = async () => {
    try {
      // Проверяем, что debtor_id передан
      if (!newDebt.debtor_id) {
        alert('ID должника не указан');
        return;
      }
  
      // Создаем новый долг для этого дебитора
      const debtToCreate = {
        debt_amount: newDebt.debt_amount,
        due_date: newDebt.due_date,
        debtor_id: newDebt.debtor_id, // Используем переданный debtor_id
      };
  
      // Отправляем запрос на создание долга
      const debtResponse = await axios.post('http://localhost:5000/api/debts', debtToCreate);
  
      // Обновляем список долгов
      setSelectedDebtorDebts((prevDebts) => [...prevDebts, debtResponse.data]);
  
      // Сбрасываем форму
      setNewDebt({
        debt_amount: '',
        due_date: '',
        debtor_id: '', // Сбрасываем ID должника
      });
  
    } catch (error) {
      console.error('Ошибка добавления долга:', error);
    }
  };

  // Обработчик для обновления долга
  const handleUpdateDebt = (debt) => {
    if (!debt.debt_id) {
      console.error('Ошибка: debt_id отсутствует в данных');
      return;
    }
    setEditingDebt(debt);
  };

  // Обработчик для удаления долга
  const handleDeleteDebt = (debt) => {
    if (!debt.debt_id) {
      console.error('Ошибка: debt_id отсутствует в данных');
      return;
    }

    axios
      .delete(`http://localhost:5000/api/debts/${debt.debt_id}`)
      .then(() => {
        const updatedDebts = selectedDebtorDebts.filter((d) => d.debt_id !== debt.debt_id);
        setSelectedDebtorDebts(updatedDebts);
        if (gridRefDebts.current?.api) {
          gridRefDebts.current.api.setRowData(updatedDebts);
        }
      })
      .catch((error) => console.error('Ошибка удаления долга:', error));
  };

  // Обработчик для сохранения обновленного долга
  const handleSaveUpdatedDebt = (updatedDebt) => {
    axios
      .put(`http://localhost:5000/api/debts/${updatedDebt.debt_id}`, updatedDebt)
      .then((response) => {
        setSelectedDebtorDebts((prevDebts) =>
          prevDebts.map((d) => (d.debt_id === updatedDebt.debt_id ? response.data : d))
        );
        setEditingDebt(null);
        const gridApi = gridRef.current.api;
      if (gridApi && gridApi.setSortModel) {
        gridApi.setSortModel([]); // Сбрасываем сортировку
      } else {
        console.warn('gridApi или setSortModel недоступны');
      }
      })
      .catch((error) => console.error('Ошибка обновления долга:', error));
  };

  // Обработчик для отмены редактирования
  const handleCancelEdit = () => {
    setEditingDebt(null);
  };

  return (
    <div className="pt-5">
      <h2 className="text-2xl text-center mb-5">Должники</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Левая таблица (дебиторы) */}
        <div className="ag-theme-quartz-dark" style={{ height: 400, width: '50%' }}>
          <AgGridReact
            ref={gridRef}
            rowData={debtors}
            columnDefs={debtorColDefs}
            gridOptions={gridOptions}
          />
        </div>

        {/* Правая таблица (долги) */}
        <div style={{ width: '48%' }}>
          <div className="ag-theme-quartz-dark" style={{ height: 400 }}>
            <AgGridReact
              ref={gridRefDebts}
              rowData={selectedDebtorDebts}
              columnDefs={[
                { field: 'debt_amount', headerName: 'Долг(и)', sortable: true, filter: true,  },
                // { field: 'issue_date', headerName: 'Дата выдачи', sortable: true, filter: true },
                { field: 'due_date', headerName: 'Срок оплаты', sortable: true, filter: true },
                {
                  headerName: 'Действия',
                  cellRenderer: (params) => (
                    <div className=' '>
                      <button style={{ marginRight: '10px' }} onClick={() => handleUpdateDebt(params.data)}>
                        Изменить
                      </button>
                      <button  style={{ marginRight: '10px' }} onClick={() => handleDeleteDebt(params.data)}>Удалить</button>
                      
                    </div>
                  ),
                  width: 300
                },
              ]}
              animateRows={true}
              getRowNodeId={(data) => data.debt_id}
              deltaRowDataMode={true}
            />
          </div>

        
            
         
        </div>
      </div>

      {editingDebt && (
        <DebtEditForm
          debt={editingDebt}
          onUpdate={handleSaveUpdatedDebt}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default Debtors;
