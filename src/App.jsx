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
    <div className="landing-screen">
      <div className="landing-card">
        <div className="landing-logo">💰 Spendle</div>
        <h1 className="landing-title">Track every rupee.<br />Save smarter.</h1>
        <p className="landing-sub">
          Personal finance tracker with budget alerts, smart suggestions, and beautiful analytics.
        </p>
        <button className="landing-btn" onClick={onLoginClick}>Get Started →</button>
        <div className="landing-features">
          <span>📊 Analytics</span>
          <span>🎯 Budget Alerts</span>
          <span>💡 Smart Tips</span>
          <span>⬇ CSV Export</span>
        </div>
        <p className="landing-hint">Free · No sign-up required · Data stays on your device</p>
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
