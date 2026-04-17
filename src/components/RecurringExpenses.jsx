import { useState, useContext } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { TransactionContext } from '../context/TransactionContext';

const TEMPLATES = [
  { label: 'Rent',            tag: 'Bills',         amount: 8000,  icon: '🏠' },
  { label: 'EMI',             tag: 'Bills',         amount: 5000,  icon: '🏦' },
  { label: 'Netflix',         tag: 'Entertainment', amount: 649,   icon: '📺' },
  { label: 'Spotify',         tag: 'Entertainment', amount: 119,   icon: '🎵' },
  { label: 'Mobile Recharge', tag: 'Bills',         amount: 299,   icon: '📱' },
  { label: 'Gym',             tag: 'Health',        amount: 1200,  icon: '💪' },
  { label: 'Internet',        tag: 'Bills',         amount: 799,   icon: '🌐' },
  { label: 'Salary',          tag: 'General',       amount: 45000, icon: '💰', isIncome: true },
];

const RecurringExpenses = () => {
  const { addEntry } = useContext(TransactionContext);
  const [added, setAdded] = useState({});

  const handleAdd = (template) => {
    addEntry({
      id: Date.now(),
      text: template.label,
      amount: template.isIncome ? template.amount : -template.amount,
      tag: template.tag,
      date: new Date().toISOString().slice(0, 10),
    });
    setAdded(prev => ({ ...prev, [template.label]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [template.label]: false })), 2000);
  };

  return (
    <Card className="spendle-card">
      <Card.Body>
        <Card.Title className="spendle-card__title mb-1">Recurring Templates</Card.Title>
        <p className="spendle-label mb-3" style={{ textTransform: 'none', letterSpacing: 0 }}>
          One-tap to log your monthly regulars
        </p>
        <div className="recurring-grid">
          {TEMPLATES.map(t => (
            <button
              key={t.label}
              className={`recurring-chip ${added[t.label] ? 'recurring-chip--done' : ''} ${t.isIncome ? 'recurring-chip--income' : ''}`}
              onClick={() => handleAdd(t)}
              disabled={added[t.label]}
            >
              <span className="recurring-chip__icon">{t.icon}</span>
              <span className="recurring-chip__label">{t.label}</span>
              <span className="recurring-chip__amt">
                {t.isIncome ? '+' : '−'}₹{t.amount.toLocaleString('en-IN')}
              </span>
              {added[t.label] && <span className="recurring-chip__tick">✓</span>}
            </button>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecurringExpenses;
