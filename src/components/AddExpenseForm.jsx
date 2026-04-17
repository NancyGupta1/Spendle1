import { useState, useContext } from 'react';
import { Card, Form, Button, ButtonGroup } from 'react-bootstrap';
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
    if (!form.text.trim() || !form.amount || !form.date) {
      setError('Please fill in all fields.');
      return;
    }
    const amt = parseFloat(form.amount);
    if (isNaN(amt) || amt <= 0) {
      setError('Enter a valid positive amount.');
      return;
    }

    addEntry({
      id: Date.now(),
      text: form.text.trim(),
      amount: txType === 'expense' ? -amt : amt,
      date: form.date,
      tag: form.tag,
    });

    setForm({ text: '', amount: '', date: new Date().toISOString().slice(0, 10), tag: 'General' });
    setTxType('expense');
    setError('');
  };

  return (
    <Card className="spendle-card h-100" id="add">
      <Card.Body>
        <Card.Title className="spendle-card__title">Add Transaction</Card.Title>

        <ButtonGroup className="w-100 mb-3">
          <Button
            variant={txType === 'income' ? 'success' : 'outline-success'}
            onClick={() => setTxType('income')}
            size="sm"
          >
            + Income
          </Button>
          <Button
            variant={txType === 'expense' ? 'danger' : 'outline-danger'}
            onClick={() => setTxType('expense')}
            size="sm"
          >
            − Expense
          </Button>
        </ButtonGroup>

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label className="spendle-label">Description</Form.Label>
            <Form.Control
              type="text"
              value={form.text}
              placeholder="e.g. Monthly Salary"
              onChange={e => set('text', e.target.value)}
              className="spendle-input"
            />
          </Form.Group>

          <div className="row g-2 mb-3">
            <div className="col-6">
              <Form.Label className="spendle-label">Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                value={form.amount}
                placeholder="0"
                min="0"
                onChange={e => set('amount', e.target.value)}
                className="spendle-input"
              />
            </div>
            <div className="col-6">
              <Form.Label className="spendle-label">Date</Form.Label>
              <Form.Control
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
                className="spendle-input"
              />
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="spendle-label">Category</Form.Label>
            <Form.Select
              value={form.tag}
              onChange={e => set('tag', e.target.value)}
              className="spendle-input"
            >
              {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
            </Form.Select>
          </Form.Group>

          {error && <p className="text-danger small mb-2">{error}</p>}

          <Button
            type="submit"
            variant={txType === 'expense' ? 'danger' : 'success'}
            className="w-100 fw-semibold"
          >
            {txType === 'expense' ? '− Add Expense' : '+ Add Income'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddExpenseForm;
