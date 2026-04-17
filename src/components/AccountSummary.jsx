import { Card, Row, Col } from 'react-bootstrap';
import { useTransactions } from '../hooks/useTransactions';

const StatCard = ({ label, value, color, icon, sub }) => (
  <div className="stat-card">
    <div className={`stat-icon stat-icon--${color}`}>{icon}</div>
    <div className="stat-label">{label}</div>
    <div className="stat-value" style={{
      color: color === 'success' ? 'var(--green)' :
             color === 'danger'  ? 'var(--red)'   :
             color === 'amber'   ? 'var(--amber)'  : 'var(--accent)'
    }}>{value}</div>
    {sub && <div className="stat-sub">{sub}</div>}
  </div>
);

const AccountSummary = ({ budget, onBudgetChange }) => {
  const { income, expense, balance, topCategory, budgetPct, budgetOver, budgetWarn } = useTransactions();
  const fmt = n => '₹' + Math.round(n).toLocaleString('en-IN');
  const barColor = budgetPct >= 100 ? 'var(--red)' : budgetPct >= 80 ? 'var(--amber)' : 'var(--green)';

  return (
    <div id="summary">
      <Row className="g-3 mb-3">
        <Col xs={6} md={3}>
          <StatCard label="Total Income"  value={fmt(income)}  color="success" icon="↑" sub="all time" />
        </Col>
        <Col xs={6} md={3}>
          <StatCard label="Total Expense" value={fmt(expense)} color="danger"  icon="↓" sub="all time" />
        </Col>
        <Col xs={6} md={3}>
          <StatCard
            label="Net Balance"
            value={fmt(balance)}
            color={balance >= 0 ? 'success' : 'danger'}
            icon="◈"
            sub="income − expense"
          />
        </Col>
        <Col xs={6} md={3}>
          <StatCard
            label="Top Category"
            value={topCategory ? topCategory[0] : '—'}
            color="amber"
            icon="★"
            sub={topCategory ? fmt(topCategory[1]) + ' spent' : 'no data yet'}
          />
        </Col>
      </Row>

      <div className="budget-panel">
        <div className="budget-panel__header">
          <span className="budget-panel__title">Monthly Budget</span>
          <div className="budget-panel__input-wrap">
            <span className="budget-panel__symbol">₹</span>
            <input
              type="number"
              className="budget-panel__input"
              placeholder="Set limit"
              value={budget || ''}
              onChange={e => onBudgetChange(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        {budget > 0 && (
          <>
            {budgetOver && (
              <div className="alert-banner alert-banner--danger">
                🚨 Budget exceeded! You've spent {fmt(expense - budget)} over your limit.
              </div>
            )}
            {budgetWarn && (
              <div className="alert-banner alert-banner--warning">
                ⚠️ You've used {Math.round(budgetPct)}% of your monthly budget.
              </div>
            )}
            <div className="budget-bar-wrap">
              <div className="budget-bar-track">
                <div className="budget-bar-fill" style={{ width: budgetPct + '%', background: barColor }} />
              </div>
              <span className="budget-bar-pct" style={{ color: barColor }}>{Math.round(budgetPct)}%</span>
            </div>
            <div className="budget-bar-labels">
              <span>Spent: {fmt(expense)}</span>
              <span>Remaining: {fmt(Math.max(budget - expense, 0))}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountSummary;
