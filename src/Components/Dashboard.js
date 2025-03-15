import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import Header from './Header';  
import TransactionForm from './TransactionForm';  

const Dashboard = () => {
  return (
    <BrowserRouter>
      <Header />  
      <Routes>
        <Route path="/" element={<TransactionForm />} />  
        
      </Routes>
    </BrowserRouter>
  );
};

export default Dashboard;

