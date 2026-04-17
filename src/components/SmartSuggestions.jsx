import { Card } from 'react-bootstrap';
import { useTransactions } from '../hooks/useTransactions';

const CAT_EMOJI = { General:'💼', Groceries:'🛒', Travel:'✈️', Bills:'🧾', Entertainment:'🎬', Food:'🍜', Health:'💊', Shopping:'🛍️' };

const SmartSuggestions = () => {
  const { income, expense, balance, categoryTotals, budget } = useTransactions();
  const fmt = n => '₹' + Math.round(n).toLocaleString('en-IN');
  const tips = [];

  if (!expense && !income) {
    return (
      <Card className="spendle-card h-100">
        <Card.Body>
          <Card.Title className="spendle-card__title">Smart Suggestions</Card.Title>
          <div className="suggestions-empty">
            <div style={{ fontSize:'32px', marginBottom:'8px' }}>💡</div>
            <div>Add transactions to get personalised financial tips!</div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  // High spending categories (>30% of total expense)
  Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, amt]) => {
      const pct = expense > 0 ? Math.round((amt / expense) * 100) : 0;
      if (pct > 30) {
        tips.push({ type: 'warning', icon: CAT_EMOJI[cat] || '📦',
          text: `You spent ${fmt(amt)} on ${cat} (${pct}% of expenses). Try reducing it by 10–15%.` });
      }
    });

  // Budget remaining
  if (budget > 0) {
    const rem = budget - expense;
    if (rem > 0)
      tips.push({ type: 'info', icon: '💰', text: `${fmt(rem)} remaining in your monthly budget.` });
  }

  // Savings / deficit
  if (income > 0) {
    if (balance > 0)
      tips.push({ type: 'success', icon: '🎯', text: `Great! You saved ${fmt(balance)} this period. Keep it up!` });
    else if (balance < 0)
      tips.push({ type: 'danger', icon: '📉', text: `You're spending ${fmt(Math.abs(balance))} more than your income. Review your expenses.` });
  }

  // Savings rate tip
  if (income > 0 && balance > 0) {
    const rate = Math.round((balance / income) * 100);
    if (rate >= 20)
      tips.push({ type: 'success', icon: '🏆', text: `Your savings rate is ${rate}%. Excellent financial discipline!` });
    else
      tips.push({ type: 'info', icon: '📈', text: `Your savings rate is ${rate}%. Aim for 20%+ for long-term financial health.` });
  }

  if (!tips.length)
    tips.push({ type: 'success', icon: '✅', text: 'Your spending looks balanced across categories!' });

  return (
    <Card className="spendle-card h-100">
      <Card.Body>
        <Card.Title className="spendle-card__title">Smart Suggestions</Card.Title>
        <div className="suggestions-list">
          {tips.map((tip, i) => (
            <div key={i} className={`suggestion-item suggestion-item--${tip.type}`}>
              <span className="suggestion-item__icon">{tip.icon}</span>
              <span className="suggestion-item__text">{tip.text}</span>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default SmartSuggestions;
