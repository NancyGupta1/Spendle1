import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

/**
 * Custom hook — centralises all transaction-derived computations.
 * Components consume this instead of recalculating in JSX.
 */
export const useTransactions = () => {
  const ctx = useContext(TransactionContext);

  const income  = ctx.transactions.filter(t => t.amount > 0).reduce((a, t) => a + t.amount, 0);
  const expense = Math.abs(ctx.transactions.filter(t => t.amount < 0).reduce((a, t) => a + t.amount, 0));
  const balance = income - expense;

  const categoryTotals = ctx.transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => {
      acc[t.tag] = (acc[t.tag] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0] || null;

  const budgetPct   = ctx.budget > 0 ? Math.min((expense / ctx.budget) * 100, 100) : 0;
  const budgetOver  = ctx.budget > 0 && expense > ctx.budget;
  const budgetWarn  = ctx.budget > 0 && budgetPct >= 80 && !budgetOver;

  const monthlyData = (type) => {
    const arr = Array(12).fill(0);
    ctx.transactions.forEach(t => {
      const m = new Date(t.date).getMonth();
      if (isNaN(m)) return;
      if (type === 'income'  && t.amount > 0) arr[m] += t.amount;
      if (type === 'expense' && t.amount < 0) arr[m] += Math.abs(t.amount);
    });
    return arr.map(v => Math.round(v));
  };

  return {
    ...ctx,
    income,
    expense,
    balance,
    categoryTotals,
    topCategory,
    budgetPct,
    budgetOver,
    budgetWarn,
    monthlyData,
  };
};
