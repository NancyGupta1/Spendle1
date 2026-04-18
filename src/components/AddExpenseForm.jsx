import { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const TAGS = ['General','Groceries','Travel','Bills','Entertainment','Food','Health','Shopping'];

const AddExpenseForm = () => {
  const { addEntry } = useContext(TransactionContext);
  const [txType, setTxType] = useState('expense');
  const [form, setForm] = useState({
    text: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    tag: 'General',
  });
  const [error, setError] = useState('');

  const set = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.text.trim() || !form.amount || !form.date) { setError('Please fill in all fields.'); return; }
    const amt = parseFloat(form.amount);
    if (isNaN(amt) || amt <= 0) { setError('Enter a valid positive amount.'); return; }
    addEntry({ id: Date.now(), text: form.text.trim(), amount: txType === 'expense' ? -amt : amt, date: form.date, tag: form.tag });
    setForm({ text: '', amount: '', date: new Date().toISOString().slice(0, 10), tag: 'General' });
    setTxType('expense');
    setError('');
  };

  return (
    <div className="spendle-card h-100" id="add" style={{ padding: '20px' }}>
      <p className="spendle-card__title" style={{ marginBottom: '16px' }}>Add Transaction</p>

      {/* Type Toggle */}
      <div className="tx-type-toggle" style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => setTxType('income')}
          className={`tx-type-btn ${txType === 'income' ? 'tx-type-btn--income' : ''}`}
        >+ Income</button>
        <button
          onClick={() => setTxType('expense')}
          className={`tx-type-btn ${txType === 'expense' ? 'tx-type-btn--expense' : ''}`}
        >− Expense</button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '12px' }}>
          <label className="spendle-label">Description</label>
          <input
            type="text"
            className="spendle-input"
            style={{ width: '100%' }}
            placeholder="e.g. Monthly Salary"
            value={form.text}
            onChange={e => set('text', e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
          <div>
            <label className="spendle-label">Amount (₹)</label>
            <input
              type="number"
              className="spendle-input"
              style={{ width: '100%' }}
              placeholder="0"
              min="0"
              value={form.amount}
              onChange={e => set('amount', e.target.value)}
            />
          </div>
          <div>
            <label className="spendle-label">Date</label>
            <input
              type="date"
              className="spendle-input"
              style={{ width: '100%' }}
              value={form.date}
              onChange={e => set('date', e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label className="spendle-label">Category</label>
          <select
            className="spendle-input"
            style={{ width: '100%' }}
            value={form.tag}
            onChange={e => set('tag', e.target.value)}
          >
            {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {error && <p style={{ color: 'var(--red)', fontSize: '13px', marginBottom: '8px' }}>{error}</p>}

        <button
          type="submit"
          className={`tx-submit-btn ${txType === 'expense' ? 'tx-submit-btn--expense' : 'tx-submit-btn--income'}`}
        >
          {txType === 'expense' ? '− Add Expense' : '+ Add Income'}
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;