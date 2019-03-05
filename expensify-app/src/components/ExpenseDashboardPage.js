import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboardPage = () => (
  <div>
  <ExpenseListFilters />
  <ExpenseList/>
    This is from my dashboard component!
  </div>
);

export default ExpenseDashboardPage;
