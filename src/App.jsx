import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useContext } from 'react';
import CustomCursor from './components/CustomCursor';
import AppNavbar         from './components/AppNavbar';
import AccountSummary    from './components/AccountSummary';
import MonthlyChart      from './components/MonthlyChart';
import AddExpenseForm    from './components/AddExpenseForm';
import HistoryList       from './components/HistoryList';
import SmartSuggestions  from './components/SmartSuggestions';
import RecurringExpenses from './components/RecurringExpenses';
import Loginpage         from './components/Loginpage';
import { TransactionContext } from './context/TransactionContext';

/* ─── Dashboard (authenticated view) ─── */
const Dashboard = ({ user, onLogout }) => {
  const { budget, setBudget } = useContext(TransactionContext);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <>
      <AppNavbar isLoggedIn onLogout={onLogout} userName={user?.name} />
      <Container fluid="lg" className="dashboard-container py-4">

        {/* Greeting */}
        <div className="dashboard-greeting mb-4">
          <h2 className="greeting-title">{greeting}, {user?.name} 👋</h2>
          <p className="greeting-sub">
            {new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
          </p>
        </div>

        {/* Stat Cards + Budget Bar */}
        <AccountSummary budget={budget} onBudgetChange={setBudget} />

        {/* Analytics + Add Transaction */}
        <Row className="g-3 mt-1">
          <Col lg={8}><MonthlyChart /></Col>
          <Col lg={4}><AddExpenseForm /></Col>
        </Row>

        {/* History + Smart Suggestions */}
        <Row className="g-3 mt-1">
          <Col lg={8}><HistoryList /></Col>
          <Col lg={4}><SmartSuggestions /></Col>
        </Row>

        {/* Recurring Templates */}
        <div className="mt-3">
          <RecurringExpenses />
        </div>

      </Container>
    </>
  );
};

/* ─── Landing (unauthenticated) ─── */
const Landing = ({ onLoginClick }) => (
  <>
    <AppNavbar onLoginClick={onLoginClick} />

    {/* ── HERO ── */}
    <div className="landing-hero">
      <div className="landing-orb landing-orb--1" />
      <div className="landing-orb landing-orb--2" />

      <div className="landing-badge">
        <span className="landing-badge__dot" />
        Personal finance, simplified
      </div>

      <h1 className="landing-title">
        Track every <span className="landing-title__lime">rupee.</span><br />
        Save <span className="landing-title__amber">smarter.</span>
      </h1>

      <p className="landing-sub">
        Budget alerts, smart suggestions, and beautiful analytics —<br />
        all on your device. No sign-up needed.
      </p>

      <div className="landing-cta-group">
        <button className="landing-btn-primary" onClick={onLoginClick}>
          Get Started →
        </button>
        <button className="landing-btn-secondary">See how it works</button>
      </div>
    </div>

    {/* ── STATS BAR ── */}
    <div className="landing-stats-bar">
      {[
        { num: '₹0',   label: 'Data cost · always free' },
        { num: '100%', label: 'Data stays on device' },
        { num: '5s',   label: 'To add a transaction' },
        { num: '∞',    label: 'Categories & budgets' },
      ].map(({ num, label }) => (
        <div className="landing-stat" key={label}>
          <div className="landing-stat__num">{num}</div>
          <div className="landing-stat__label">{label}</div>
        </div>
      ))}
    </div>

    {/* ── FEATURE CARDS ── */}
    <div className="landing-features-section">
      <p className="landing-section-label">What's inside</p>
      <h2 className="landing-section-title">
        Everything you need,<br />nothing you don't.
      </h2>

      <div className="landing-cards-grid">

        {/* Wide analytics card */}
        <div className="landing-feat-card landing-feat-card--wide">
          <div className="landing-feat-icon landing-feat-icon--lime">📊</div>
          <div className="landing-feat-title">Beautiful Analytics</div>
          <div className="landing-feat-desc">
            Monthly breakdowns, category trends, and visual spending patterns that actually make sense.
          </div>
          <div className="landing-mini-chart">
            {[30, 55, 40, 80, 65, 45, 70, 50, 90, 60].map((h, i) => (
              <div
                key={i}
                className={`landing-mini-bar${h >= 80 ? ' landing-mini-bar--active' : ''}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="landing-feat-card">
          <div className="landing-feat-icon landing-feat-icon--amber">🎯</div>
          <div className="landing-feat-title">Budget Alerts</div>
          <div className="landing-feat-desc">Set monthly limits and get notified before you overspend.</div>
        </div>

        <div className="landing-feat-card">
          <div className="landing-feat-icon landing-feat-icon--lime">💡</div>
          <div className="landing-feat-title">Smart Tips</div>
          <div className="landing-feat-desc">Personalized suggestions based on your actual spending habits.</div>
        </div>

        <div className="landing-feat-card">
          <div className="landing-feat-icon landing-feat-icon--blue">⬇</div>
          <div className="landing-feat-title">CSV Export</div>
          <div className="landing-feat-desc">Export all your transactions anytime. Your data, your format.</div>
        </div>

        <div className="landing-feat-card">
          <div className="landing-feat-icon landing-feat-icon--amber">🔄</div>
          <div className="landing-feat-title">Recurring Expenses</div>
          <div className="landing-feat-desc">Templates for rent, subscriptions, and bills. Log them in one tap.</div>
        </div>

      </div>
    </div>

    {/* ── BOTTOM CTA ── */}
    <div className="landing-bottom-cta">
      <div className="landing-bottom-cta__text">
        <h2>Start tracking<br />in seconds.</h2>
        <p>No account. No subscription. No excuses.</p>
      </div>
      <div className="landing-bottom-cta__right">
        <button className="landing-btn-primary landing-btn-primary--lg" onClick={onLoginClick}>
          Get Started →
        </button>
        <span className="landing-bottom-hint">Free · Works offline · Data never leaves you</span>
      </div>
    </div>
  </>
);

/* ─── Root App ─── */
const App = () => {
  const [user,      setUser]      = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('spendle_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('spendle_user', JSON.stringify(userData));
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('spendle_user');
    setUser(null);
    setShowLogin(false);
  };

  if (showLogin) {
    return (
      <>
        <CustomCursor />
        <Loginpage onLogin={handleLogin} />
      </>
    );
  }

  if (user) {
    return (
      <>
        <CustomCursor />
        <Dashboard user={user} onLogout={handleLogout} />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <Landing onLoginClick={() => setShowLogin(true)} />
    </>
  );
};

export default App;