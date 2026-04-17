import { createContext, useReducer, useEffect } from 'react';

const initialState = {
  transactions: [],
  budget: 0,
};

export const TransactionContext = createContext(initialState);

function TransactionReducer(state, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_ENTRY':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'REMOVE_ENTRY':
      return { ...state, transactions: state.transactions.filter(tx => tx.id !== action.payload) };
    case 'SET_BUDGET':
      return { ...state, budget: action.payload };
    default:
      return state;
  }
}

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransactionReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem('spendle_transactions');
    const savedBudget = localStorage.getItem('spendle_budget');
    if (saved) dispatch({ type: 'SET_TRANSACTIONS', payload: JSON.parse(saved) });
    if (savedBudget) dispatch({ type: 'SET_BUDGET', payload: parseFloat(savedBudget) });
  }, []);

  useEffect(() => {
    localStorage.setItem('spendle_transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem('spendle_budget', state.budget);
  }, [state.budget]);

  const addEntry = tx => dispatch({ type: 'ADD_ENTRY', payload: tx });
  const removeEntry = id => dispatch({ type: 'REMOVE_ENTRY', payload: id });
  const setBudget = val => dispatch({ type: 'SET_BUDGET', payload: val });

  return (
    <TransactionContext.Provider value={{
      transactions: state.transactions,
      budget: state.budget,
      addEntry,
      removeEntry,
      setBudget,
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
