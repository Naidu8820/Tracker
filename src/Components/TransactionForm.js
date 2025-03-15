import React, { useState,useReducer, createContext, useContext } from 'react';


const initialState = JSON.parse(localStorage.getItem('transactions')) || [];


const TransactionContext = createContext();


const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const updatedStateAdd = [...state, action.payload];
      localStorage.setItem('transactions', JSON.stringify(updatedStateAdd)); 
      return updatedStateAdd;
    case 'DELETE':
      const updatedStateDelete = state.filter((_, index) => index !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(updatedStateDelete)); 
      return updatedStateDelete;
    default:
      return state;
  }
};


const useTransactionContext = () => useContext(TransactionContext);

const FinancialTracker = () => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);
  const [details, setDetails] = useState({
    type: '',
    description: '',
    amount: 0,
    date: '',
  });
  const [filterDate, setFilterDate] = useState('');

  
  const calculateTotals = (transactions, dateFilter) => {
    let totalIncome = 0;
    let totalExpense = 0;
    
    transactions.forEach((transaction) => {
      const isSameDate = dateFilter ? transaction.date === dateFilter : true;
      const amount = parseFloat(transaction.amount) || 0;

      if (isSameDate) {
        if (transaction.type === 'Income') totalIncome += amount;
        else if (transaction.type === 'Expense') totalExpense += amount;
      }
    });

    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.type && details.description && details.amount) {
      dispatch({ type: 'ADD', payload: details });
      setDetails({ type: '', description: '', amount: 0, date: '' });
    }
  };

  
  const handleDelete = (index) => {
    dispatch({ type: 'DELETE', payload: index });
  };

  
  const { totalIncome, totalExpense, balance } = calculateTotals(state, filterDate);

  
  const handleFilterDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      <div className="financial-tracker">
        <h1>Financial Tracker</h1>
        <h3>Track your income and expenses with ease!</h3>

        
        <form onSubmit={handleSubmit}>
          <div>
            <label>Transaction Type</label>
            <select name="type" value={details.type} onChange={handleInputChange}>
              <option value="">Select Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={details.description}
              onChange={handleInputChange}
              placeholder="Enter description"
            />
          </div>

          <div>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={details.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label>Date</label>
            <input
               type="date"
               name="date"
              value={details.date}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Add Transaction</button>
        </form>

        
        <div>
          <label>Filter by Date</label>
          <input type="date" onChange={handleFilterDateChange} />
        </div>

        
        <div className="summary">
          <h3>Summary</h3>
          <p>Total Income: ${totalIncome.toFixed(2)}</p>
          <p>Total Expense: ${totalExpense.toFixed(2)}</p>
          <p>Remaining Balance: ${balance.toFixed(2)}</p>
        </div>

        
        <div>
          <h3>Transaction History</h3>
          {state.length === 0 ? (
            <p>No transactions to show</p>
          ) : (
            <ul>
              {state
                .filter((transaction) =>
                  filterDate ? transaction.date === filterDate : true
                )
                .map((transaction, index) => (
                  <li key={index}>
                    <p>
                      {transaction.type} - {transaction.description} - ${transaction.amount} on {transaction.date}
                    </p>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </TransactionContext.Provider>
  );
};

export default FinancialTracker;
